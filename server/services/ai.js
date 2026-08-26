// Server-side AI Service for Adhi's AI Developer Twin
// Integrates with LLM API (Google Gemini / OpenAI / Custom Provider) when AI_API_KEY is configured in .env

export const SYSTEM_PROMPT = `You are Adhi's AI Developer Twin, a portfolio assistant representing Adhi Vignesh.

Your job is to answer visitor questions about Adhi's professional background, education, engineering experience, projects, technical skills, internships, and portfolio.

Only use verified portfolio information provided in the context.

Never fabricate:
- companies
- job titles
- dates
- projects
- technologies
- achievements
- metrics
- clients
- responsibilities

If a visitor asks something outside the available portfolio information, politely explain that the information is not available.

Be concise by default.

For technical questions, provide enough detail to demonstrate engineering understanding.

Speak naturally rather than sounding like a database.

Do not repeatedly say 'according to the portfolio'.

Do not claim to literally be Adhi. You are an AI representation of his professional work.

If asked about something personal that is not publicly available in the portfolio, do not speculate.

When discussing experience, distinguish between academic projects, personal projects, internship work, and production experience. Never merge them together.`;

export const streamChatResponse = async (reqMessage, history, context, res) => {
  const apiKey = process.env.AI_API_KEY;
  const modelName = process.env.AI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) {
    // Return structured RAG context fallback when API key is not configured locally
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const fallbackText = `Here is verified context for Adhi Vignesh:\n\n${context}\n\n[View Projects] [View Experience]`;
    const tokens = fallbackText.split(' ');
    
    for (let i = 0; i < tokens.length; i++) {
      res.write(`data: ${JSON.stringify({ text: tokens.slice(0, i + 1).join(' ') })}\n\n`);
      await new Promise(r => setTimeout(r, 20));
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  // LLM API Streaming Endpoint Execution
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Note: Gemini / OpenAI Streaming API call wrapper
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nVERIFIED CONTEXT:\n${context}\n\nUSER QUESTION: ${reqMessage}` }] }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API Error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      accumulatedText += chunk;
      res.write(`data: ${JSON.stringify({ text: accumulatedText })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: 'AI Service error. Please try again in a moment.' })}\n\n`);
    res.end();
  }
};
