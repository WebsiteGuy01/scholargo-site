document.addEventListener("DOMContentLoaded", async () => {
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
    const dirtyHTML = marked.parse(mdText);
    const html = DOMPurify.sanitize(dirtyHTML);

    // ✅ Hide skeleton and show real content
    const skeleton = document.querySelector(".post-skeleton");
    if (skeleton) skeleton.style.display = "none";

    const titleEl = document.querySelector(".post-title");
    const metaP = titleEl?.nextElementSibling;
    const dateEl = metaP?.querySelector(".post-date");
    const catEl = metaP?.querySelector(".post-category");
    const thumbEl = document.querySelector(".post-thumbnail");
    const bodyEl = document.querySelector(".post-body");

    if (titleEl) {
      titleEl.style.display = "block";
      titleEl.textContent = post.title;
    }
    if (metaP) metaP.style.display = "block";
    if (dateEl) dateEl.textContent = formatDate(post.date);
    if (catEl) catEl.textContent = post.category;
    if (thumbEl) {
      thumbEl.style.display = "block";
      thumbEl.src = post.thumbnail || "/assets/default-thumb.jpg";
    }
    if (bodyEl) {
      bodyEl.style.display = "block";
      bodyEl.innerHTML = html;
    }

    // SEO and meta updates
    document.title = `${post.title} – ScholarGo`;
    updateMeta("og:title", `${post.title} – ScholarGo`);
    updateMeta("og:description", post.description || "Explore this opportunity on ScholarGo.");
    updateMeta("og:image", post.thumbnail || "https://scholargo.netlify.app/assets/og-image.jpg");
    updateMeta("og:url", window.location.href);
    updateMeta("twitter:card", "summary_large_image");

    // Share buttons
    const shareX = document.getElementById("share-x");
    const shareWhatsApp = document.getElementById("share-whatsapp");
    const copyBtn = document.getElementById("copy-link");
    const copyMsg = document.getElementById("copy-msg");

    if (shareX) shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
    if (shareWhatsApp) shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`;
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          if (copyMsg) copyMsg.textContent = "🔗 Link copied!";
        } else {
          alert("Copy not supported. Please manually copy the URL.");
        }
      });
    }

    // Structured data (JSON-LD)
    updateStructuredData(post);

    console.log("Post loaded:", post);
    console.log("Markdown path:", mdPath);

  } catch (err) {
    console.error("Post loading error:", err);
    showError("Something went wrong.");
  }
});

function showError(message) {
  const container = document.querySelector(".post-container");
  if (container) {
    container.innerHTML = `<div class="error"><h2>${message}</h2></div>`;
  }
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
