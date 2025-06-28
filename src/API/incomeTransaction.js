const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
async function transactionDetails(endpoint) {
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

export async function getExpensesData(){
    return await transactionDetails("expenses");
}
export async function generateIncomeData(){
    let students=await transactionDetails("accounts/students");
    let count = 1;
    const incomeArray = [];
    students.forEach((student) => {
        student.payments.forEach((payment) => {
        if (payment.paidAmount > 0) {
            const date =
            payment.history && payment.history.length > 0
                ? payment.history[payment.history.length - 1].timestamp
                : "N/A";
            incomeArray.push({
            incomeId: `INC${count.toString().padStart(3, "0")}`,
            name: student.name,
            class: student.class,
            feeTitle: payment.description,
            amount: payment.paidAmount,
            date: date,
            });

            count++;
        }
        });
    });
  return incomeArray;
}
export async function generateExpensesData(){
    let expenses=await transactionDetails("expenses");
    const expensesArray = expenses.map((item, index) => {
        return {
            expenseId: `EXP${(index + 1).toString().padStart(3, "0")}`,
            year:item.accountingYear,
            voucher:item.voucherNo,
            particular: item.particulars,
            typeOfExpense: item.expenseType,
            amount:item.amount,
            paidBy:item.paidBy,
            paidTo:item.paidTo,
            amount: item.amount,
            paymentMode:item.paymentMode,
            date: "2025-04-01" // you can replace this with a real date field if available
        };
    });
  return expensesArray;
}