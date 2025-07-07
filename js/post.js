# Recreate the complete post.js file with all improvements after environment reset

complete_post_js = """document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("post");

  if (!slug) return showError("No post specified.");

  try {
    const response = await fetch("/posts/all-index.json");
    const posts = await response.json();
    const post = posts.find(p => p.slug === slug);

    if (!post) return showError("Post not found.");

    const mdPath = `/posts/${post.section}/${slug}.md`;
    const mdRes = await fetch(mdPath);

    if (!mdRes.ok) return showError("Markdown file missing.");

    const mdText = await mdRes.text();
    const html = marked.parse(mdText);

    // Inject content into the page
    document.querySelector(".post-title").textContent = post.title;
    document.querySelector(".post-date").textContent = formatDate(post.date);
    document.querySelector(".post-category").textContent = post.category;
    document.querySelector(".post-thumbnail").src = post.thumbnail || "/assets/default-thumb.jpg";
    document.querySelector(".post-body").innerHTML = html;

    // SEO: Dynamic title and meta
    document.title = `${post.title} – ScholarGo`;
    updateMeta("og:title", `${post.title} – ScholarGo`);
    updateMeta("og:description", post.description || "Explore this opportunity on ScholarGo.");
    updateMeta("og:image", post.thumbnail || "https://scholargo.netlify.app/assets/og-image.jpg");
    updateMeta("og:url", window.location.href);
    updateMeta("twitter:card", "summary_large_image");

    // Social share links
    if (document.getElementById("share-x")) {
      document.getElementById("share-x").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
    }
    if (document.getElementById("share-whatsapp")) {
      document.getElementById("share-whatsapp").href = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`;
    }
    if (document.getElementById("copy-link")) {
      document.getElementById("copy-link").addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href);
        document.getElementById("copy-msg").textContent = "🔗 Link copied!";
      });
    }

    // Structured data (JSON-LD)
    updateStructuredData(post);

    // Log for debug
    console.log("Post loaded:", post);
    console.log("Markdown path:", mdPath);

  } catch (err) {
    console.error("Post loading error:", err);
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

function updateStructuredData(post) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${post.title} – ScholarGo`,
    "description": post.description || "",
    "image": post.thumbnail || "https://scholargo.netlify.app/assets/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "ScholarGo"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ScholarGo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://scholargo.netlify.app/assets/logo1.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  const scriptTag = document.getElementById("ld-json");
  if (scriptTag) {
    scriptTag.textContent = JSON.stringify(ld, null, 2);
  }
}
"""

# Save to downloadable file
file_path = "/mnt/data/post.js"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(complete_post_js)

file_path
