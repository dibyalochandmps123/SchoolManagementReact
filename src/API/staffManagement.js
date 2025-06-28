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
async function adminSatffMngFetchData(endpoint) {
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
// Send data
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





export async function adminGetAllStaffManagement(){
    let getStaffData=await adminSatffMngFetchData(`/staff`);
    return getStaffData;
}
export async function getAttendanceOfStaffs(){
    return await adminSatffMngFetchData("attendance/staffs")
}
// Add Staff
export async function postAddNewStaff(newStaffData){
    try{
        const response = await sendData(`staff/add`, 'POST', newStaffData);
        alert("Submitted !!");
        return response
    }
    catch(error) {
        console.error('Error saving staff data:', error);
    }
}
//Update Staff
export async function putUpdateStaffData(editStaffData){
    try{
        const response = await sendData(`staff?staffId=${editStaffData.staffId}`, 'PUT', editStaffData);
        alert("Submitted !!");
        return response
    }
    catch(error) {
        console.error('Error saving edited staff data:', error);
    }
}

