// Function to determine which major was selected and set appropriate title later
function setMajorTitle() {
    const majorParam = getUrlParameter('major');
    const majorTitle = document.getElementById('major-title');
    const isCS = majorParam === 'cs';
    
    if (isCS) {
        majorTitle.textContent = 'Computer Science';
        document.title = 'Computer Science - Athens State University';
        return 'cs';
    } else {
        // Default to mathematics for invalid or missing parameter, simply because it's the first one
        majorTitle.textContent = 'Mathematics';
        document.title = 'Mathematics - Athens State University';
        return 'mathematics';
    }
}

// Function to get the appropriate course list based on major
function getCourseList(major) {
    if (major === 'cs') {
        return csCourses || [];
    }
    return mathCourses; // Default to mathCourses just because it's on top of the "database"
}

// Function to display courses in the dropdown
function displayCourses(courses) {
    const courseListElement = document.getElementById('major-courses');
    
    // Clear any existing courses
    courseListElement.innerHTML = '';
    
    if (courses && courses.length > 0) {
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `<span class="course-code">${course.code}</span> - ${course.title}`;
            courseListElement.appendChild(courseItem);
        });
    } else {
        const noCourses = document.createElement('div');
        noCourses.className = 'course-item';
        noCourses.textContent = 'No courses available for this major.';
        courseListElement.appendChild(noCourses);
    }
}

// Setup semester buttons functionality
function setupSemesterButtons() {
    const semesterButtons = document.querySelectorAll('.semester-buttons .btn');
    const major = getUrlParameter('major') || 'mathematics';
    
    semesterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Parse the semester and year from button text
            const [semester, year] = this.textContent.trim().split(' ');
            
            // Navigate to the plan page with parameters selection in mind
            window.location.href = `plan.html?major=${major}&semester=${semester}&year=${year}`;
        });
    });
}

// Setup the dropdown functionality
function setupDropdown() {
    const dropdownHeader = document.getElementById('courses-dropdown');
    const dropdownContent = document.getElementById('major-courses');
    
    dropdownHeader.addEventListener('click', function() {
        toggleDropdown(this, dropdownContent);
    });
}

// Initialize page
window.onload = function() {
    const major = setMajorTitle();
    const courses = getCourseList(major);
    displayCourses(courses);
    setupDropdown();
    setupSemesterButtons();
};