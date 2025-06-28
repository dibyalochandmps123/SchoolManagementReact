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
async function adminParentMngFetchData(endpoint) {
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
export async function adminGetAllParentManagement(){
    let getParentData=await adminParentMngFetchData(`/parents`);
    return getParentData["parents"];
}
//Send Data
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
// Post parent data
export async function sendAddNewParent(addNewParentData){
    try{
        const response = await sendData(`parents`, 'POST', addNewParentData);
        return response
    }
    catch(error) {
        console.error('Error saving parent data:', error);
        showAlert('Failed to save parent data. Please try again.', 'danger');
    }
}
// Put update parent data
export async function putUpdateExistsParent(putUpdateData){
    try{
        console.log(putUpdateData);
        
        const response = await sendData(`parents/${putUpdateData.id}`, 'PUT', putUpdateData);
        return response
    }
    catch(error) {
        console.error('Error saving edit parent data:', error);
        showAlert('Failed to save Edit parent data. Please try again.', 'danger');
    }
}