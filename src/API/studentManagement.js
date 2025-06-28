/**
 * Send data to the API
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {object} data - Data to send
 * @returns {Promise<any>} - API response data
 */
async function sendData(endpoint, method, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Failed to ${method} data to ${endpoint}`);
        }
        return await response;
    } catch (error) {
        console.error(`Error sending data to ${endpoint}:`, error);
        throw error;
    }
}
// const API_BASE_URL="http://localhost:5173/";
const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
async function adminStudentMngFetchData(endpoint) {
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
export async function adminGetAllStudentManagement(){
    return await adminStudentMngFetchData("students");
}
export async function addDataToAccount(account_studentdata){
    console.log(account_studentdata);
    return await sendData("accounts/add_student", "POST",account_studentdata);
}
export async function postSingleStudents(studentData) {
    let account_studentdata={
        "regdNo":studentData.id,
        "name":`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`,
        "mobile":`${studentData.fatherNumber || studentData.motherNumber || studentData.guardianNumber}`,
        "dob":`${studentData.dateOfBirth}`,
        "gender":`${studentData.gender}`,
        "class":`${studentData.admissionClass}`,
        "section":`${studentData.section}`,
        "fees": {
            "monthlyFees": Number(studentData.monthlyFees || 0),
            "busFees": studentData.busServices ? 300 : 0,
            "admissionFees": Number(studentData.admissionFees || 0),
            "paidAnnualFees": "False",
            "noOfMonthlyDues": 0
        }
    }
    addDataToAccount(account_studentdata);
    try{
        const response = await sendData('students', 'POST', studentData);
        return response
    }
    catch(error) {
        console.error('Error saving student data:', error);
        showAlert('Failed to save student data. Please try again.', 'danger');
    }
}

export async function sendUpdatedStudentData(updateData){
    try{
        const response = await sendData(`students/${updateData.id}`, 'PUT', updateData);
        return response
    }
    catch(error) {
        console.error('Error saving student data:', error);
        showAlert('Failed to save student data. Please try again.', 'danger');
    }
}






















export async function deleteStudentStMng(selectedIds){
    try {
        const response = await sendData(`students/${selectedIds}`, 'DELETE');
        if (!response.ok) {
            throw new Error(`Failed to delete student with ID ${selectedIds}`);
        }
        // loadingStudents();
    } catch (error) {
        console.error(`Error deleting student with ID ${selectedIds}:`, error);
        throw error;
    }
}



//Atendace Data
export async function getAttendanceOfStudents(){
    return await adminStudentMngFetchData("attendance/students");
}
// Student Fees
export async function getFeesOfStudents(){
    return await adminStudentMngFetchData("accounts/students");
}
//student Paid data
export async function getPaidAmountDataOfStudent() {
  const allStudentPayment = await adminStudentMngFetchData("accounts/students");
  const studentPaidAmounts = allStudentPayment.map(student => {
    const totalPaid = student.payments.reduce((sum, payment) => {
      return sum + (parseFloat(payment.paidAmount) || 0);
    }, 0);

    return {
      name:student.name,
      regdNo: student.regdNo,
      class: student.class,
      paidAmount: totalPaid
    };
  });
  return studentPaidAmounts;
}

