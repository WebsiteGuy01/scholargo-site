// 📁 generate-sitemap.js
const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

const BASE_URL = 'https://scholargo.netlify.app';
const POSTS_DIR = path.join(__dirname, 'posts');
const allIndexPath = path.join(POSTS_DIR, 'all-index.json');

function loadPosts() {
  if (!fs.existsSync(allIndexPath)) {
    console.error('❌ all-index.json not found.');
    return [];
  }
  const content = fs.readFileSync(allIndexPath, 'utf-8');
  return JSON.parse(content);
}

function getLastMod(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return '2025-07-01';
  }
}

const urlset = xmlbuilder.create('urlset', { encoding: 'UTF-8' });
urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

const staticPages = [
  'index.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'scholarships.html',
  'education.html',
  'technology.html'
];

staticPages.forEach(page => {
  const filePath = path.join(__dirname, page);
  urlset.ele('url')
    .ele('loc', {}, `${BASE_URL}/${page.replace('index.html', '')}`)
    .up()
    .ele('lastmod', {}, getLastMod(filePath));
});

const posts = loadPosts();
posts.forEach(post => {
  urlset.ele('url')
    .ele('loc', {}, `${BASE_URL}/post.html?post=${post.slug}`)
    .up()
    .ele('lastmod', {}, post.date || '2025-07-01');
});

const sitemapXml = urlset.end({ pretty: true });
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);

console.log('✅ sitemap.xml generated with <lastmod> tags.');
