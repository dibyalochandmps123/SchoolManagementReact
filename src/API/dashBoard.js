// const API_BASE_URL="http://localhost:5173/";
const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
async function adminDashboardFetchData(endpoint) {
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
function genderCount(stCount){
    let data=stCount.reduce((acc, curr) => {
        if (curr.gender === "Male") acc.male++;
        else if (curr.gender === "Female") acc.female++;
        else acc.other++;
        return acc;
    },{ male: 0, female: 0, other: 0 });
    return data;
}
function studentDistributionCount(stCount,activeClass){
    let distributionData=activeClass.map(cls => ({name:cls,students:0}));
    stCount.forEach(student => {
        const cls = student.admissionClass;
        const classEntry = distributionData.find(entry => entry.name === cls);
        if (classEntry) {
            classEntry.students++;
        }
    });
    return distributionData;
}
export async function getAdminDashboardCountData(){
    let stCount=await adminDashboardFetchData("/students");
    let gendCount=await genderCount(stCount);
    let staffCount=await adminDashboardFetchData("/staff");
    let activeClass=await adminDashboardFetchData("class/settings");
    let activeClassCount=Object.keys(activeClass.classes)
    let availSubCount=await adminDashboardFetchData("/subjects");
    let stdDistCount=await studentDistributionCount(stCount,activeClassCount);
    return [stCount.length,staffCount.length,activeClassCount.length,availSubCount.length,gendCount["male"],gendCount["female"],gendCount["other"],stdDistCount];
}


