const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { content } = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the following content in 1–2 lines." },
          { role: "user", content: content },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ summary }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate summary" }),
    };
  }
};
