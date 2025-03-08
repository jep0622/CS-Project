// Get the major and starting semester from URL parameters
function getParameters() {
    return {
        major: getUrlParameter('major') || 'mathematics',
        startingSemester: getUrlParameter('semester') || 'Fall',
        startingYear: parseInt(getUrlParameter('year') || '2025')
    };
}

// Set the page title based on the major selection
function setPageTitles(major) {
    const planMajor = document.getElementById('plan-major');
    const isMathematics = major !== 'cs';
    
    planMajor.textContent = isMathematics ? 'Mathematics' : 'Computer Science';
    document.title = `${planMajor.textContent} Academic Plan - Athens State University`;
}

// Get courses based on major, this assumes you gotta take all the courses under the major
function getCourses(major) {
    return major === 'cs' ? (csCourses || []) : mathCourses;
}

// Generate future semesters based on starting semester selection
function generateSemesters(startingSemester, startingYear, numberOfSemesters = 8) {
    const semesters = [];
    const semesterOrder = ['Fall', 'Spring', 'Summer'];
    let currentSemIndex = semesterOrder.indexOf(startingSemester);
    let currentYear = startingYear;
    
    for (let i = 0; i < numberOfSemesters; i++) {
        semesters.push({
            name: semesterOrder[currentSemIndex],
            year: currentYear,
            courses: []
        });
        
        // Move to next semester and increment year if we cycle back to Fall
        currentSemIndex = (currentSemIndex + 1) % semesterOrder.length;
        if (currentSemIndex === 0) {
            currentYear++;
        }
    }
    
    return semesters;
}

// Check if a course's prerequisites have been completed
function arePrereqsMet(course, completedCourses) {
    if (!course.prereqs || course.prereqs.length === 0) {
        return true;
    }
    
    return course.prereqs.every(prereq => completedCourses.includes(prereq));
}

// Check if a course is available in a given semester
function isCourseAvailableInSemester(course, semesterName, year) {
    // Check if the course is offered in this semester
    if (!course.availableSemesters.includes(semesterName)) {
        return false;
    }
    
    // Check even/odd year restrictions if applicable
    if (course.availableYears) {
        const isEvenYear = year % 2 === 0;
        const yearType = isEvenYear ? 'EvenYear' : 'OddYear';
        if (!course.availableYears.includes(yearType)) {
            return false;
        }
    }
    
    return true;
}

// Build the academic plan
function buildAcademicPlan(courses, startingSemester, startingYear) {
    const semesters = generateSemesters(startingSemester, startingYear, 12);
    const completedCourses = [];
    const remainingCourses = [...courses];
    
    let lastSemWithCourses = -1;
    
    semesters.forEach((semester, index) => {
        const availableCourses = remainingCourses.filter(course => 
            arePrereqsMet(course, completedCourses) &&
            isCourseAvailableInSemester(course, semester.name, semester.year)
        );
        
        // Take up to 4 courses per semester, arbitrary limit set by me
        const coursesToTake = availableCourses.slice(0, 4);
        
        // Add courses to this semester
        semester.courses = coursesToTake;
        
        // Track the last semester that has courses
        if (coursesToTake.length > 0) {
            lastSemWithCourses = index;
        }
        
        // Update tracking of completed and remaining courses
        coursesToTake.forEach(course => {
            completedCourses.push(course.code);
            
            const courseIndex = remainingCourses.findIndex(c => c.code === course.code);
            if (courseIndex !== -1) {
                remainingCourses.splice(courseIndex, 1);
            }
        });
    });
    
    // Return only relevant semesters (those with courses + one empty semester if needed)
    if (remainingCourses.length === 0) {
        return semesters.slice(0, lastSemWithCourses + 1);
    }
    
    return semesters.slice(0, lastSemWithCourses + 2);
}

// Create HTML for the semester plan
function createSemesterPlanHTML(semesters) {
    const semesterContainer = document.getElementById('semester-plan-container');
    const headerElements = [];
    const contentElements = [];
    
    semesters.forEach((semester, index) => {
        const semesterDiv = document.createElement('div');
        semesterDiv.className = 'semester-dropdown';
        
        // Create semester header
        const semesterHeader = document.createElement('div');
        semesterHeader.className = 'dropdown-header';
        semesterHeader.textContent = `${semester.name} ${semester.year}`;
        semesterHeader.setAttribute('data-index', index);
        
        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = '&#9662;';
        semesterHeader.appendChild(arrow);
        
        // Create semester content
        const semesterContent = document.createElement('div');
        semesterContent.className = 'dropdown-content';
        semesterContent.id = `semester-${index}`;
        
        if (semester.courses.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-semester';
            emptyMessage.textContent = 'No available courses for this semester.';
            semesterContent.appendChild(emptyMessage);
        } else {
            semester.courses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.className = 'course-item';
                
                // Course details (left side)
                const courseDetails = document.createElement('div');
                courseDetails.className = 'course-details';
                
                const courseTitle = document.createElement('div');
                courseTitle.innerHTML = `<span class="course-code">${course.code}</span> - ${course.title}`;
                courseDetails.appendChild(courseTitle);
                
                if (course.prereqs && course.prereqs.length > 0) {
                    const coursePrereqs = document.createElement('div');
                    coursePrereqs.className = 'course-prereqs';
                    coursePrereqs.textContent = `Prerequisites: ${course.prereqs.join(', ')}`;
                    courseDetails.appendChild(coursePrereqs);
                }
                
                // Course location (right side)
                const courseLocation = document.createElement('div');
                courseLocation.className = 'course-location';
                courseLocation.textContent = course.campus === 'DL' ? 'Distance Learning' : 'Blended';
                
                courseItem.appendChild(courseDetails);
                courseItem.appendChild(courseLocation);
                semesterContent.appendChild(courseItem);
            });
        }
        
        semesterDiv.appendChild(semesterHeader);
        semesterDiv.appendChild(semesterContent);
        semesterContainer.appendChild(semesterDiv);
        
        headerElements.push(semesterHeader);
        contentElements.push(semesterContent);
    });
    
    return { headerElements, contentElements };
}

// Setup dropdown functionality for semesters
function setupDropdowns(headerElements, contentElements) {
    headerElements.forEach((header, index) => {
        header.addEventListener('click', function() {
            toggleDropdown(this, contentElements[index]);
        });
    });
}

// Initialize the page
window.onload = function() {
    const params = getParameters();
    setPageTitles(params.major);
    
    const courses = getCourses(params.major);
    const plan = buildAcademicPlan(courses, params.startingSemester, params.startingYear);
    
    const { headerElements, contentElements } = createSemesterPlanHTML(plan);
    setupDropdowns(headerElements, contentElements);
    
    // Automatically open the first semester
    if (headerElements.length > 0) {
        toggleDropdown(headerElements[0], contentElements[0]);
    }
};