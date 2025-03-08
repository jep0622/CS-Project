// Global variables
let allCourses = [];
let completedCourses = [];
let currentSemester = { name: '', year: 0, courses: [] };
let completedSemesters = [];
let remainingRequiredCourses = [];
const MAX_COURSES_PER_SEMESTER = 5;

// DOM element cache
const domElements = {};

// Initialize page
window.onload = function() {
    // Cache frequently accessed DOM elements
    cacheDomElements();
    
    // Get parameters
    const params = getParameters();
    setPageTitles(params.major);
    
    // Initialize first semester
    currentSemester = {
        name: params.startingSemester,
        year: params.startingYear,
        courses: []
    };
    
    // Update semester display
    domElements.currentSemester.textContent = `${currentSemester.name} ${currentSemester.year}`;
    
    // Get courses for the selected major
    allCourses = getCourses(params.major);
    remainingRequiredCourses = [...allCourses];
    
    // Render available courses
    renderAvailableCourses();
    
    // Set up event listeners
    setupEventListeners();
};

// Cache DOM elements that will be accessed frequently
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
}

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
    document.title = `${planMajor.textContent} Build Your Plan - Athens State University`;
}

// Get courses based on major
function getCourses(major) {
    return major === 'cs' ? (csCourses || []) : mathCourses;
}

// Set up event listeners
function setupEventListeners() {
    // Next semester button
    domElements.nextSemesterBtn.addEventListener('click', completeSemester);
    
    // Back button
    domElements.backBtn.addEventListener('click', () => window.history.back());
    
    // Filter buttons
    domElements.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            domElements.filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            filterCourses(this.getAttribute('data-filter'));
        });
    });
}

// Filter courses based on selected filter
function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const isAvailable = !card.classList.contains('unavailable');
        
        // Apply selected filter
        if (filter === 'all') {
            card.style.display = '';
        } else if (filter === 'available') {
            card.style.display = isAvailable ? '' : 'none';
        } else {
            card.style.display = 'none';
        }
    });
}

// Check if a course is available in the current semester (memoized version)
const isCourseAvailable = (() => {
    const availabilityCache = {};
    
    return function(course) {
        // Generate a unique key for this course and semester combination
        const cacheKey = `${course.code}-${currentSemester.name}-${currentSemester.year}-${completedCourses.length}`;
        
        // Return cached result if available
        if (availabilityCache[cacheKey] !== undefined) {
            return availabilityCache[cacheKey];
        }
        
        // Check if prerequisites are met
        if (course.prereqs && course.prereqs.length > 0) {
            const prereqsMet = course.prereqs.every(prereq => completedCourses.includes(prereq));
            if (!prereqsMet) {
                availabilityCache[cacheKey] = false;
                return false;
            }
        }
        
        // Check if course is offered in the current semester
        if (!course.availableSemesters.includes(currentSemester.name)) {
            availabilityCache[cacheKey] = false;
            return false;
        }
        
        // Check year restrictions if applicable
        if (course.availableYears) {
            const isEvenYear = currentSemester.year % 2 === 0;
            const yearType = isEvenYear ? 'EvenYear' : 'OddYear';
            if (!course.availableYears.includes(yearType)) {
                availabilityCache[cacheKey] = false;
                return false;
            }
        }
        
        availabilityCache[cacheKey] = true;
        return true;
    };
})();

// Get missing prerequisites for a course
function getMissingPrereqs(course) {
    if (!course.prereqs || course.prereqs.length === 0) {
        return [];
    }
    
    return course.prereqs.filter(prereq => !completedCourses.includes(prereq));
}

// Render available courses
function renderAvailableCourses() {
    domElements.availableCourses.innerHTML = '';
    
    if (remainingRequiredCourses.length === 0) {
        showGraduationMessage();
        return;
    }
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Only show remaining required courses
    remainingRequiredCourses.forEach(course => {
        const isAvailable = isCourseAvailable(course);
        const missingPrereqs = getMissingPrereqs(course);
        const isSelected = currentSemester.courses.some(c => c.code === course.code);
        
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${isAvailable ? '' : 'unavailable'} ${isSelected ? 'selected' : ''}`;
        courseCard.setAttribute('data-code', course.code);
        
        // Create course content
        courseCard.innerHTML = `
            <div>
                <strong class="course-code">${course.code}</strong> - ${course.title}
            </div>
            <div>
                <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}">
                    ${isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <span class="status-badge badge-campus">
					${course.campus === 'DL' ? 'Distance Learning' : 'Blended'}
				</span>
            </div>
            ${missingPrereqs.length > 0 ? 
                `<div style="margin-top: 5px; font-size: 0.8rem; color: #dc3545;">
                    Missing prerequisites: ${missingPrereqs.join(', ')}
                </div>` : ''}
        `;
        
        // Add click event only for available courses
        if (isAvailable) {
            courseCard.addEventListener('click', () => toggleCourseSelection(course));
        }
        
        fragment.appendChild(courseCard);
    });
    
    domElements.availableCourses.appendChild(fragment);
}

// Toggle course selection
function toggleCourseSelection(course) {
    const courseIndex = currentSemester.courses.findIndex(c => c.code === course.code);
    const courseCard = document.querySelector(`.course-card[data-code="${course.code}"]`);
    
    if (courseIndex === -1) {
        // Add course if not at max
        if (currentSemester.courses.length < MAX_COURSES_PER_SEMESTER) {
            currentSemester.courses.push(course);
            courseCard.classList.add('selected');
            updateSelectedCourses();
        }
    } else {
        // Remove course
        currentSemester.courses.splice(courseIndex, 1);
        courseCard.classList.remove('selected');
        updateSelectedCourses();
    }
    
    // Update next semester button state
    domElements.nextSemesterBtn.disabled = currentSemester.courses.length === 0;
}

// Update the selected courses display
function updateSelectedCourses() {
    const container = domElements.selectedCourses;
    const emptyMessage = domElements.emptySelection;
    const selectedCountElement = domElements.selectedCount;
    
    // Update count
    selectedCountElement.textContent = currentSemester.courses.length;
    
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
    
    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Add new items
    currentSemester.courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'selected-course-item';
        
        courseItem.innerHTML = `
            <div>
                <strong>${course.code}</strong> - ${course.title}
                <div style="font-size: 0.8rem; color: #6c757d;">${course.campus === 'DL' ? 'Distance Learning' : 'Blended'}</div>
            </div>
            <button class="remove-course" data-code="${course.code}">Remove</button>
        `;
        
        // Add event listener to remove button
        const removeButton = courseItem.querySelector('.remove-course');
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCode = this.getAttribute('data-code');
            const courseToRemove = allCourses.find(c => c.code === courseCode);
            toggleCourseSelection(courseToRemove);
        });
        
        fragment.appendChild(courseItem);
    });
    
    container.appendChild(fragment);
}

// Complete the current semester and move to the next one
function completeSemester() {
    if (currentSemester.courses.length === 0) {
        return;
    }
    
    // Add current semester to completed semesters
    completedSemesters.push({...currentSemester});
    
    // Update completed courses and remove from remaining courses (using Set for efficiency)
    const coursesToRemove = new Set();
    
    currentSemester.courses.forEach(course => {
        completedCourses.push(course.code);
        coursesToRemove.add(course.code);
    });
    
    // Filter remaining courses efficiently
    remainingRequiredCourses = remainingRequiredCourses.filter(course => !coursesToRemove.has(course.code));
    
    // Display completed semester
    displayCompletedSemester(currentSemester);
    
    // Check if all courses are completed
    if (remainingRequiredCourses.length === 0) {
        showGraduationMessage();
        return;
    }
    
    // Set up next semester
    advanceToNextSemester();
    
    // Clear current semester courses
    currentSemester.courses = [];
    
    // Update UI
    domElements.currentSemester.textContent = `${currentSemester.name} ${currentSemester.year}`;
    updateSelectedCourses();
    renderAvailableCourses();
    
    // Disable next semester button until courses are selected
    domElements.nextSemesterBtn.disabled = true;
}

// Display a completed semester in the history
function displayCompletedSemester(semester) {
    const container = domElements.completedSemesters;
    
    const semesterElement = document.createElement('div');
    semesterElement.className = 'completed-semester';
    
    const courseItems = semester.courses.map(course => `
        <div class="completed-course-item">
            <div><strong>${course.code}</strong> - ${course.title}</div>
            <div>${course.campus === 'DL' ? 'Distance Learning' : 'Blended'}</div>
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
    
    // Add new semesters to maintain descending order display
    container.appendChild(semesterElement);
}

// Advance to the next semester
function advanceToNextSemester() {
    const semesterOrder = ['Fall', 'Spring', 'Summer'];
    let currentIndex = semesterOrder.indexOf(currentSemester.name);
    let year = currentSemester.year;
    
    // Move to next semester
    currentIndex = (currentIndex + 1) % semesterOrder.length;
    
    // Increment year if moving from Summer to Fall
    if (currentIndex === 0) {
        year++;
    }
    
    // Update current semester
    currentSemester.name = semesterOrder[currentIndex];
    currentSemester.year = year;
}

// Show graduation message when all courses are completed
function showGraduationMessage() {
    domElements.graduationMessage.style.display = 'block';
    domElements.courseSelectionPanel.style.display = 'none';
	
	// Add confetti effect
    showConfetti();
}
