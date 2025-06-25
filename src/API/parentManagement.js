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
