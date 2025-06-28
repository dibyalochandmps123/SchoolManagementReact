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
async function adminClassMngFetchData(endpoint) {
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







export async function adminGetAllClassManagement(clsName,clsSection){
    let getClasses=await adminClassMngFetchData(`classes`);
    let timeTable=getClasses.map(item=>({
        className:item.standard,
        classSection:item.section,
        classTimeTable:item.timeTable
    }))
    // console.log(getClasses,timeTable);
    return getClasses;
}
export async function getAllSubject(){
    return await adminClassMngFetchData("subjects");
}
export async function getExistingSections(){
    let allClassDetailsArray=await adminClassMngFetchData("classes");
    const allClassesData = allClassDetailsArray.map(item => ({
        class: item.standard,
        section: item.section
    }));
    const existingSections = allClassesData.reduce((acc, item) => {
        if (!acc[item.class]) acc[item.class] = [];
        acc[item.class].push(item.section);
        return acc;
    }, {});
    return existingSections;
}
// Add class Data
export async function sendAddNewClass(newClass){
    try{
        const response = await sendData('class', 'POST', newClass);
        alert("Submitted Class Data !!")
        return response
    }
    catch(error) {
        console.error('Error saving Class data:', error);
        showAlert('Failed to save Class data. Please try again.', 'danger');
    }
    finally{
        return "Complete";
    }
}
// Edit class data
export async function putEditExistsClass(existsClass){
    try{
        const response = await sendData(`class?class_standard='${existsClass.standard}'&class_section='${existsClass.section}'`, 'PUT', existsClass);
        alert("Submitted Edit Class Data !!")
        return response
    }
    catch(error) {
        console.error('Error saving Edit Class data:', error);
        showAlert('Failed to save Edit Class data. Please try again.', 'danger');
    }
    finally{
        return "Complete";
    }
}