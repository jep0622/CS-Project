// Common scripts

// Function to get selection parameters from URL
const getUrlParameter = (() => {
    const paramCache = {};
    
    return function(name) {
        // Return from cache if available
        if (paramCache[name] !== undefined) {
            return paramCache[name];
        }
        
        const formattedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + formattedName + '=([^&#]*)');
        const results = regex.exec(location.search);
        const value = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        
        // Cache the result
        paramCache[name] = value;
        
        return value;
    };
})();

// Toggle dropdown functionality 
function toggleDropdown(headerElement, contentElement) {
    contentElement.classList.toggle('show');
    headerElement.classList.toggle('active');
    
    // Update border 
    headerElement.style.borderRadius = contentElement.classList.contains('show') ? 
        '5px 5px 0 0' : '5px';
}

// Setup dropdown with function to populate 
function setupDropdown(headerId, contentId, populateFn) {
    const headerElement = document.getElementById(headerId);
    const contentElement = document.getElementById(contentId);
    
    if (headerElement && contentElement) {
        headerElement.addEventListener('click', function() {
            toggleDropdown(this, contentElement);
        });
        
        // Call populate function
        if (typeof populateFn === 'function') {
            populateFn();
        }
    }
}

// Cache (for storing selections)
function cacheDomElements(elementIds) {
    const elements = {};
    
    for (const [key, id] of Object.entries(elementIds)) {
        const element = document.getElementById(id);
        if (element) {
            elements[key] = element;
        }
    }
    
    return elements;
}

// Get the courses in the database based on the major
function getCoursesForMajor(majorId) {
    const major = majorRequirements[majorId];
    if (!major) return [];
    
    return major.requiredCourses.map(courseCode => courseDatabase[courseCode]);
}

// Check course availability (prereqs, semester, year)
function isCourseAvailable(course, currentSemester, completedCourses) {
    // Check prereqs
    if (course.prereqs && course.prereqs.length > 0) {
        const prereqsMet = course.prereqs.every(prereq => completedCourses.includes(prereq));
        if (!prereqsMet) return false;
    }
    
    // Check semester offering
    if (!course.availableSemesters.includes(currentSemester.name)) return false;
    
    // Check year offering
    if (course.availableYears && course.availableYears.length > 0) {
        const isEvenYear = currentSemester.year % 2 === 0;
        const yearType = isEvenYear ? 'EvenYear' : 'OddYear';
        if (!course.availableYears.includes(yearType)) return false;
    }
    
    return true;
}

// Check prereqs and provide them to show
function getMissingPrereqs(course, completedCourses) {
    if (!course.prereqs || course.prereqs.length === 0) {
        return [];
    }
    
    return course.prereqs.filter(prereq => !completedCourses.includes(prereq));
}

// Display for campus codes (blended/distant/etc)
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

// Ridiculous confetti animation straight from chatgpt
function showConfetti() {
  const confettiCount = 100;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Animate the confetti falling (haha why)
    const animation = confetti.animate(
      [
        { transform: `translate(0, 0) rotate(${Math.random() * 360}deg)` },
        { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight}px) rotate(${Math.random() * 720}deg)` }
      ],
      {
        duration: Math.random() * 2000 + 1000,
        easing: 'cubic-bezier(.37,1.04,.68,.98)'
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}