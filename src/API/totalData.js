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
async function sendListOfAllActor(endpoint) {
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
export async function provideListOfAllActor(){
    let allStaff=await sendListOfAllActor("/staff");
    let teachingStaffs = allStaff.filter(staff => staff.department === 'Teaching');
// classListOfSchool.classes,classListTeacher,staffDeptpartmentListOfSchool,staffListDesignation
    let classListOfSchool=await sendListOfAllActor("/class/settings");
    // let classListOfSchool=Object.keys(classSectionData);
    const classListTeacher = teachingStaffs.map(staff => staff.name);
    let staffDeptpartmentList=await sendListOfAllActor("departments");
    let staffListDesignation=await sendListOfAllActor("designations");
    // console.log("Items are :",classListOfSchool);
    return [classListOfSchool.classes,classListTeacher,staffDeptpartmentList,staffListDesignation];
}
export async function sendClassAvailableData(){
    return await sendListOfAllActor("settings/information/class");
}
// Get class wise fees
export async function getFeesOfStudents(){
    let allClassFeesData=await sendListOfAllActor("class/settings");
    return allClassFeesData.fees;
}
 