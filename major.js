// Major selection
function setMajorTitle() {
    const majorParam = getUrlParameter('major');
    const majorTitle = document.getElementById('major-title');
    
    // Gets major data from database
    const major = majorRequirements[majorParam] || majorRequirements["ite"];
    
    // Sets the title
    majorTitle.textContent = major.name;
    document.title = `${major.name} - Athens State University`;
    
    return majorParam || "ite";
}

// Displays courses in dropdown
function displayCourses(courses) {
    const courseListElement = document.getElementById('major-courses');
    
    // Clear existing dropdown (when going back to page)
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

// Semester choice buttons
function setupSemesterButtons() {
    const semesterButtons = document.querySelectorAll('.semester-buttons .btn');
    const major = getUrlParameter('major') || 'ite';
    
    semesterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the semester and year from button text
            const [semester, year] = this.textContent.trim().split(' ');
            
            // Goes to final page with your selection parameters
            window.location.href = `plan.html?major=${major}&semester=${semester}&year=${year}`;
        });
    });
}

// Setup page
window.onload = function() {
    const major = setMajorTitle();
    const courses = getCoursesForMajor(major);
    displayCourses(courses);
    setupDropdown('courses-dropdown', 'major-courses');
    setupSemesterButtons();
};