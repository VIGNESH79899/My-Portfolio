import { PORTFOLIO_KNOWLEDGE } from '../data/portfolioKnowledge';

// Context Retrieval Engine for Grounded Responses
export const getRelevantContext = (userMsg) => {
  const q = userMsg.toLowerCase();
  const contextParts = [];

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    contextParts.push(`SKILLS: Languages: ${PORTFOLIO_KNOWLEDGE.skills.languages.join(", ")}. Frontend: ${PORTFOLIO_KNOWLEDGE.skills.frontend.join(", ")}. Backend: ${PORTFOLIO_KNOWLEDGE.skills.backend.join(", ")}. Databases: ${PORTFOLIO_KNOWLEDGE.skills.databases.join(", ")}. AI/ML: ${PORTFOLIO_KNOWLEDGE.skills.aiml.join(", ")}.`);
  }

  if (q.includes("sashverse") || q.includes("workverse") || q.includes("internship") || q.includes("staxtech") || q.includes("experience") || q.includes("chandeshwara") || q.includes("freelance") || q.includes("client") || q.includes("ecommerce") || q.includes("gongadi")) {
    const expList = PORTFOLIO_KNOWLEDGE.experience.map((e, idx) => `${idx + 1}. ${e.company} (${e.period}): ${e.role} on ${e.platform}. Tech: ${e.tech.join(", ")}. Highlights: ${e.highlights.join("; ")}.`).join("\n");
    contextParts.push(`EXPERIENCE:\n${expList}`);
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

    // Fallback to grounded portfolio context engine with specific-topic-first routing
    let fullText = "";

    // 1. Freelance E-Commerce (Chandeshwara Enterprises)
    if (q.includes("chandeshwara") || q.includes("freelance") || q.includes("gongadi") || q.includes("store") || q.includes("ecommerce") || q.includes("client")) {
      fullText = `**Chandeshwara Enterprises** (chandeshwaraenterprises.com):\n\n• Solo-built live handloom e-commerce store\n• Stack: React, Vite, Node.js, MongoDB Atlas & Razorpay checkout\n• Managed DNS, SEO indexing, and cloud hosting on Render\n\n[View Freelance] [Contact Adhi]`;
    }
    // 2. Sashverse & Workverse SaaS
    else if (q.includes("sashverse") || q.includes("workverse") || q.includes("saas") || q.includes("architecture") || q.includes("pipeline") || q.includes("sse")) {
      fullText = `**Sashverse Technologies** (Full-Stack Intern):\n\n• Engineered sub-15ms real-time SSE stream & REST APIs for Workverse SaaS\n• Implemented JWT authentication with role-based access control (RBAC)\n• Designed PostgreSQL database models using Sequelize ORM\n\n[View Experience] [View Projects]`;
    } 
    // 3. StaxTech Internship
    else if (q.includes("staxtech")) {
      fullText = `**StaxTech** (Web Development Intern):\n\n• Developed responsive e-commerce web applications\n• Built dynamic cart state management & checkout workflows\n\n[View Experience] [Download Resume]`;
    }
    // 4. Experience & Internships (general)
    else if (q.includes("experience") || q.includes("intern") || q.includes("job") || q.includes("career") || q.includes("work experience")) {
      fullText = `**Work & Production Experience**:\n\n• **Sashverse Technologies** (2026): Full-Stack SaaS Intern on Workverse (SSE streams, REST APIs, PostgreSQL)\n• **StaxTech** (2025): Web Development Intern (E-Commerce storefronts & UI/UX)\n• **Chandeshwara Enterprises**: Lead Developer for production e-commerce store\n\n[View Experience] [Download Resume]`;
    }
    // 5. Projects & GitHub
    else if (q.includes("project") || q.includes("built") || q.includes("github") || q.includes("repo") || q.includes("app") || q.includes("assessment") || q.includes("movie") || q.includes("eco") || q.includes("vault")) {
      fullText = `**Top Featured Projects**:\n\n1. **AI Assessment Maker**: Automated academic tests with DOCX export\n2. **Movie Recommendation**: Content-based engine via TF-IDF\n3. **Chandeshwara E-Commerce**: Live handloom store with Razorpay\n4. **Eco-Track**: Real-time carbon emission estimator\n\n[View Projects] [Download Resume]`;
    } 
    // 6. Technical Skills & Stack
    else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("tool") || q.includes("framework") || q.includes("react") || q.includes("node") || q.includes("python") || q.includes("database") || q.includes("frontend") || q.includes("backend")) {
      fullText = `**Core Engineering Stack**:\n\n• **Frontend**: React.js, TypeScript, Tailwind CSS\n• **Backend**: Node.js, Express, REST APIs, SSE Streams\n• **Data & AI**: PostgreSQL, MongoDB, Python, Scikit-learn\n\n[View Skills] [Download Resume]`;
    } 
    // 7. Academic Background & Aurora University
    else if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("aurora") || q.includes("college") || q.includes("btech") || q.includes("study") || q.includes("academic") || q.includes("gpa")) {
      fullText = `**Education**:\n\n• **B.Tech CSE (AI & ML)** @ Aurora University (2024–2028)\n• **Class XII (MPC)**: 86.1%\n• Focus: Machine Learning, Distributed Systems & Full-Stack Architecture\n\n[View Education] [View Certifications]`;
    } 
    // 8. Verified Certifications
    else if (q.includes("certif") || q.includes("credential") || q.includes("deloitte") || q.includes("infosys") || q.includes("power bi") || q.includes("helsinki")) {
      fullText = `**Key Verified Credentials**:\n\n• **Full-Stack Developer**: Sashverse Technologies\n• **Elements of AI (2 ECTS)**: University of Helsinki\n• **Data Analytics Simulation**: Deloitte\n• **Python Fundamentals**: Infosys Springboard\n\n[View Certifications] [Download Resume]`;
    } 
    // 9. Resume & PDF
    else if (q.includes("resume") || q.includes("cv") || q.includes("pdf") || q.includes("download")) {
      fullText = `**Adhi's Official Resume**:\n\n• Updated PDF covering Full-Stack, AI/ML & Production Work\n• Tap below to download directly:\n\n[Download Resume] [Contact Adhi]`;
    }
    // 10. Contact / Hiring / Email / Phone
    else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("call") || q.includes("hire") || q.includes("reach") || q.includes("linkedin")) {
      fullText = `**Get in Touch**:\n\n• **Email**: vigneshadhi773@gmail.com\n• **Phone**: +91 79899 49808\n• **LinkedIn**: linkedin.com/in/adhi-vignesh-342431289\n• **GitHub**: github.com/VIGNESH79899\n\n[Download Resume] [Contact Adhi]`;
    } 
    // 11. Location / Base
    else if (q.includes("where") || q.includes("location") || q.includes("city") || q.includes("live") || q.includes("based") || q.includes("hyderabad")) {
      fullText = `**Location**:\n\n• Adhi is based in **Hyderabad, Telangana, India**.\n• Open to remote, hybrid, and on-site engineering roles.\n\n[Contact Adhi] [Download Resume]`;
    }
    // 12. General Executive Summary / Who is Adhi / Greetings
    else if (
      q.includes("who") || q.includes("summary") || q.includes("tldr") || 
      q.includes("overview") || q.includes("intro") || q.includes("hi") || 
      q.includes("hello") || q.includes("hey") || q.includes("about")
    ) {
      fullText = `**Adhi Vignesh** | Full-Stack & Applied AI Engineer\n\n• **Core Stack**: React, TypeScript, Node.js, PostgreSQL & Python\n• **Highlights**: Sashverse (Workverse SaaS), Chandeshwara E-Commerce & AI tools\n• Open for SWE & AI/ML opportunities.\n\n[View Projects] [Download Resume] [Contact Adhi]`;
    }
    // 13. Helpful Fallback
    else {
      fullText = `I can help you explore Adhi's background! Try asking about:\n\n• **Skills**: React, Node.js, PostgreSQL, Python\n• **Projects**: SaaS platforms, AI tools & E-Commerce\n• **Experience**: Sashverse & StaxTech internships\n• **Resume**: Official PDF download\n\n[View Projects] [View Skills] [Download Resume] [Contact Adhi]`;
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
