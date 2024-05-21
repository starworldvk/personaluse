document.addEventListener("DOMContentLoaded", function() {
    // Event listener for form submission
    document.getElementById("attendanceForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        submitAttendance();
    });

    // Event listener for export button click
    document.getElementById("exportButton").addEventListener("click", function() {
        exportToCSV();
    });

    // Event listener for show data button click
    document.getElementById("showDataButton").addEventListener("click", function() {
        showEnteredData();
    });
});

function submitAttendance() {
    var userName = document.getElementById("userName").value;
    var date = document.getElementById("date").value;
    var timeIn = document.getElementById("timeIn").value;
    var timeOut = document.getElementById("timeOut").value;

    // Calculate total hours worked
    var totalHoursWorked = calculateTotalHours(timeIn, timeOut);
    var overtimeHours = totalHoursWorked > 10 ? totalHoursWorked - 10 : 0;

    if (userName.trim().toLowerCase() === "ashok") { // Check if employee name is Ashok
        var attendanceData = {
            userName: userName,
            date: date,
            timeIn: timeIn,
            timeOut: timeOut,
            totalHoursWorked: totalHoursWorked,
            overtimeHours: overtimeHours
        };

        // Save attendance data to localStorage
        var savedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        savedData.push(attendanceData);
        localStorage.setItem("attendanceData", JSON.stringify(savedData));

        // Display overtime
        var overtimeDisplay = document.getElementById("overtimeDisplay");
        if (overtimeHours > 0) {
            overtimeDisplay.textContent = "Overtime: " + overtimeHours.toFixed(2) + " hours";
        } else {
            overtimeDisplay.textContent = "No overtime";
        }

        alert("Attendance logged successfully!");
    } else {
        alert("Only Ashok can log attendance!");
    }
}

function exportToCSV() {
    var savedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    var csvContent = "data:text/csv;charset=utf-8,"
        + "Employee Name,Date,Time In,Time Out\n";

    savedData.forEach(function(data) {
        csvContent += data.userName + "," + data.date + ","
            + data.timeIn + "," + data.timeOut + "\n";
    });

    // Create a link and trigger download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_data.csv");
    document.body.appendChild(link);
    link.click();
}

function showEnteredData() {
    var savedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    var displayArea = document.getElementById("enteredDataDisplay");
    displayArea.innerHTML = ""; // Clear previous content

    if (savedData.length === 0) {
        displayArea.textContent = "No attendance data entered yet.";
    } else {
        savedData.forEach(function(data, index) {
            var entry = document.createElement("div");
            entry.textContent = "Entry " + (index + 1) + ": " + JSON.stringify(data);
            displayArea.appendChild(entry);
        });
    }
}


function calculateTotalHours(timeIn, timeOut) {
    // Implement your logic to calculate total hours worked from timeIn and timeOut
    // Example:
    // var timeInParts = timeIn.split(":");
    // var timeOutParts = timeOut.split(":");
    // var hoursIn = parseInt(timeInParts[0]);
    // var minutesIn = parseInt(timeInParts[1]);
    // var hoursOut = parseInt(timeOutParts[0]);
    // var minutesOut = parseInt(timeOutParts[1]);
    // var totalHours = (hoursOut - hoursIn) + (minutesOut - minutesIn) / 60;
    // return totalHours;
    var timeInParts = timeIn.split(":");
    var timeOutParts = timeOut.split(":");
    var timeInMinutes = parseInt(timeInParts[0]) * 60 + parseInt(timeInParts[1]);
    var timeOutMinutes = parseInt(timeOutParts[0]) * 60 + parseInt(timeOutParts[1]);
    return (timeOutMinutes - timeInMinutes) / 60;
    return 0; // Placeholder value
}
