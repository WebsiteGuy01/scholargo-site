// Register AI Summary Button Widget
CMS.registerEditorComponent({
  id: "ai-summary-button",
  label: "🧠 Generate AI Summary",
  fields: [],
  pattern: /^/,
  fromBlock: () => ({}),
  toBlock: () => "",
  toPreview: () => "<button>Generate Summary</button>",
  control: class extends React.Component {
    render() {
      return null;
    }
  }
});

// Add custom AI Summary button logic
window.CMS_MANUAL_INIT = true;

window.addEventListener("DOMContentLoaded", () => {
  CMS.init();

  const interval = setInterval(() => {
    const panel = document.querySelector('[for="summary"]');
    if (panel && !document.getElementById("ai-gen-btn")) {
      const btn = document.createElement("button");
      btn.textContent = "⚡ Generate with AI";
      btn.id = "ai-gen-btn";
      btn.style.cssText = "margin-top:10px;padding:6px 12px;background:#007acc;color:white;border:none;border-radius:4px;cursor:pointer;";
      panel.parentElement.appendChild(btn);

      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "⏳ Generating...";
        try {
          const bodyField = document.querySelector('textarea[name="body"]');
          const body = bodyField?.value || "";
          if (!body || body.length < 30) {
            alert("Please write the full post content first.");
            btn.disabled = false;
            btn.textContent = "⚡ Generate with AI";
            return;
          }

          const res = await fetch("/.netlify/functions/ai-summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body })
          });

          const data = await res.json();
          if (data.summary) {
            const summaryField = document.querySelector('textarea[name="summary"]');
            if (summaryField) summaryField.value = data.summary;
            alert("✅ Summary generated and filled!");
          } else {
            alert("❌ AI did not return a summary.");
          }
        } catch (err) {
          alert("Error generating summary: " + err.message);
        }
        btn.disabled = false;
        btn.textContent = "⚡ Generate with AI";
      });

      clearInterval(interval);
    }
  }, 1000);
});
