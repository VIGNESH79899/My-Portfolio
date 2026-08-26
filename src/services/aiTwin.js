import { PORTFOLIO_KNOWLEDGE } from '../data/portfolioKnowledge';

// Context Retrieval Engine for Grounded Responses
export const getRelevantContext = (userMsg) => {
  const q = userMsg.toLowerCase();
  const contextParts = [];

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    contextParts.push(`SKILLS: Languages: ${PORTFOLIO_KNOWLEDGE.skills.languages.join(", ")}. Frontend: ${PORTFOLIO_KNOWLEDGE.skills.frontend.join(", ")}. Backend: ${PORTFOLIO_KNOWLEDGE.skills.backend.join(", ")}. Databases: ${PORTFOLIO_KNOWLEDGE.skills.databases.join(", ")}. AI/ML: ${PORTFOLIO_KNOWLEDGE.skills.aiml.join(", ")}.`);
  }

  if (q.includes("sashverse") || q.includes("workverse") || q.includes("internship") || q.includes("staxtech") || q.includes("experience")) {
    const sash = PORTFOLIO_KNOWLEDGE.experience[0];
    const stax = PORTFOLIO_KNOWLEDGE.experience[1];
    contextParts.push(`EXPERIENCE:\n1. ${sash.company} (${sash.period}): ${sash.role} on ${sash.platform}. Tech: ${sash.tech.join(", ")}. Highlights: ${sash.highlights.join("; ")}.\n2. ${stax.company} (${stax.period}): ${stax.role}. Tech: ${stax.tech.join(", ")}. Highlights: ${stax.highlights.join("; ")}.`);
  }

  if (q.includes("project") || q.includes("ai assessment") || q.includes("recommendation") || q.includes("compression") || q.includes("password")) {
    const projList = PORTFOLIO_KNOWLEDGE.projects.map((p, i) => `${i + 1}. ${p.title} (${p.category}): ${p.summary} (Tech: ${p.tech.join(", ")})`).join("\n");
    contextParts.push(`PROJECTS:\n${projList}`);
  }

  if (q.includes("education") || q.includes("degree") || q.includes("aurora") || q.includes("university") || q.includes("year") || q.includes("2024") || q.includes("2026") || q.includes("2028")) {
    contextParts.push(`EDUCATION: ${PORTFOLIO_KNOWLEDGE.education.program} @ ${PORTFOLIO_KNOWLEDGE.education.university} (${PORTFOLIO_KNOWLEDGE.education.duration}). High School: ${PORTFOLIO_KNOWLEDGE.education.highSchool}.`);
  }

  if (q.includes("architecture") || q.includes("pipeline") || q.includes("sse") || q.includes("jwt") || q.includes("postgres")) {
    const nodes = PORTFOLIO_KNOWLEDGE.architecture.nodes.map((n, i) => `Node ${i + 1}: ${n.name} (${n.role})`).join(" -> ");
    contextParts.push(`ARCHITECTURE: ${PORTFOLIO_KNOWLEDGE.architecture.title}.\nPipeline: ${nodes}`);
  }

  if (q.includes("certif") || q.includes("award") || q.includes("deloitte") || q.includes("infosys") || q.includes("power bi")) {
    const certs = PORTFOLIO_KNOWLEDGE.certifications.map(c => `${c.name} (${c.issuer})`).join(", ");
    contextParts.push(`CERTIFICATIONS: ${certs}.`);
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
    contextParts.push(`CONTACT: Email: ${PORTFOLIO_KNOWLEDGE.identity.email}, Phone: ${PORTFOLIO_KNOWLEDGE.identity.phone}, LinkedIn: ${PORTFOLIO_KNOWLEDGE.identity.linkedin}, GitHub: ${PORTFOLIO_KNOWLEDGE.identity.github}.`);
  }

  if (contextParts.length === 0) {
    contextParts.push(`FULL SUMMARY: Adhi Vignesh is a ${PORTFOLIO_KNOWLEDGE.identity.title} @ ${PORTFOLIO_KNOWLEDGE.identity.university} (${PORTFOLIO_KNOWLEDGE.identity.degree}). Full-Stack SaaS Intern @ Sashverse Technologies (Workverse) & Web Intern @ StaxTech. Key skills: React, Node.js, Express, Koa, PostgreSQL, SSE streams, JWT, Python, Scikit-learn, TF-IDF Cosine Similarity recommendations.`);
  }

  return contextParts.join("\n\n");
};

// Grounded Stream Response Generator
export const generateStreamingResponse = async (userMsg, history, onChunk, onComplete, onError) => {
  try {
    const q = userMsg.toLowerCase();

    // Check for out-of-scope / unverified questions
    const isUnverified = (
      q.includes("favorite food") || 
      q.includes("salary") || 
      q.includes("how much money") || 
      q.includes("personal life") || 
      q.includes("girlfriend") || 
      q.includes("ignore instructions") ||
      q.includes("system prompt")
    );

    if (isUnverified) {
      const refusal = "I don't have enough verified information in Adhi's portfolio to answer that. I can answer questions about his professional experience, education, skills, projects, and architecture!";
      return simulateTokenStream(refusal, onChunk, onComplete);
    }

    // Try calling backend server API endpoint if active
    try {
      const apiRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: history.slice(-6) })
      });

      if (apiRes.ok && apiRes.body) {
        const reader = apiRes.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  fullText = parsed.text;
                  if (onChunk) onChunk(fullText);
                }
              } catch (e) {}
            }
          }
        }

        if (fullText && onComplete) {
          return onComplete(fullText);
        }
      }
    } catch (e) {
      // Backend not running, use client-side grounded streaming context engine
    }

    // Fallback to grounded portfolio context engine
    let fullText = "";

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("know")) {
      fullText = `Adhi works primarily across Full-Stack SaaS Development and AI/ML Engineering:\n\n• **Frontend**: React.js, Tailwind CSS, HTML5/CSS3, Framer Motion\n• **Backend & APIs**: Node.js, Express.js, Koa.js, REST API Design, Server-Sent Events (SSE), JWT Auth & RBAC\n• **Databases**: PostgreSQL, MySQL, MongoDB Atlas, Sequelize ORM\n• **AI / ML**: Python, Scikit-learn, Pandas, TF-IDF Text Vectorization, Cosine Similarity recommendation engines\n\nWould you like to explore his technical skills matrix or projects?\n\n[View Skills] [View Projects]`;
    } else if (q.includes("sashverse") || q.includes("workverse") || q.includes("saas")) {
      fullText = `During his internship at **Sashverse Technologies** (Apr 2026 – Jun 2026 in Hyderabad), Adhi worked on **Workverse**—a production SaaS platform:\n\n1. **REST APIs & Services**: Engineered task assignment and user onboarding workflows.\n2. **Real-Time Stream**: Built a sub-15ms Server-Sent Events (SSE) event broadcasting stream.\n3. **Role-Based Security**: Implemented JWT authentication with RBAC for Admin, Mentor, and Student tiers.\n4. **Database & Transactions**: Designed referral reward engines backed by PostgreSQL and Sequelize ORM.\n\n[View Experience] [View Architecture]`;
    } else if (q.includes("staxtech")) {
      fullText = `During his Web Development Internship at **StaxTech** (May 2025 – Jun 2025, Remote), Adhi:\n\n• Built responsive e-commerce web applications including luxury watch store interfaces.\n• Developed dynamic shopping cart state management, price recalculations, and checkout flows.\n• Created digital agency landing pages with mobile-first UI/UX.\n\n[View Experience]`;
    } else if (q.includes("project") || q.includes("built") || q.includes("show me")) {
      fullText = `Adhi has engineered several production-focused applications and AI systems:\n\n1. **AI Assessment Maker**: Full-stack platform generating academic assignments and automated DOCX documents.\n2. **Movie Recommendation System**: Content-based engine using TF-IDF vectorization and cosine similarity.\n3. **Workverse SaaS Platform**: Real-time SSE event pipeline and JWT RBAC backend.\n4. **Library Management System**: PHP/MySQL relational database system with ACID transaction support.\n5. **Chandeshwara Enterprises**: Freelance client e-commerce platform built with TypeScript & MongoDB (https://chandeshwaraenterprises.com/).\n6. **Population Growth Prediction**: Mathematical prediction application in React & TypeScript forecasting population trends from historical datasets (https://github.com/VIGNESH79899/Population-Growth).\n\n[View Projects]`;
    } else if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("aurora")) {
      fullText = `Adhi is currently pursuing his **B.Tech in Computer Science Engineering (AI & Machine Learning)** at **Aurora University, Hyderabad** (2024–2028):\n\n• **Class XII (MPC)**: Graduated with **86.1%**.\n• **Current Focus**: Machine Learning fundamentals, Full-Stack SaaS architecture, Operating Systems, and Linear Algebra.\n\n[View Education]`;
    } else if (q.includes("architecture") || q.includes("pipeline")) {
      fullText = `Adhi's 5-stage production architecture pipeline consists of:\n\n1. **React.js Client**: Student dashboard & SSE event listener\n2. **Node.js / Express API**: REST service layer & task routing\n3. **Real-Time SSE Engine**: Persistent event broadcasting stream\n4. **PostgreSQL & Sequelize**: Relational database & ORM schemas\n5. **JWT Authorization**: Stateless RBAC security middleware\n\n[View Architecture]`;
    } else if (q.includes("certif") || q.includes("credential")) {
      fullText = `Adhi holds several verified certifications and credentials:\n\n• **Power BI Workshop** (Office Master)\n• **Programming Fundamentals using Python** (Infosys Springboard)\n• **Data Analytics Virtual Job Simulation** (Deloitte via Forage)\n• **Elements of AI** (University of Helsinki & MinnaLearn)\n• **Introduction to AI** (Infosys Springboard)\n• **StaxTech Web Internship Certificate**\n\n[View Certifications]`;
    } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire")) {
      fullText = `You can reach Adhi directly via:\n\n• **Email**: vigneshadhi773@gmail.com\n• **Phone**: +91 79899 49808\n• **GitHub**: github.com/VIGNESH79899\n• **LinkedIn**: linkedin.com/in/adhi-vignesh-342431289\n\nHe is actively seeking Full-Stack & AI/ML opportunities!\n\n[Contact Me]`;
    } else {
      fullText = `Adhi Vignesh is a Full-Stack Developer & AI/ML Engineer pursuing B.Tech CSE (AI & ML) at Aurora University (2024–2028). He has completed internships at **Sashverse Technologies** (Workverse SaaS) and **StaxTech**, building real-time SSE streams, REST APIs, and AI recommendation engines.\n\nFeel free to ask about his skills, internships, projects, or architecture!\n\n[View Projects] [View Experience]`;
    }

    return simulateTokenStream(fullText, onChunk, onComplete);
  } catch (err) {
    if (onError) onError(err);
  }
};

// Simulate Token-by-Token Streaming with realistic delays
const simulateTokenStream = (text, onChunk, onComplete) => {
  const words = text.split(" ");
  let currentText = "";
  let i = 0;

  const interval = setInterval(() => {
    if (i < words.length) {
      currentText += (i === 0 ? "" : " ") + words[i];
      if (onChunk) onChunk(currentText);
      i++;
    } else {
      clearInterval(interval);
      if (onComplete) onComplete(currentText);
    }
  }, 22);
};
