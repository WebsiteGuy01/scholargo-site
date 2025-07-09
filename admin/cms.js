CMS.registerEventListener({
  name: "preSave",
  handler: async ({ entry }) => {
    const summary = entry.get("data").get("summary");
    const body = entry.get("data").get("body");

    if (!summary && body && body.length > 100) {
      try {
        const response = await fetch("/.netlify/functions/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: body }),
        });

        const data = await response.json();
        if (data.summary) {
          entry.get("data").set("summary", data.summary);
          console.log("✅ AI summary generated.");
        } else {
          console.warn("⚠️ No summary returned from AI.");
        }
      } catch (err) {
        console.error("❌ Error generating summary:", err);
      }
    }
  },
});
