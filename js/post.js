document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("post");

  if (!slug) return showError("No post specified.");

  try {
    const response = await fetch("/posts/all-index.json");
    const posts = await response.json();
    const post = posts.find(p => p.slug === slug);

    if (!post) return showError("Post not found.");

    const mdPath = `/posts/${post.category.toLowerCase()}/${slug}.md`;
    const mdRes = await fetch(mdPath);

    if (!mdRes.ok) return showError("Markdown file missing.");

    const mdText = await mdRes.text();
    const html = marked.parse(mdText);

    // Inject content
    document.querySelector(".post-title").textContent = post.title;
    document.querySelector(".post-date").textContent = formatDate(post.date);
    document.querySelector(".post-category").textContent = post.category;
    document.querySelector(".post-thumbnail").src = post.thumbnail || "/assets/default-thumb.jpg";
    document.querySelector(".post-body").innerHTML = html;

    // Dynamically update <title>
    document.title = `${post.title} – ScholarGo`;

    // Dynamically update Open Graph meta tags
    updateMeta("og:title", `${post.title} – ScholarGo`);
    updateMeta("og:description", post.description || "Explore this opportunity on ScholarGo.");
    updateMeta("og:image", post.thumbnail || "https://scholargo.netlify.app/assets/og-image.jpg");
    updateMeta("og:url", window.location.href);
    updateMeta("twitter:card", "summary_large_image");

  } catch (err) {
    console.error(err);
    showError("Something went wrong.");
  }
});

function showError(message) {
  const container = document.querySelector(".post-container");
  container.innerHTML = `<div class="error"><h2>${message}</h2></div>`;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function updateMeta(property, content) {
  let meta = document.querySelector(`meta[property='${property}']`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}
