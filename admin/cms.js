// Register your custom preview CSS
CMS.registerPreviewStyle("/admin/custom.css");

// Optional: Add custom widgets, previews, or editor enhancements here

// Example: Custom editor config (optional)
// CMS.registerEditorComponent({
//   id: "youtube",
//   label: "YouTube",
//   fields: [{ name: "id", label: "YouTube Video ID", widget: "string" }],
//   pattern: /^{{< youtube (\S+) >}}$/,
//   fromBlock: match => ({ id: match[1] }),
//   toBlock: obj => `{{< youtube ${obj.id} >}}`,
//   toPreview: obj => `<iframe width="100%" src="https://www.youtube.com/embed/${obj.id}" frameborder="0" allowfullscreen></iframe>`
// });

// Init CMS (not needed if you're using config.yml, but here for flexibility)
CMS.init();
