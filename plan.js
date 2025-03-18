// Globals
let completedCourses = [];
let currentSemester = { name: '', year: 0, courses: [] };
let completedSemesters = [];
let remainingRequiredCourses = [];
let currentMajor = '';

function getMaxCoursesForSemester(semesterName) {
    return semesterName === 'Summer' ? 2 : 5;
}

// DOM element cache
const domElements = {};

// Setup page
window.onload = function() {
    // Cache the stuff used a lot
    cacheDomElements();
    
    // Get parameters from prior selections
    const params = getParameters();
    currentMajor = params.major;
    setPageTitles(currentMajor);
    
    // Setup first semester
    currentSemester = {
        name: params.startingSemester,
        year: params.startingYear,
        courses: []
    };
    
    // Update semester display
    domElements.currentSemester.textContent = `${currentSemester.name} ${currentSemester.year}`;
    
    // Get major courses
    const majorCourses = getCoursesForMajor(currentMajor);
    remainingRequiredCourses = [...majorCourses];
    
    // Show available courses
    renderAvailableCourses();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup dropdowns
    setupDropdowns();
};

// Cached DOM stuff used a lot
function cacheDomElements() {
    domElements.currentSemester = document.getElementById('current-semester');
    domElements.availableCourses = document.getElementById('available-courses');
    domElements.selectedCourses = document.getElementById('selected-courses');
    domElements.emptySelection = document.getElementById('empty-selection');
    domElements.selectedCount = document.getElementById('selected-count');
    domElements.nextSemesterBtn = document.getElementById('next-semester-btn');
    domElements.backBtn = document.getElementById('back-btn');
    domElements.completedSemesters = document.getElementById('completed-semesters');
    domElements.graduationMessage = document.getElementById('graduation-message');
    domElements.courseSelectionPanel = document.querySelector('.course-selection-panel');
    domElements.filterButtons = document.querySelectorAll('.filter-btn');
    domElements.requirementsList = document.getElementById('requirements-list');
    domElements.electivesList = document.getElementById('electives-list');
}

// Get previous page parameters (major and semester)
function getParameters() {
    return {
        major: getUrlParameter('major') || 'mathematics',
        startingSemester: getUrlParameter('semester') || 'Fall',
        startingYear: parseInt(getUrlParameter('year') || '2025')
    };
}

// Set title based on major
function setPageTitles(majorId) {
    const planMajor = document.getElementById('plan-major');
    const majorName = majorRequirements[majorId]?.name || 'Mathematics';
    
    planMajor.textContent = majorName;
    document.title = `${majorName} Build Your Plan - Athens State University`;
}

// Setup
function setupEventListeners() {
    // Next semester button
    domElements.nextSemesterBtn.addEventListener('click', completeSemester);
    
    // Back button
    domElements.backBtn.addEventListener('click', () => window.history.back());
    
    // Filter buttons
    domElements.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update status
            domElements.filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            filterCourses(this.getAttribute('data-filter'));
        });
    });
}

// Setup dropdowns
function setupDropdowns() {
    // Setup requirements dropdown
    setupDropdown('requirements-dropdown', 'requirements-list', populateRequirementsList);
    
    // Setup electives dropdown
    setupDropdown('electives-dropdown', 'electives-list', populateElectivesList);
}

// Populate requirements dropdown
function populateRequirementsList() {
    const requirementsList = domElements.requirementsList;
    
    if (!requirementsList) return;
    
    // Clear previous content if going back
    requirementsList.innerHTML = '';
    
    // Check if the major's requirements are in the database
    if (!majorRequirements || !majorRequirements[currentMajor]) {
        const noRequirements = document.createElement('div');
        noRequirements.className = 'course-item';
        noRequirements.textContent = 'No requirements available.';
        requirementsList.appendChild(noRequirements);
        return;
    }
    
    // Get course codes for the major
    const requiredCodes = majorRequirements[currentMajor].requiredCourses;
    
    // Display required courses
    requiredCodes.forEach(courseCode => {
        const course = courseDatabase[courseCode];
        
        if (course) {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <span class="course-code">${course.code}</span> - ${course.title}
                <div class="course-details">
                    <small>Campus: ${getCampusDisplayText(course.campus)}</small>
                    <small>Available: ${course.availableSemesters.join(', ')}</small>
                    ${course.prereqs && course.prereqs.length > 0 ? 
                      `<small>Prerequisites: ${course.prereqs.join(', ')}</small>` : ''}
                </div>
            `;
            requirementsList.appendChild(courseItem);
        }
    });
}

// Populate electives dropdown
function populateElectivesList() {
    const electivesList = domElements.electivesList;
    
    if (!electivesList) return;
    
    // Clear previous content if going back
    electivesList.innerHTML = '';
    
    // Check if there are electives for the major in the database
    if (!electiveCourses || !electiveCourses[currentMajor]) {
        const noElectives = document.createElement('div');
        noElectives.className = 'course-item';
        noElectives.textContent = 'No elective options available.';
        electivesList.appendChild(noElectives);
        return;
    }
    
    // Get electives for major
    const electiveCodes = electiveCourses[currentMajor].courses;
    
    // Display electives
    electiveCodes.forEach(courseCode => {
        const course = courseDatabase[courseCode];
        
        if (course) {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <span class="course-code">${course.code}</span> - ${course.title}
                <div class="course-details">
                    <small>Campus: ${getCampusDisplayText(course.campus)}</small>
                    <small>Available: ${course.availableSemesters.join(', ')}</small>
                </div>
            `;
            electivesList.appendChild(courseItem);
        }
    });
}

// Filter courses based on selection
function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const isAvailable = !card.classList.contains('unavailable');
        
        // Apply filter
        if (filter === 'all') {
            card.style.display = '';
        } else if (filter === 'available') {
            card.style.display = isAvailable ? '' : 'none';
        } else {
            card.style.display = 'none';
        }
    });
}

// Check semester for course availability
function isCourseAvailable(course) {
    // Check prereqs
    if (course.prereqs && course.prereqs.length > 0) {
        const prereqsMet = course.prereqs.every(prereq => completedCourses.includes(prereq));
        if (!prereqsMet) {
            return false;
        }
    }
    
    // Check semester
    if (!course.availableSemesters.includes(currentSemester.name)) {
        return false;
    }
    
    // Check year 
    if (course.availableYears) {
        const isEvenYear = currentSemester.year % 2 === 0;
        const yearType = isEvenYear ? 'EvenYear' : 'OddYear';
        if (!course.availableYears.includes(yearType)) {
            return false;
        }
    }
    
    return true;
}

// Get missing prereqs to display
function getMissingPrereqs(course) {
    if (!course.prereqs || course.prereqs.length === 0) {
        return [];
    }
    
    return course.prereqs.filter(prereq => !completedCourses.includes(prereq));
}

// Display campus codes (distant, blended, etc)
function getCampusDisplayText(campusCode) {
    switch(campusCode) {
        case 'DL':
            return 'Distance Learning';
        case 'BL':
            return 'Blended';
        case 'UN':
            return 'Unknown';
        default:
            return campusCode; // Fallback to show the code itself
    }
}

// Render available courses
function renderAvailableCourses() {
    domElements.availableCourses.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    // Only show remaining required courses so user can just keep picking until they're gone
    remainingRequiredCourses.forEach(course => {
        const isAvailable = isCourseAvailable(course);
        const missingPrereqs = getMissingPrereqs(course);
        const isSelected = currentSemester.courses.some(c => c.code === course.code);
        
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${isAvailable ? '' : 'unavailable'} ${isSelected ? 'selected' : ''}`;
        courseCard.setAttribute('data-code', course.code);
        
        // Create course content for display
        courseCard.innerHTML = `
            <div>
                <strong class="course-code">${course.code}</strong> - ${course.title}
            </div>
            <div>
                <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}">
                    ${isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <span class="status-badge badge-campus">
                    ${getCampusDisplayText(course.campus)}
                </span>
            </div>
            ${missingPrereqs.length > 0 ? 
                `<div style="margin-top: 5px; font-size: 0.8rem; color: #dc3545;">
                    Missing prerequisites: ${missingPrereqs.join(', ')}
                </div>` : ''}
        `;
        
        // Allow clicking only if they're available
        if (isAvailable) {
            courseCard.addEventListener('click', () => toggleCourseSelection(course));
        }
        
        fragment.appendChild(courseCard);
    });
    
    domElements.availableCourses.appendChild(fragment);
    
    // If there's no courses left to pick, you're graduated yaaaay
    if (remainingRequiredCourses.length === 0) {
        showGraduationMessage();
    }
}

// Toggle course selection
function toggleCourseSelection(course) {
    const courseIndex = currentSemester.courses.findIndex(c => c.code === course.code);
    const courseCard = document.querySelector(`.course-card[data-code="${course.code}"]`);
    
    if (courseIndex === -1) {
        // Add course if not at max
        if (currentSemester.courses.length < getMaxCoursesForSemester(currentSemester.name)) {
            currentSemester.courses.push(course);
            courseCard.classList.add('selected');
            updateSelectedCourses();
            
            // Update the requirements and electives dropdowns to show "In Progress" status
            populateRequirementsList();
            populateElectivesList();
        }
    } else {
        // Remove course
        currentSemester.courses.splice(courseIndex, 1);
        courseCard.classList.remove('selected');
        updateSelectedCourses();
        
        // Update the requirements and electives lists to remove "In Progress" status
        populateRequirementsList();
        populateElectivesList();
    }
    
    // Toggles next semester button
    domElements.nextSemesterBtn.disabled = currentSemester.courses.length === 0;
}

// Update selected courses display
function updateSelectedCourses() {
    const container = domElements.selectedCourses;
    const emptyMessage = domElements.emptySelection;
    const selectedCountElement = domElements.selectedCount;
    
    // Update count
    selectedCountElement.textContent = currentSemester.courses.length;
    
    // Update the x/5 and x/2 thingy
    const creditCountElement = document.querySelector('.credit-count');
    creditCountElement.innerHTML = `<span id="selected-count">${currentSemester.courses.length}</span>/${getMaxCoursesForSemester(currentSemester.name)} courses`;
    
    // Show/hide empty message
    if (currentSemester.courses.length === 0) {
        emptyMessage.style.display = '';
        container.querySelectorAll('.selected-course-item').forEach(item => item.remove());
        return;
    } else {
        emptyMessage.style.display = 'none';
    }
    
    // Remove existing items
    container.querySelectorAll('.selected-course-item').forEach(item => item.remove());

    const fragment = document.createDocumentFragment();
    
    // Add new items
    currentSemester.courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'selected-course-item';
        
        courseItem.innerHTML = `
            <div>
                <strong>${course.code}</strong> - ${course.title}
                <div style="font-size: 0.8rem; color: #6c757d;">${getCampusDisplayText(course.campus)}</div>
            </div>
            <button class="remove-course" data-code="${course.code}">Remove</button>
        `;
        
        // Remove button 
        const removeButton = courseItem.querySelector('.remove-course');
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCode = this.getAttribute('data-code');
            const courseToRemove = remainingRequiredCourses.find(c => c.code === courseCode);
            toggleCourseSelection(courseToRemove);
        });
        
        fragment.appendChild(courseItem);
    });
    
    container.appendChild(fragment);
}

// Complete semester and go to next one
function completeSemester() {
    if (currentSemester.courses.length === 0) {
        return;
    }
    
    // Copy of current semester
    const completedSemesterCopy = {
        name: currentSemester.name,
        year: currentSemester.year,
        courses: JSON.parse(JSON.stringify(currentSemester.courses))
    };
    
    // Add current semester to completed semesters
    completedSemesters.push(completedSemesterCopy);
    
    // Display completed semester
    displayCompletedSemester(completedSemesterCopy);
    
    // Update completed courses and remove them from remaining courses
    const coursesToRemove = new Set();
    
    currentSemester.courses.forEach(course => {
        completedCourses.push(course.code);
        coursesToRemove.add(course.code);
    });
    
    // Filter remaining courses
    remainingRequiredCourses = remainingRequiredCourses.filter(course => !coursesToRemove.has(course.code));
    
    // Check for graduation
    if (remainingRequiredCourses.length === 0) {
        // Show graduation message
        showGraduationMessage();
        return;
    }
    
    // Advance to next semester
    advanceToNextSemester();
    
    // Clear current semester courses
    currentSemester.courses = [];
    
    // Update menu
    domElements.currentSemester.textContent = `${currentSemester.name} ${currentSemester.year}`;
    updateSelectedCourses();
    renderAvailableCourses();
    
    // Update the requirements and electives dropdowns
    populateRequirementsList();
    populateElectivesList();
    
    // Disable next semester button until courses are selected
    domElements.nextSemesterBtn.disabled = true;
}

// Display a completed semester 
function displayCompletedSemester(semester) {
    const container = domElements.completedSemesters;
    
    const semesterElement = document.createElement('div');
    semesterElement.className = 'completed-semester';
    
    // Create course displays from database info
    const courseItems = semester.courses.map(course => `
        <div class="completed-course-item">
            <div><strong>${course.code}</strong> - ${course.title}</div>
            <div>${getCampusDisplayText(course.campus)}</div>
        </div>
    `).join('');
    
    semesterElement.innerHTML = `
        <div class="completed-semester-header">
            ${semester.name} ${semester.year} (${semester.courses.length} courses)
        </div>
        <div class="completed-semester-courses">
            ${courseItems}
        </div>
    `;
    
    // Add new semesters 
    container.appendChild(semesterElement);
}

// Advance to next semester
function advanceToNextSemester() {
    const semesterOrder = ['Fall', 'Spring', 'Summer'];
    let currentIndex = semesterOrder.indexOf(currentSemester.name);
    let year = currentSemester.year;
    
    // Move to next semester
    currentIndex = (currentIndex + 1) % semesterOrder.length;
    
    // Increment year if going from Summer -> Fall semester
    if (currentIndex === 0) {
        year++;
    }
    
    // Update current semester
    currentSemester.name = semesterOrder[currentIndex];
    currentSemester.year = year;
}

// Show graduation message with confetti when finished
function showGraduationMessage() {
    domElements.graduationMessage.style.display = 'block';
    domElements.courseSelectionPanel.style.display = 'none';
    
    // CONFETTI AS REQUESTED
    showConfetti();
}