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

// Start building the sitemap
const urlset = xmlbuilder.create('urlset', { encoding: 'UTF-8' });
urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

// Add static pages
const staticPages = [
  '/',
  '/about.html',
  '/contact.html',
  '/privacy-policy.html',
  '/scholarships.html',
  '/education.html',
  '/technology.html'
];

staticPages.forEach(page => {
  const url = urlset.ele('url');
  url.ele('loc', {}, BASE_URL + page);
  url.ele('lastmod', {}, new Date().toISOString().split('T')[0]);
});

// Add dynamic post pages
const posts = loadPosts();
posts.forEach(post => {
  const url = urlset.ele('url');
  url.ele('loc', {}, `${BASE_URL}/post.html?post=${post.slug}`);
  url.ele('lastmod', {}, post.date.split('T')[0]);
});

// Save sitemap.xml
const sitemapXml = urlset.end({ pretty: true });
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);

console.log('✅ sitemap.xml generated.');
