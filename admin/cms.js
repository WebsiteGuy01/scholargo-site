import React from "react";
const CMS = window.CMS;
const React = window.React;

// Optional: Register any custom preview templates here
// Example preview: use if you want to style markdown previews
const PostPreview = ({ entry, widgetFor }) => {
  return (
    <div className="post-preview">
      <h1>{entry.getIn(["data", "title"])}</h1>
      <p>{entry.getIn(["data", "description"])}</p>
      <div>{widgetFor("body")}</div>
    </div>
  );
};

// Register preview templates for each collection
CMS.registerPreviewTemplate("scholarships", PostPreview);
CMS.registerPreviewTemplate("education", PostPreview);
CMS.registerPreviewTemplate("technology", PostPreview);
CMS.registerPreviewTemplate("pages", PostPreview);

// Optional: Load custom CSS for preview pane styling
CMS.registerPreviewStyle("/admin/custom.css");

// Enable manual initialization (already present in index.html)
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
  window.netlifyIdentity.init();
}
