const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const { text } = JSON.parse(event.body);

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing input text" })
      };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes blog posts."
          },
          {
            role: "user",
            content: `Summarize this in 2-3 sentences: ${text}`
          }
        ]
      })
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "No summary generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ summary })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
