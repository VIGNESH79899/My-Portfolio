// Factual Portfolio Knowledge Base for Adhi's AI Developer Twin
// Source of truth: All information is strictly verified against Adhi Vignesh's portfolio codebase.

export const PORTFOLIO_KNOWLEDGE = {
  identity: {
    name: "Adhi Vignesh",
    title: "Full-Stack Developer & AI/ML Engineer",
    degree: "B.Tech CSE (AI & Machine Learning)",
    university: "Aurora University, Hyderabad (2024–2028)",
    location: "Hyderabad, Telangana, India",
    email: "vigneshadhi773@gmail.com",
    phone: "+91 79899 49808",
    github: "https://github.com/VIGNESH79899",
    linkedin: "https://linkedin.com/in/adhi-vignesh-342431289",
    summary: "Computer Science undergraduate specializing in Full-Stack SaaS platforms (React, Node.js, Express, Koa, PostgreSQL, SSE streams, JWT) and AI/ML systems (Python, Scikit-learn, Pandas, TF-IDF vectorization, Cosine Similarity recommendation engines)."
  },

  education: {
    program: "B.Tech CSE (AI & ML)",
    university: "Aurora University",
    duration: "2024–2028",
    status: "In Progress (Current Student)",
    highSchool: "Class XII (MPC - Math, Physics, Chemistry) — Graduated with 86.1%",
    roadmap: [
      { year: "2024", phase: "Foundation", details: "Enrolled in B.Tech CSE (AI & ML) at Aurora University. Mastered C programming, Data Structures, Algorithms, and Linear Algebra." },
      { year: "2025", phase: "Practical Development", details: "Applied CS fundamentals to web engineering, JavaScript (ES6+), React.js, and completed Web Development Internship at StaxTech." },
      { year: "2026", phase: "Current Production Focus", details: "Full Stack Internship at Sashverse Technologies (Workverse SaaS). Engineered SSE real-time streams, JWT auth, and AI/ML recommendation engines." },
      { year: "2028", phase: "Degree Completion", details: "Target graduation for B.Tech CSE (AI & ML)." }
    ]
  },

  experience: [
    {
      company: "Sashverse Technologies",
      role: "Full Stack Developer Intern",
      period: "Apr 2026 – Jun 2026",
      location: "Hyderabad, India",
      type: "Production Internship",
      platform: "Workverse SaaS Platform",
      tech: ["React.js", "Node.js", "Express.js", "Koa.js", "PostgreSQL", "Sequelize ORM", "SSE Real-Time Stream", "JWT Auth"],
      highlights: [
        "Built production REST APIs and task assignment workflows on the Workverse SaaS platform",
        "Engineered sub-15ms real-time Server-Sent Events (SSE) stream messaging pipeline",
        "Implemented JWT authentication with Role-Based Access Control (RBAC) for Admin, Mentor, and Student tiers",
        "Engineered database-backed referral and rewards transaction logic using PostgreSQL and Sequelize ORM"
      ]
    },
    {
      company: "StaxTech",
      role: "Web Development Intern",
      period: "May 2025 – Jun 2025",
      location: "Remote",
      type: "Web Internship",
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "UI/UX Principles", "Responsive Design"],
      highlights: [
        "Built responsive e-commerce web applications featuring luxury watch store interfaces",
        "Implemented dynamic shopping cart state management, price recalculation, and checkout workflows",
        "Designed digital branding landing pages with custom responsive layouts"
      ]
    }
  ],

  skills: {
    languages: ["Python", "JavaScript (ES6+)", "TypeScript", "C Language", "PHP", "SQL"],
    frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Koa.js", "REST API Design", "Server-Sent Events (SSE)", "JWT Auth & RBAC"],
    databases: ["PostgreSQL", "MySQL", "MongoDB Atlas", "Supabase", "Sequelize ORM"],
    aiml: ["Pandas", "Scikit-learn ML Pipelines", "TF-IDF Text Vectorization", "Cosine Similarity Recommendation Engines", "Power BI Analytics"],
    tools: ["Git", "GitHub Workflow", "Postman", "VS Code", "Vercel Deployment", "Render", "MongoDB Compass"]
  },

  projects: [
    {
      id: "ai-assessment",
      title: "AI Assessment Maker",
      category: "AI / ML & Full-Stack",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "AI Service Integration", "Automated DOCX Export"],
      summary: "End-to-end AI-powered platform for generating structured academic assignments, research reports, case studies, automated DOCX generation, and email delivery workflows.",
      liveUrl: "https://assessmentmaker.vercel.app/"
    },
    {
      id: "movie-rec",
      title: "Movie Recommendation System",
      category: "AI / ML",
      tech: ["Python", "Pandas", "Scikit-learn", "TF-IDF Vectorizer", "Cosine Similarity"],
      summary: "Content-based recommendation engine leveraging TF-IDF text vectorization and cosine similarity matrix scoring.",
      githubUrl: "https://github.com/VIGNESH79899/MOVIE_REC"
    },
    {
      id: "sales-aggregator",
      title: "Sales Data Aggregator",
      category: "Data Analysis",
      tech: ["Python", "Pandas", "Data Processing", "Visualization"],
      summary: "Data processing application to clean, aggregate, analyze, and visualize raw sales data for business insights."
    },
    {
      id: "library-mgmt",
      title: "Library Management System",
      category: "Full-Stack",
      tech: ["PHP", "MySQL", "Relational Database", "CRUD Operations"],
      summary: "Database-driven system supporting book indexing, user management, issue/return workflows, transactions, and fine tracking.",
      githubUrl: "https://github.com/VIGNESH79899/Library_management"
    },
    {
      id: "eco-track",
      title: "Eco Track",
      category: "Full-Stack",
      tech: ["TypeScript", "JavaScript"],
      summary: "Smart eco-tracking application designed to estimate daily and weekly CO₂ emissions using simple data analysis logic.",
      liveUrl: "https://eco-track-ochre.vercel.app/"
    },
    {
      id: "chandeshwara-enterprises",
      title: "Chandeshwara Enterprises",
      category: "Full-Stack & Freelance Client Work",
      tech: ["TypeScript", "MongoDB", "Node.js", "E-Commerce"],
      summary: "Production e-commerce platform developed for a freelance client, built with TypeScript and MongoDB.",
      liveUrl: "https://chandeshwaraenterprises.com/"
    },
    {
      id: "population-growth",
      title: "Population Growth Prediction",
      category: "AI / ML & Mathematical Modeling",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Data Analysis"],
      summary: "Mathematical prediction application that forecasts population growth based on historical datasets.",
      githubUrl: "https://github.com/VIGNESH79899/Population-Growth"
    }
  ],

  architecture: {
    title: "Sashverse Technologies — Workverse Production SaaS Architecture",
    nodes: [
      { name: "React.js Client App", role: "Workverse Student Dashboard & SSE Event Listener" },
      { name: "Node.js / Express API", role: "REST Controller, Task Router & Logic Middleware" },
      { name: "Real-Time SSE Engine", role: "Server-Sent Events Stream Broadcaster" },
      { name: "PostgreSQL & Sequelize", role: "Normalized Relational Storage & Transaction Schema" },
      { name: "JWT Authorization", role: "Stateless Token & Role-Based Access Control (RBAC)" }
    ]
  },

  certifications: [
    { name: "Full Stack Developer Internship Certificate", issuer: "Sashverse Technologies Private Limited", tag: "Full-Stack Development" },
    { name: "Web Development Internship Certificate (ID: STAXA0042)", issuer: "StaxTech (Founder & CEO: Pawan Kushwaha, Issued May 22, 2025)", tag: "Web Development" },
    { name: "Power BI Workshop Certificate", issuer: "OfficeMaster (Issued Sep 28, 2025)", tag: "Data Analytics" },
    { name: "Programming Fundamentals using Python", issuer: "Infosys Springboard", tag: "Python Programming" },
    { name: "Data Analytics Job Simulation Certificate", issuer: "Deloitte via Forage (Issued June 12, 2025, Verification Code: qx6HYEoY3afGCpu7b)", tag: "Data Analytics & Forensic Tech" },
    { name: "Elements of AI Certificate (2 ECTS Credits)", issuer: "University of Helsinki & MinnaLearn (Issued June 12, 2025, Verification: https://certificates.mooc.fi/validate/iy43aswxi2)", tag: "Artificial Intelligence" },
    { name: "Dynamic Public Speaking Specialization (4 Courses)", issuer: "Coursera & University of Washington (Issued Aug 9, 2025, Instructor: Dr. Matt McGarrity, Verification: https://coursera.org/verify/specialization/UIHAN7GLUGR7)", tag: "Communication & Leadership" },
    { name: "Ignite India Entrepreneurship Certificate (42 Hours of Training)", issuer: "Wadhwani Global Entrepreneur & Aurora Higher Education (Issued Aug 30, 2025, President: Meetul Patel)", tag: "Entrepreneurship & Business Modeling" }
  ],

  sections: {
    about: "#about",
    experience: "#experience",
    education: "#education",
    architecture: "#architecture",
    projects: "#projects",
    skills: "#skills",
    certifications: "#certifications",
    contact: "#contact"
  }
};
