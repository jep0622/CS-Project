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