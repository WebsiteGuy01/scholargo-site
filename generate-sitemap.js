const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

const BASE_URL = 'https://scholargo.netlify.app';
const POSTS_DIR = path.join(__dirname, 'posts');

// Load post metadata
const indexPath = path.join(POSTS_DIR, 'all-index.json');
if (!fs.existsSync(indexPath)) {
  console.error('❌ all-index.json not found.');
  process.exit(1);
}
const posts = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

// Start sitemap
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
  '/technology.html',
];

staticPages.forEach(page => {
  urlset.ele('url').ele('loc', {}, BASE_URL + page)
    .up().ele('lastmod', {}, new Date().toISOString().split('T')[0]);
});

// Add posts with clean URLs
posts.forEach(post => {
  urlset.ele('url')
    .ele('loc', {}, `${BASE_URL}/posts/${post.slug}/`).up()
    .ele('lastmod', {}, post.date.split('T')[0]);
});

// Save to sitemap.xml
const sitemapXml = urlset.end({ pretty: true });
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);
console.log('✅ sitemap.xml generated.');
