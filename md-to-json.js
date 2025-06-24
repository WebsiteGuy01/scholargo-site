// md-to-json.js
// Converts Netlify CMS markdown posts into JSON objects for index.json

const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const categoryDirs = ['education', 'scholarship', 'technology'];

categoryDirs.forEach(category => {
  const folderPath = path.join(__dirname, 'posts', category);
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));

  const allPosts = files.map(file => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      title: data.title,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      thumbnail: data.thumbnail || '',
      description: data.description || '',
      link: data.link || '',
      body: content.trim()
    };
  });

  fs.writeFileSync(
    path.join(folderPath, 'index.json'),
    JSON.stringify(allPosts, null, 2)
  );

  console.log(`✅ Generated index.json for ${category}`);
});
