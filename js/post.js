// js/post.js

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("post");

  if (!slug) {
    showError("No post specified.");
    return;
  }

  try {
    const response = await fetch("/posts/all-index.json");
    const posts = await response.json();

    const post = posts.find(p => p.slug === slug);

    if (!post) {
      showError("Post not found.");
      return;
    }

    const mdPath = `/posts/${post.category.toLowerCase()}/${slug}.md`;
    const mdRes = await fetch(mdPath);

    if (!mdRes.ok) {
      showError("Failed to load markdown content.");
      return;
    }

    const mdText = await mdRes.text();
    const html = marked.parse(mdText);

    // Populate HTML
    document.querySelector(".post-title").textContent = post.title;
    document.querySelector(".post-date").textContent = formatDate(post.date);
    document.querySelector(".post-category").textContent = post.category;
    document.querySelector(".post-thumbnail").src = post.thumbnail || "/assets/default-thumb.jpg";
    document.querySelector(".post-body").innerHTML = html;

  } catch (error) {
    console.error(error);
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
