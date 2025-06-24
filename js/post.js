// post.js for ScholarGo - Dynamic Post Loader

document.addEventListener('DOMContentLoaded', async () => {
  const postBody = document.getElementById('post-body');
  const postTitle = document.getElementById('post-title');
  const slug = new URLSearchParams(window.location.search).get('slug');

  if (!slug) {
    postTitle.textContent = 'Post Not Found';
    postBody.innerHTML = '<p>Missing post slug.</p>';
    return;
  }

  try {
    const res = await fetch(`/posts/${slug}.md`);
    if (!res.ok) throw new Error('Post not found');

    const markdown = await res.text();
    const html = marked.parse(markdown);
    postBody.innerHTML = html;

    // Optional: Try to extract H1 as page title
    const h1 = postBody.querySelector('h1');
    if (h1) postTitle.textContent = h1.textContent;

  } catch (err) {
    postTitle.textContent = 'Post Not Found';
    postBody.innerHTML = '<p>Sorry, the post could not be loaded.</p>';
  }
});
