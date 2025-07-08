const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { title, body } = JSON.parse(event.body || '{}');
  if (!title || !body) return { statusCode: 400, body: 'Missing data' };

  const prompt = `Summarize this blog post:\n\nTitle: ${title}\n\n${body}\n\nSummary:`;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: data.choices?.[0]?.text?.trim() || "" })
    };
  } catch (err) {
    return { statusCode: 500, body: "OpenAI API error" };
  }
};
