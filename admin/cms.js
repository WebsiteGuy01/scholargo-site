CMS.registerWidget('aiSummary', createClass({
  handleClick: async function () {
    const body = this.props.entry.getIn(['data', 'body']);
    if (!body || body.trim() === "") {
      alert("Please write content in the Body first.");
      return;
    }

    this.setState({ loading: true });

    const prompt = `Summarize the following content into 2 short sentences:\n\n${body}`;

    try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 120,
          temperature: 0.5
        })
      });

      const json = await res.json();
      const summary = json.choices?.[0]?.text?.trim();

      if (summary) {
        this.props.onChange(summary);
        alert("✅ Summary generated!");
      } else {
        alert("⚠️ AI did not return a summary.");
      }
    } catch (err) {
      alert("❌ Error generating summary");
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  },

  render: function () {
    const value = this.props.value || "";
    return h('div', {},
      h('textarea', {
        value: value,
        onChange: e => this.props.onChange(e.target.value),
        placeholder: "AI-generated summary will appear here"
      }),
      h('button', {
        type: 'button',
        onClick: this.handleClick.bind(this),
        disabled: this
