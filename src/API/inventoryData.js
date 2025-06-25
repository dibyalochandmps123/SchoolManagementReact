 /**
 * Send data to the API
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {object} data - Data to send
 * @returns {Promise<any>} - API response data
 */
// const API_BASE_URL="http://localhost:5173/";
const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
// Fetch
async function adminInventoryMngFetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
}
// Send Data
// Generic function for sending POST/PUT/PATCH/DELETE requests
async function adminInventoryMngSendData(endpoint, method, bodyData = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method} data to ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error sending data to ${endpoint}:`, error);
    throw error;
  }
}


// Api call
export async function getAllInventoryData(){
    return await adminInventoryMngFetchData("inventory");
}
// Restock
export const restockProduct = async (name, quantity) => {
  return await adminInventoryMngSendData(`inventory/${name}/restock`, "POST", { quantity });
};
// Deduct
export const deductProduct = async (name, quantity) => {
  return await adminInventoryMngSendData(`inventory/${name}/deduct`, "POST", { quantity });
};
// Update
export const updateStock = async (name, body) => {
  return await adminInventoryMngSendData(`inventory/${name}`, "PUT", body);
};
// Delete
export async function deleteProduct(productName) {
  return await adminInventoryMngSendData(`inventory/${productName}`,"DELETE");
}
// Add product
export async function addProduct(productData) {
  return await adminInventoryMngSendData(`inventory`,"POST",productData);
}


