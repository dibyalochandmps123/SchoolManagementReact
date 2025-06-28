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
async function adminSettingMngFetchData(endpoint) {
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
async function adminSettingMngSendData(endpoint, method, bodyData = {}) {
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



// Registration Settings*************************************************
export async function addProtocols(protocolsData) {
  return await adminSettingMngSendData(`reg`,"PUT",protocolsData);
}
export async function getProtocols() {
  return await adminSettingMngFetchData(`reg`);
}
// Class Settings********************************************************
// For clasess
export async function getClassSettings(){
    let classData=await adminSettingMngFetchData("class/settings");
    return classData;
}
export async function sendClassSettings(newClassData){
    return await adminSettingMngSendData("class/settings", "PUT", newClassData);
}
export async function updateClassSettings(newSectionMap){
    return await adminSettingMngSendData("class/settings","PUT",newSectionMap)
}
// For subject
export async function getSubjectSettings(){
    let subjectsData=await adminSettingMngFetchData("subjects");
    return subjectsData;
}
export async function sendSubjectSettings(updatedSubjects){
  return await adminSettingMngSendData("subjects","PUT",updatedSubjects)
}
// Staff Settings*************************************************************
export async function getDepartmentData(){
  return await adminSettingMngFetchData("departments");
}
export async function sendDepartmentData(newDepartment){
  return await adminSettingMngSendData("departments/add","POST",newDepartment);
}
export async function getDesignantionData(){
  return await adminSettingMngFetchData("designations");
}
export async function sendDesignantionData(newDesignation){
  return await adminSettingMngSendData("designations/add","POST",newDesignation);
}
// Account Settings****************************************************************************
export async function getClassExpensesFirstData(){
  let payload= await adminSettingMngFetchData("accounts/outstanding_fees");
  const classExpenses = Object
  .entries(payload.class_fees)
  .flatMap(([cls, fees]) =>
    fees.map(({ amount, description }) => ({
      class: cls,
      description,
      amount
    }))
  );
const sectionExpenses = Object
  .entries(payload.section_fees)
  .flatMap(([classSection, fees]) =>
    fees.map(({ amount, description }) => ({
      classSection,
      description,
      amount
    }))
  );
  return [classExpenses,sectionExpenses];
}
export async function sendClassExpensesFirstData(classExpenses){
  if(classExpenses.fee_type==="class_fee"){
    return await adminSettingMngSendData("accounts/add_class_fee","POST",classExpenses);
  }
  if(classExpenses.fee_type==="section_fee"){
    return await adminSettingMngSendData("accounts/add_section_fee","POST",classExpenses)
  }
}
// in API/adminSettings.js
export const deleteClassExpense = async (data) => {
  return await adminSettingMngSendData("accounts/delete_class_fee","DELETE",data);
};
export const deleteSectionExpense = async (data) => {
  return await adminSettingMngSendData("accounts/delete_section_fee","DELETE",data);
};
//Account Class Fees**********************
export async function getClassFeesData(){
  const classes_data=await adminSettingMngFetchData("class/settings");
  return classes_data.fees;
}
export async function sendClassFeesData(payload,selectedClass){
  payload['class']=selectedClass;
  return await adminSettingMngSendData(`class/settings/fees`, 'POST', payload);
}
//Account Payment Modes*********************
export async function getPaymentModeData(){
  return await adminSettingMngFetchData("settings/information/school/payment");
}
export async function sendPaymentModeData(data){
  return await adminSettingMngSendData(`settings/information/school/payment`, 'POST', data);
}
// Expenses Types*****************************
export async function getExpenseTypeData(){
  return await adminSettingMngFetchData("settings/information/school/expense");
}
export async function sendExpenseTypeData(data){
  return await adminSettingMngSendData(`settings/information/school/expense`, 'POST', data);
}