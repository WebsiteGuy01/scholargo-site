// 📦 Node.js script to generate index.json files from Markdown
// Requires: gray-matter, marked, fs, path

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');

// Helper: Recursively find all markdown files in a folder
function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? findMarkdownFiles(fullPath) : entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

// Group posts by folder (education, technology, etc)
function groupPosts(files) {
  const grouped = {};
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const { data, content: body } = matter(content);
    const htmlBody = marked.parse(body);
    const post = {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      category: data.category || 'general',
      description: data.description || '',
      link: data.link || '#',
      thumbnail: data.thumbnail || '',
      body: htmlBody
    };
    const relativePath = path.relative(POSTS_DIR, file);
    const section = relativePath.split(path.sep)[0] || 'general';
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(post);
  });
  return grouped;
}

function saveIndexFiles(grouped) {
  const allPosts = [];
  Object.entries(grouped).forEach(([section, posts]) => {
    const sectionDir = path.join(POSTS_DIR, section);
    if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir);
    fs.writeFileSync(path.join(sectionDir, 'index.json'), JSON.stringify(posts, null, 2));
    allPosts.push(...posts);
  });
  fs.writeFileSync(path.join(POSTS_DIR, 'index.json'), JSON.stringify(allPosts, null, 2));
  console.log('✅ JSON indexes generated successfully.');
}

const markdownFiles = findMarkdownFiles(POSTS_DIR);
const groupedPosts = groupPosts(markdownFiles);
saveIndexFiles(groupedPosts);
