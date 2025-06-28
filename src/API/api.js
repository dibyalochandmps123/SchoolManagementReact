// Centralized API interaction module
// PRODUCTION SERVER NGROK TEMPORARY
// const API_BASE_URL = "https://early-apt-flea.ngrok-free.app/api";
// LOCAL SERVER
// const API_BASE_URL = "http://localhost:5000/api";
// LOCAL SERVER DOCKER
// const API_BASE_URL ="http://localhost/api";
// PRODUCTION SERVER
const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
//#region GET REQUEST FUNCTION
/**
 * Fetch data from the API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} - API response data
 */
async function fetchData(endpoint) {
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




//#endregion
async function fetchBlobData(url, options = {}, expectBlob = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/${url}`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from /api/${url}`);
    }
    return expectBlob ? await response.blob() : await response.json();
  } catch (err) {
    console.error(`Error fetching data from /${url}:`, err);
    throw err;
  }
}




//#region POST, PUT & DELETE REQUEST FUNCTION
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



//#endregion
async function getAllStudents() {
    return await fetchData('students');
}
async function postAllStudents(studentData) {
    try{
        const response = await sendData('students', 'POST', studentData);
        loadPage('student-management');
        return response
    }
    // return await sendData('students', 'POST', studentData);
    catch(error) {
        console.error('Error saving student data:', error);
        showAlert('Failed to save student data. Please try again.', 'danger');
    }
}
/**
 * Delete a student
 * @param {string} studentId - The student ID
 */
async function deleteStudent(studentId) {
    try {
        const response = await sendData(`students/${studentId}`, 'DELETE');
        if (!response.ok) {
            throw new Error(`Failed to delete student with ID ${studentId}`);
        }
        loadingStudents();
    } catch (error) {
        console.error(`Error deleting student with ID ${studentId}:`, error);
        throw error;
    }
}