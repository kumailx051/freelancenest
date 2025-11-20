const fs = require('fs');
const path = require('path');

const files = [
  'src/components/common/HowItWorksSection.tsx',
  'src/components/common/KeyDifferentiatorsSection.tsx',
  'src/components/common/Footer.tsx'
];

files.forEach(file => {
  try {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/#ffeee3/g, '#fafafa');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } catch (error) {
    console.error(`Error updating ${file}:`, error.message);
  }
});
