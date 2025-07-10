// Wait until Netlify CMS is ready before using CMS
window.CMS_MANUAL_INIT = true;

window.addEventListener('DOMContentLoaded', () => {
  if (typeof CMS !== 'undefined') {
    // Optional: Add preview styles
    CMS.registerPreviewStyle("/admin/custom.css");

    // Optional: You can register widgets or previews here

    // Finally, initialize the CMS
    CMS.init();
  } else {
    console.error("Netlify CMS failed to load.");
  }
});
