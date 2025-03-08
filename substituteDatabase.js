//Fake database, can add other courses later.
//These course sets are assumed to be all of the needed courses for completing your selected major
const mathCourses = [
        { 
            code: 'MA 305',
			title: 'Calculus III',
            prereqs: [], 
            availableSemesters: ['Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 308', 
			title: 'Discrete Math',
            prereqs: [],  
            availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        },
        { 
            code: 'MA 310', 
			title: 'Linear Algebra',
            prereqs: [],  
            availableSemesters: ['Fall', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        },
        { 
            code: 'MA 320',
			title: 'Introduction to Abstract Algebra', 
            prereqs: ['MA 308'], 
            availableSemesters: ['Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 321', 
			title: 'Differential Equations',
            prereqs: ['MA 305'], 
            availableSemesters: ['Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 330', 
			title: 'Advanced Mathematical Software',
            prereqs: ['MA 305'], 
            availableSemesters: ['Fall', 'Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 331', 
			title: 'Applied Probability and Statistics',
            prereqs: ['MA 308'], 
            availableSemesters: ['Fall', 'Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        },
        { 
            code: 'MA 423', 
			title: 'Numerical Analysis',
            prereqs: ['MA 310', 'MA 330'], 
            availableSemesters: ['Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 452', 
			title: 'Introductory Real Analysis',
            prereqs: ['MA 320'], 
            availableSemesters: ['Fall'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 470', 
			title: 'Senior Mathematics Seminar',
            prereqs: ['MA 308', 'MA 330'], 
            availableSemesters: ['Fall', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
        { 
            code: 'MA 480',
			title: 'Special Topics', 
            prereqs: ['MA 308'], 
            availableSemesters: ['Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        }
    ];
	
const csCourses = [
		{
			code: 'CS 309/L',
			title: 'Digital Logic Design',
			prereqs: [],
			availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 310',
			title: 'Ethics of Computing',
			prereqs: ['CS 317'],
			availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 317',
			title: 'Computer Science',
			prereqs: [],
			availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 318',
			title: 'Computer Science II',
			prereqs: ['CS 317'],
			availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 340',
			title: 'Assembly Language',
			prereqs: ['CS 318'],
			availableSemesters: ['Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'CS 372',
			title: 'Data Structures',
			prereqs: ['CS 318'],
			availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 414',
			title: 'Programming Language',
			prereqs: ['CS 372'],
			availableSemesters: ['Fall'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'CS 415',
			title: 'Operating Systems',
			prereqs: ['CS 340', 'CS 372'],
			availableSemesters: ['Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 451',
			title: 'Software Engineering',
			prereqs: ['CS 372', 'MA 308'],
			availableSemesters: ['Fall', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 452',
			title: 'Senior Project',
			prereqs: ['CS 451'],
			availableSemesters: ['Fall', 'Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'CS 454',
			title: 'System Security Management',
			prereqs: ['ITE 420'],
			availableSemesters: ['Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 472',
			title: 'Algorithm Analysis',
			prereqs: ['CS 372', 'MA 308'],
			availableSemesters: ['Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'CS 484',
			title: 'Applied Cryptography',
			prereqs: ['CS 372', 'MA 308'],
			availableSemesters: ['Fall'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'ITE 305/306',
			title: 'Networking',
			prereqs: [],
			availableSemesters: ['Fall','Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'ITE 307/308',
			title: 'Networking II',
			prereqs: ['ITE 305/306'],
			availableSemesters: ['Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'ITE 327/L',
			title: 'Database Systems',
			prereqs: ['CS 317'],
			availableSemesters: ['Fall','Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'ITE 409/L',
			title: 'Network Security',
			prereqs: ['ITE 307/308'],
			availableSemesters: ['Fall'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
		},
		{
			code: 'ITE 420',
			title: 'Information Security',
			prereqs: [],
			availableSemesters: ['Spring','Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{
			code: 'ITE 421',
			title: 'Digital Forensics',
			prereqs: ['ITE 420'],
			availableSemesters: ['Fall'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
		},
		{ 
            code: 'MA 308', 
			title: 'Discrete Math',
            prereqs: [],  
            availableSemesters: ['Fall', 'Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        },
        { 
            code: 'MA 310', 
			title: 'Linear Algebra',
            prereqs: [],  
            availableSemesters: ['Fall', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        },
		{ 
            code: 'MA 320',
			title: 'Introduction to Abstract Algebra', 
            prereqs: ['MA 308'], 
            availableSemesters: ['Spring', 'Summer'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'DL'
        },
		{ 
            code: 'MA 331', 
			title: 'Applied Probability and Statistics',
            prereqs: ['MA 308'], 
            availableSemesters: ['Fall', 'Spring'],
			availableYears: ['OddYear', 'EvenYear'],
			campus: 'BL'
        }
	];