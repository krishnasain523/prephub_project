const subjects=require("../models/subjectschema");
const dbconnect=require("../config/dbconnect")
const Data=[
  {
    "name": "Data Structures and Algorithms",
    "code": "DSA",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to DSA",
      "Time and Space Complexity",
      "Arrays",
      "Strings",
      "Recursion",
      "Linked List",
      "Stack",
      "Queue",
      "Searching Algorithms",
      "Sorting Algorithms",
      "Hashing",
      "Trees",
      "Graphs",
      "Greedy Algorithms",
      "Dynamic Programming"
    ]
  },
  {
    "name": "C Programming",
    "code": "C",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to C",
      "Data Types",
      "Operators",
      "Input Output",
      "Conditional Statements",
      "Loops",
      "Functions",
      "Arrays",
      "Strings",
      "Pointers",
      "Structures and Unions",
      "Dynamic Memory Allocation",
      "File Handling"
    ]
  },
  {
    "name": "C++",
    "code": "CPP",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to C++",
      "Basic Syntax",
      "OOP Concepts",
      "Classes and Objects",
      "Constructors and Destructors",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Templates",
      "STL",
      "Exception Handling",
      "File Handling"
    ]
  },
  {
    "name": "Java",
    "code": "JAVA",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to Java",
      "Basic Syntax",
      "OOP Concepts",
      "Classes and Objects",
      "Inheritance",
      "Polymorphism",
      "Interfaces",
      "Abstract Classes",
      "Exception Handling",
      "Collections Framework",
      "Multithreading",
      "JVM Architecture",
      "File Handling"
    ]
  },
  {
    "name": "Object Oriented Programming",
    "code": "OOPS",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to OOP",
      "Classes and Objects",
      "Encapsulation",
      "Abstraction",
      "Inheritance",
      "Polymorphism",
      "Interfaces",
      "Abstract Classes",
      "Method Overloading",
      "Method Overriding",
      "SOLID Principles",
      "Design Patterns"
    ]
  },
  {
    "name": "Database Management System",
    "code": "DBMS",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to DBMS",
      "Database Models",
      "ER Model",
      "Relational Model",
      "SQL Basics",
      "Joins",
      "Normalization",
      "Functional Dependency",
      "Transactions",
      "ACID Properties",
      "Concurrency Control",
      "Indexing",
      "Database Security"
    ]
  },
  {
    "name": "Operating System",
    "code": "OS",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to OS",
      "Process and Thread",
      "CPU Scheduling",
      "Process Synchronization",
      "Deadlock",
      "Memory Management",
      "Paging and Segmentation",
      "Virtual Memory",
      "File System"
    ]
  },
  {
    "name": "Computer Networks",
    "code": "CN",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to Networks",
      "Types of Networks",
      "OSI Model",
      "TCP/IP Model",
      "IP Addressing",
      "DNS",
      "HTTP and HTTPS",
      "Routing",
      "Network Security"
    ]
  },
  {
    "name": "Software Engineering",
    "code": "SE",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Introduction to Software Engineering",
      "SDLC",
      "Waterfall Model",
      "Agile Model",
      "Requirement Analysis",
      "Software Design",
      "Software Testing",
      "Software Maintenance"
    ]
  },
  {
    "name": "Web Development",
    "code": "WEB",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Internet Basics",
      "HTML",
      "CSS",
      "JavaScript Basics",
      "JavaScript Advanced",
      "React Basics",
      "Backend Basics",
      "Node.js",
      "REST APIs",
      "Authentication and Authorization"
    ]
  },

  /* ----------- APTITUDE ----------- */

  {
    "name": "Quantitative Aptitude",
    "code": "APT_QUANT",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Number System",
      "LCM and HCF",
      "Simplification",
      "Percentages",
      "Ratio and Proportion",
      "Averages",
      "Profit and Loss",
      "Simple Interest",
      "Compound Interest",
      "Time and Work",
      "Time and Distance"
    ]
  },
  {
    "name": "Logical Reasoning",
    "code": "APT_LOGIC",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Series",
      "Coding-Decoding",
      "Direction Sense",
      "Blood Relations",
      "Syllogism",
      "Seating Arrangement",
      "Puzzles"
    ]
  },
  {
    "name": "Verbal Ability",
    "code": "APT_VERBAL",
    "difficultyLevels": ["Easy", "Medium", "Hard"],
    "topics": [
      "Vocabulary Basics",
      "Synonyms and Antonyms",
      "Fill in the Blanks",
      "Error Detection",
      "Sentence Improvement",
      "Active and Passive Voice",
      "Direct and Indirect Speech",
      "Reading Comprehension"
    ]
  }
]


const initdata=async()=>{
    try {
       if(process.env.NODE_ENV==="production")
       {
        process.exit(1);
       }

         await dbconnect();
           console.log("database connected");
        const count=await subjects.countDocuments();
        if(count>0)
        {
          await subjects.deleteMany({});
        }
        else
        {
         await subjects.insertMany(Data);
            console.log("subject data saved")
            process.exit();
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

};
initdata();
