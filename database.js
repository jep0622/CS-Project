// Organized as Courses, Majors (list of courses per major), and Electives
const courseDatabase = {
    // Mathematics courses
    "MA 308": { 
        code: 'MA 308', 
        title: 'Discrete Math',
        prereqs: [],  
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "MA 310": { 
        code: 'MA 310', 
        title: 'Linear Algebra',
        prereqs: [],  
        availableSemesters: ['Fall', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "MA 321": { 
        code: 'MA 321', 
        title: 'Differential Equations',
        prereqs: [], 
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "MA 331": { 
        code: 'MA 331', 
        title: 'Applied Probability and Statistics',
        prereqs: ['MA 308'], 
        availableSemesters: ['Fall', 'Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    
    // Computer Science courses
	"CS 307": {
        code: 'CS 307',
        title: 'Web Development',
        prereqs: [],
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 309/L": {
        code: 'CS 309/L',
        title: 'Digital Logic Design',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 310": {
        code: 'CS 310',
        title: 'Ethics of Computing',
        prereqs: ['CS 317'],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 317": {
        code: 'CS 317',
        title: 'Computer Science',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 318": {
        code: 'CS 318',
        title: 'Computer Science II',
        prereqs: ['CS 317'],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 340": {
        code: 'CS 340',
        title: 'Assembly Language',
        prereqs: ['CS 318'],
        availableSemesters: ['Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "CS 372": {
        code: 'CS 372',
        title: 'Data Structures',
        prereqs: ['CS 318'],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 414": {
        code: 'CS 414',
        title: 'Programming Language',
        prereqs: ['CS 372'],
        availableSemesters: ['Fall'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "CS 415": {
        code: 'CS 415',
        title: 'Operating Systems',
        prereqs: ['CS 340', 'CS 372'],
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 451": {
        code: 'CS 451',
        title: 'Software Engineering',
        prereqs: ['CS 372', 'MA 308'],
        availableSemesters: ['Fall', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "CS 452": {
        code: 'CS 452',
        title: 'Senior Project',
        prereqs: ['CS 451'],
        availableSemesters: ['Fall', 'Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "CS 472": {
        code: 'CS 472',
        title: 'Algorithm Analysis',
        prereqs: ['CS 372', 'MA 308'],
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
	"CS E1": {
        code: 'CS E1',
        title: 'Elective 1',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"CS E2": {
        code: 'CS E2',
        title: 'Elective 2',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"CS E3": {
        code: 'CS E3',
        title: 'Elective 3',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"CS E4": {
        code: 'CS E4',
        title: 'Elective 4',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"CS E5": {
        code: 'CS E5',
        title: 'Elective 5',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },

    // ITE courses
    "ITE 305/306": {
        code: 'ITE 305/306',
        title: 'Networking',
        prereqs: [],
        availableSemesters: ['Fall','Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "ITE 315": {
        code: 'ITE 315',
        title: 'System Admin',
        prereqs: [],
        availableSemesters: ['Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
	"ITE 321": {
        code: 'ITE 321',
        title: 'System Analysis',
        prereqs: [],
        availableSemesters: ['Fall'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "ITE 327/L": {
        code: 'ITE 327/L',
        title: 'Database Systems',
        prereqs: ['CS 317'],
        availableSemesters: ['Fall','Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "ITE 409/L": {
        code: 'ITE 409/L',
        title: 'Network Security',
        prereqs: ['ITE 307/308'],
        availableSemesters: ['Fall'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
    "ITE 420": {
        code: 'ITE 420',
        title: 'Information Security',
        prereqs: [],
        availableSemesters: ['Spring','Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "ITE 441": {
        code: 'ITE 441',
        title: 'Systems Integration',
        prereqs: ['ITE 321'],
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
	"ITE 450": {
        code: 'ITE 450',
        title: 'Human-Computer Interaction',
        prereqs: ['CS 318'],
        availableSemesters: ['Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
	"ITE 451": {
        code: 'ITE 451',
        title: 'Software Engineering',
        prereqs: ['CS 372', 'MA 308'],
        availableSemesters: ['Fall', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'DL'
    },
    "ITE 452": {
        code: 'ITE 452',
        title: 'Senior Project',
        prereqs: ['ITE 451'],
        availableSemesters: ['Fall', 'Spring'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'BL'
    },
	"ITE E1": {
        code: 'ITE E1',
        title: 'Elective 1',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"ITE E2": {
        code: 'ITE E2',
        title: 'Elective 2',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"ITE E3": {
        code: 'ITE E3',
        title: 'Elective 3',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"ITE E4": {
        code: 'ITE E4',
        title: 'Elective 4',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    },
	"ITE E5": {
        code: 'ITE E5',
        title: 'Elective 5',
        prereqs: [],
        availableSemesters: ['Fall', 'Spring', 'Summer'],
        availableYears: ['OddYear', 'EvenYear'],
        campus: 'UN'
    }
};

// Majors. Just a list of courses under each major
const majorRequirements = {
    "ite": {
        name: "Information Technology",
        requiredCourses: [
            "MA 308", "CS 309/L", "CS 307", "CS 310", "CS 317", 
			"CS 318", "CS 372", "ITE 305/306", "ITE 315", "ITE 321",
			"ITE 327/L", "ITE 420", "ITE 441", "ITE 450", "ITE 451",
			"ITE 452", "ITE E1", "ITE E2", "ITE E3", "ITE E4",
			"ITE E5"
        ]
    },
    "cs": {
        name: "Computer Science",
        requiredCourses: [
			"MA 308", "MA 310", "MA 321", "MA 331", "CS 309/L",
            "CS 310", "CS 317", "CS 318", "CS 340", "CS 372", 
            "CS 414", "CS 415", "CS 451", "CS 452", "CS 472", 
            "ITE 305/306", "ITE 327/L", "ITE 420" , "CS E1", "CS E2",
			"CS E3", "CS E4", "CS E5"
        ]
    }
};

// Electives. Just like majors, but only their elective options
const electiveCourses = {
    "ite": {
        name: "Computer Science Electives",
        courses: [
            "ITE E1", "ITE E2", "ITE E3", "ITE E4", "ITE E5"
        ]
    },
    "cs": {
        name: "Information Technology Electives",
        courses: [
            "CS E1", "CS E2", "CS E3", "CS E4", "CS E5"
        ]
    }
};