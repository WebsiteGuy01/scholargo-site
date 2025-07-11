// 📦 Node.js script to generate index.json files from Markdown
// Requires: gray-matter, marked, fs, path

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');

// Helper: Recursively find all .md files
function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory()
      ? findMarkdownFiles(fullPath)
      : entry.name.endsWith('.md')
      ? [fullPath]
      : [];
  });
}

// Group posts by category folder
function groupPosts(files) {
  const grouped = {};
  const allPosts = [];

  files.forEach(file => {
    const relativePath = path.relative(POSTS_DIR, file);
    const parts = relativePath.split(path.sep);

    // Skip files not inside a folder like posts/scholarships/post.md
    if (parts.length < 2) {
      console.warn(`⚠️ Skipping: '${file}' (not in a category folder)`);
      return;
    }

    const section = parts[0];
    const slug = path.basename(file, '.md');

    const content = fs.readFileSync(file, 'utf8');
    const { data, content: body } = matter(content);

    const post = {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      category: section.charAt(0).toUpperCase() + section.slice(1),
      description: data.description || '',
      tags: data.tags || [],
      slug,
      link: `/post.html?post=${slug}`,
      thumbnail: data.thumbnail || '',
    };

    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(post);
    allPosts.push({ ...post, section });
  });

  return { grouped, allPosts };
}

// Save individual index.json files
function saveIndexFiles(grouped, allPosts) {
  for (const section in grouped) {
    const outputPath = path.join(POSTS_DIR, section, 'index.json');
    fs.writeFileSync(outputPath, JSON.stringify(grouped[section], null, 2));
    console.log(`✅ ${outputPath} written.`);
  }

  const allOutput = path.join(POSTS_DIR, 'all-index.json');
  fs.writeFileSync(allOutput, JSON.stringify(allPosts, null, 2));
  console.log(`✅ ${allOutput} written.`);
}

// MAIN
const mdFiles = findMarkdownFiles(POSTS_DIR);
const { grouped, allPosts } = groupPosts(mdFiles);
saveIndexFiles(grouped, allPosts);
