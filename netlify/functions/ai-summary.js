const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { content } = JSON.parse(event.body || "{}");

  if (!content || content.length < 50) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Content too short for summary." }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // safe, secure
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Summarize the following blog post in 1-2 sentences:",
          },
          {
            role: "user",
            content: content,
          },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "No summary generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ summary }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: error.message }),
    };
  }
};
