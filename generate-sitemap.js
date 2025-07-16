// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

const BASE_URL = 'https://scholargo.netlify.app';
const POSTS_DIR = path.join(__dirname, 'posts');

// Load post metadata from all-index.json
function loadPosts() {
  const indexPath = path.join(POSTS_DIR, 'all-index.json');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ all-index.json not found. Run "npm run generate-posts" first.');
    return [];
  }
  const content = fs.readFileSync(indexPath, 'utf-8');
  return JSON.parse(content);
}

// Format date for <lastmod>
function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

// Main sitemap.xml
const urlset = xmlbuilder.create('urlset', { encoding: 'UTF-8' });
urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

// Static pages
const staticPages = [
  'index.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'scholarships.html',
  'education.html',
  'technology.html'
];

staticPages.forEach(file => {
  const filePath = path.join(__dirname, file);
  const lastmod = fs.existsSync(filePath) ? formatDate(fs.statSync(filePath).mtime) : formatDate(Date.now());
  urlset.ele('url')
    .ele('loc', {}, `${BASE_URL}/${file}`).up()
    .ele('lastmod', {}, lastmod);
});

// Posts
const posts = loadPosts();
posts.forEach(post => {
  const lastmod = post.date || formatDate(Date.now());
  urlset.ele('url')
    .ele('loc', {}, `${BASE_URL}/post.html?post=${post.slug}`).up()
    .ele('lastmod', {}, formatDate(lastmod));
});

// Write sitemap.xml
const sitemapXml = urlset.end({ pretty: true });
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);
console.log('✅ sitemap.xml generated.');

// === Sitemap Index (sitemap_index.xml) ===
const sitemapIndex = xmlbuilder.create('sitemapindex', { encoding: 'UTF-8' });
sitemapIndex.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

// Only one entry for now — main sitemap
sitemapIndex.ele('sitemap')
  .ele('loc', {}, `${BASE_URL}/sitemap.xml`).up()
  .ele('lastmod', {}, formatDate(Date.now()));

// Save sitemap_index.xml
fs.writeFileSync(path.join(__dirname, 'sitemap_index.xml'), sitemapIndex.end({ pretty: true }));
console.log('✅ sitemap_index.xml generated.');
