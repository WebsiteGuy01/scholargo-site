const fs = require('fs');
const path = require('path');
const glob = require('glob');
const xmlbuilder = require('xmlbuilder');

// Get today's date
const today = new Date().toISOString().split('T')[0];

// Define the root directory where your markdown posts are located
const postsDir = path.join(__dirname, 'posts');

// Define the output file path for your sitemap
const sitemapPath = path.join(__dirname, 'sitemap.xml');

// Function to read markdown files and create a URL entry for each
function generateSitemap() {
  // Find all markdown files inside the "posts" folder
  glob(`${postsDir}/**/*.md`, (err, files) => {
    if (err) {
      console.error('Error reading posts:', err);
      return;
    }

    // Start building the sitemap
    const sitemap = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' })
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    // Add the homepage
    sitemap.ele('url')
      .ele('loc', 'https://scholargo.netlify.app/').up()
      .ele('lastmod', today).up()
      .ele('changefreq', 'daily').up()
      .ele('priority', '1.0').up();

    // Add the main pages like Scholarships, Education, etc.
    const mainPages = ['scholarships.html', 'education.html', 'technology.html', 'about.html', 'contact.html', 'privacy-policy.html'];
    mainPages.forEach(page => {
      sitemap.ele('url')
        .ele('loc', `https://scholargo.netlify.app/${page}`).up()
        .ele('lastmod', today).up()
        .ele('changefreq', 'weekly').up()
        .ele('priority', '0.8').up();
    });

    // Add the posts
    files.forEach(file => {
      const postSlug = path.basename(file, '.md'); // Get the post's slug from the file name

      // Add a URL for the post
      sitemap.ele('url')
        .ele('loc', `https://scholargo.netlify.app/post.html?post=${postSlug}`).up()
        .ele('lastmod', today).up()
        .ele('changefreq', 'monthly').up()
        .ele('priority', '0.6').up();
    });

    // Save the generated sitemap to the sitemap.xml file
    const xmlString = sitemap.end({ pretty: true });
    fs.writeFileSync(sitemapPath, xmlString);

    console.log('Sitemap generated successfully!');
  });
}

// Run the function to generate the sitemap
generateSitemap();
