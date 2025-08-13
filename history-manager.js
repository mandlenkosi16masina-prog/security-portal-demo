/**
 * Employee history manager
 * Stores all histories in localStorage.employeeHistory
 */

function getEmployeeHistoryData() {
    try {
        return JSON.parse(localStorage.getItem("employeeHistory")) || [];
    } catch {
        return [];
    }
}

function saveEmployeeHistoryData(data) {
    localStorage.setItem("employeeHistory", JSON.stringify(data));
}

/**
 * Add or update employee history
 * @param {string} name - Full name of employee
 * @param {Object} record - { company, role, start, end }
 */
function addEmploymentRecord(name, record) {
    let data = getEmployeeHistoryData();

    // Find employee entry
    let employee = data.find(e => e.name.toLowerCase() === name.toLowerCase());

    if (!employee) {
        employee = { name, history: [] };
        data.push(employee);
    }

    // Append the new record
    employee.history.push(record);

    // Save
    saveEmployeeHistoryData(data);
}

/**
 * Optional: Remove all history
 */
function clearAllHistories() {
    localStorage.removeItem("employeeHistory");
}

/**
 * Optional: Mark an employment end date (if updating)
 */
function updateEmploymentEndDate(name, company, endDate) {
    let data = getEmployeeHistoryData();
    let employee = data.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (employee) {
        let job = employee.history.find(h => h.company === company && !h.end);
        if (job) job.end = endDate;
        saveEmployeeHistoryData(data);
    }
}
