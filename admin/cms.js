// Register AI Summary custom widget
CMS.registerWidget('aiSummary', createClass({
  getInitialState() {
    return { loading: false };
  },

  handleClick: async function () {
    const body = this.props.entry.getIn(['data', 'body']);
    if (!body || body.trim() === "") {
      alert("⚠️ Please write content in the Body first.");
      return;
    }

    this.setState({ loading: true });

    const prompt = `Summarize the following content in 2 concise sentences:\n\n${body}`;

    try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-xxxx" // 🔁 Replace with your real key
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
        alert("❌ AI did not return a summary.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error generating summary");
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
        placeholder: "AI-generated summary will appear here",
        rows: 3,
        style: { width: '100%', fontSize: '14px' }
      }),
      h('button', {
        type: 'button',
        onClick: this.handleClick.bind(this),
        disabled: this.state.loading,
        style: {
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }
      }, this.state.loading ? "⏳ Generating..." : "✨ Generate Summary")
    );
  }
}));
