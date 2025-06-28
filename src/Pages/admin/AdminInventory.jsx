import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Card, Modal } from 'react-bootstrap';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAllInventoryData,
    restockProduct,
    deductProduct,
    updateStock,
    deleteProduct,
    addProduct}
    from "../../API/inventoryData";

export default function AdminInventory() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
// For search
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
// For restock.deduct
    const [showRestockModal, setShowRestockModal] = useState(false);
    const [restockQty, setRestockQty] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [actionType, setActionType] = useState(""); // "restock" or "deduct"
// For update
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState(null);
// For delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
// For add new product
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '', quantity: '', category: '', supplier: '', unitPrice: '', discount: ''
    });
// For search function
    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
// For retrieve data
    useEffect(() => {
        const loadStdMngData = async () => {
            try {
                const data = await getAllInventoryData();
                const withIds = data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                }));
                setProducts(withIds);
            } catch (err) {
                console.error("Error fetching Inventory data:", err);
                setError("Failed to load inventory Data.");
            } finally {
                setLoading(false);
            }
        };
        loadStdMngData();
    }, []);
// For restock/deduct
    const inStock = products.reduce((acc, p) => acc + p.quantity, 0);
    const purchases = products.length;
    const cost = products.reduce((acc, p) => {
        const discountNum = typeof p.discount === "string" ? parseFloat(p.discount.replace("%", "")) : p.discount;
        const total = (p.unitPrice - (p.unitPrice * discountNum / 100)) * p.quantity;
        return acc + total;
    }, 0);
    const suppliers = new Set(products.map(p => p.supplier)).size;
    const categories = new Set(products.map(p => p.category)).size;
    const handleRestockClick = (product) => {
        setSelectedProduct(product);
        setRestockQty(0);
        setActionType("restock");
        setShowRestockModal(true);
    };
    const handleDeductClick = (product) => {
        setSelectedProduct(product);
        setRestockQty(0);
        setActionType("deduct");
        setShowRestockModal(true);
    };
    const handleRestockSubmit = async () => {
        if (!restockQty || restockQty <= 0) return alert("Enter a valid quantity.");
        try {
            if (actionType === "restock") {
                await restockProduct(selectedProduct.name, restockQty);
                setProducts((prev) =>
                    prev.map((p) =>
                        p.id === selectedProduct.id ? { ...p, quantity: p.quantity + restockQty } : p
                    )
                );
            } else if (actionType === "deduct") {
                if (restockQty > selectedProduct.quantity)
                    return alert("Cannot deduct more than available stock.");
                await deductProduct(selectedProduct.name, restockQty);
                setProducts((prev) =>
                    prev.map((p) =>
                        p.id === selectedProduct.id ? { ...p, quantity: p.quantity - restockQty } : p
                    )
                );
            }
            setShowRestockModal(false);
        } catch (err) {
            console.error(`${actionType} failed:`, err);
            alert(`Failed to ${actionType}. Try again.`);
        }
    };
// For update3 stock
    const handleUpdateClick = (product) => {
        setUpdateData({ ...product });
        setShowUpdateModal(true);
    };
    const handleUpdateChange = (field) => (e) => {
        const value = ["quantity", "unitPrice", "discount"].includes(field)
            ? Number(e.target.value)
            : e.target.value;

        setUpdateData((prev) => ({ ...prev, [field]: value }));
    };
    const handleUpdateSubmit = async () => {
        try {
            const body = {
                quantity: updateData.quantity,
                discount: updateData.discount,
            };
            await updateStock(updateData.name, body);

            setProducts((prev) =>
                prev.map((p) =>
                    p.id === updateData.id ? { ...p, ...updateData } : p
                )
            );
            setShowUpdateModal(false);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product.");
        }
    };
// For delete
    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(productToDelete.name);
            setProducts((prev) => prev.filter(p => p.id !== productToDelete.id));
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product.");
        }
    };
// Add stock
        const handleAddChange = (field) => (e) => {
            setNewProduct((prev) => ({
                ...prev,
                [field]: field === "quantity" || field === "unitPrice"
                    ? Number(e.target.value)
                    : e.target.value
            }));
        };
        const handleAddSubmit = async () => {
            const { name, quantity, category, supplier, unitPrice, discount } = newProduct;
            // Simple validation
            if (!name || !quantity || !category || !supplier || !unitPrice) {
                return alert("Please fill in all required fields.");
            }
            const productData = {
                name,
                quantity,
                category,
                supplier,
                unitPrice,
                discount
            };
            try {
                // Submit to your backend (replace this with your actual API function)
                console.log("Sending to backend:", productData);
                await addProduct(productData);
                setProducts(prev => [...prev, { ...productData, id: prev.length + 1 }]);
                setShowAddModal(false);
                setNewProduct({ name: "", quantity: "", category: "", supplier: "", unitPrice: "", discount: "" });
            } catch (err) {
                console.error("Add Item Failed:", err);
                alert("Failed to add product.");
            }
            console.log(productData);
            
        };
// Download export logs
    const handleExportToExcel = () => {
        const exportData = products.map(({ id, name, quantity, category, supplier, unitPrice, discount }) => {
            const total = ((unitPrice - (unitPrice * discount / 100)) * quantity).toFixed(2);
            return {
                "Product Name": name,
                Quantity: quantity,
                Category: category,
                Supplier: supplier,
                "Unit Price (₹)": unitPrice,
                Discount: discount,
                "Total Amount (₹)": total,
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `Inventory_Export_${new Date().toISOString().slice(0,10)}.xlsx`);
    };
    return (
        <>
            <h4 className="mb-3"><i className="bi bi-box-seam"></i> Inventory Management</h4>

            <Row className="mb-3">
                <Col xs={12} md={8}>
                    <Form.Control
                        placeholder="Search inventory items..."
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </Col>
                <Col xs={6} md={2}>
                    <Button className="w-100" variant="primary" onClick={() => {}}>Search</Button>
                    {/* This button is optional now since filtering is live */}
                </Col>
                <Col xs={6} md={2}>
                    <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                        <option>All Categories</option>
                        <option>Office Supplies</option>
                        <option>Electronics</option>
                        <option>Furniture</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}><Card className="p-3"><strong>In Stock</strong><h4>{inStock}</h4><strong>To Be Delivered</strong><h4>0</h4></Card></Col>
                <Col md={4}><Card className="p-3"><strong>Purchases</strong><h4>{purchases}</h4><strong>Cost</strong><h4>₹{cost.toFixed(2)}</h4></Card></Col>
                <Col md={4}><Card className="p-3"><strong>Suppliers</strong><h4>{suppliers}</h4><strong>Categories</strong><h4>{categories}</h4></Card></Col>
            </Row>

            <Card className="p-3">
                <Row className="mb-3">
                    <Col><h5><i className="bi bi-card-list"></i> Inventory List</h5></Col>
                    <Col className="text-end">
                        <Button variant="outline-primary" className="me-2" onClick={handleExportToExcel}><i className="bi bi-download"></i> Export Logs</Button>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}><i className="bi bi-plus-circle" ></i> Add Product</Button>
                    </Col>
                </Row>

                <Table bordered hover responsive="xxl">
                    <thead className="table-light">
                        <tr>
                            <th>Product Name</th><th>Quantity</th><th>Category</th><th>Supplier</th>
                            <th>Unit Price</th><th>Discount</th><th>Total Amount</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p => {
                            const total = ((p.unitPrice - (p.unitPrice * p.discount / 100)) * p.quantity).toFixed(2);
                            return (
                                <tr key={p.id}>
                                    <td>{p.name}</td><td>{p.quantity}</td><td>{p.category}</td><td>{p.supplier}</td>
                                    <td>{p.unitPrice.toFixed(2)}</td><td>{p.discount}</td><td>{total}</td>
                                    <td style={{gap:"15px",marginTop:"10px"}}>
                                        <Button size="sm" variant="success" className="me-1" onClick={() => handleRestockClick(p)}>Restock</Button>
                                        <Button size="sm" variant="warning" className="me-1" onClick={() => handleDeductClick(p)}>Deduct</Button>
                                        <Button size="sm" variant="info" className="me-1 text-white" onClick={() => handleUpdateClick(p)}>Update</Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(p)}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card>

            {/* Restock/Deduct Modal */}
            <Modal show={showRestockModal} onHide={() => setShowRestockModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === "restock" ? "Restock Product" : "Deduct Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Product:</strong> {selectedProduct?.name}</p>
                    <Form.Group>
                        <Form.Label>Enter quantity to {actionType}</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            max={actionType === "deduct" ? selectedProduct?.quantity : undefined}
                            value={restockQty}
                            onChange={(e) => setRestockQty(Number(e.target.value))}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRestockModal(false)}>Cancel</Button>
                    <Button variant={actionType === "restock" ? "primary" : "warning"} onClick={handleRestockSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Update Product</Modal.Title></Modal.Header>
                <Modal.Body>
                    {updateData && (
                        <Form>
                            {["name", "category", "supplier", "quantity", "unitPrice", "discount"].map((field, i) => (
                                <Form.Group className="mb-2" key={i}>
                                    <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                                    <Form.Control
                                        type={["quantity", "unitPrice", "discount"].includes(field) ? "number" : "text"}
                                        value={updateData[field]}
                                        onChange={handleUpdateChange(field)}
                                    />
                                </Form.Group>
                            ))}
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the product: <strong>{productToDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            {/* Add new product */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Inventory Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={newProduct.name} onChange={handleAddChange("name")} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" min="1" value={newProduct.quantity} onChange={handleAddChange("quantity")} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={newProduct.category} onChange={handleAddChange("category")}>
                                <option value="">-- Select Category --</option>
                                <option>Office Supplies</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control value={newProduct.supplier} onChange={handleAddChange("supplier")} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Unit Price (₹)</Form.Label>
                            <Form.Control type="number" min="0" value={newProduct.unitPrice} onChange={handleAddChange("unitPrice")} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Discount (₹ or %)</Form.Label>
                            <Form.Control placeholder="e.g., 10% or ₹50 or 50" value={newProduct.discount} onChange={handleAddChange("discount")} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddSubmit}>Add Item</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
