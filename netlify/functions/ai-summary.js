const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { body } = JSON.parse(event.body || "{}");

  if (!body || body.length < 20) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Post content too short to summarize." }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Summarize the following post in 2 concise sentences:\n\n${body}`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.text?.trim() || "";

    return {
      statusCode: 200,
      body: JSON.stringify({ summary }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to contact OpenAI API" }),
    };
  }
};
