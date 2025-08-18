#!/usr/bin/env node

/**
 * Test script for the La Reina Del Sabor npm package
 * This script tests the package build and pack process
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing La Reina Del Sabor npm package...\n');

try {
  // Check if dist directory exists, if not build it
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('📦 Building package...');
    execSync('npm run build:package', { stdio: 'inherit' });
    console.log('✅ Package built successfully!\n');
  } else {
    console.log('✅ Package already built\n');
  }

  // Test npm pack
  console.log('📦 Testing npm pack...');
  execSync('npm pack --dry-run', { stdio: 'inherit' });
  console.log('✅ npm pack test successful!\n');

  // Check package contents
  console.log('📋 Package contents:');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   - Name: ${packageJson.name}`);
  console.log(`   - Version: ${packageJson.version}`);
  console.log(`   - Main: ${packageJson.main}`);
  console.log(`   - Types: ${packageJson.types}`);
  console.log(`   - Files: ${packageJson.files.join(', ')}`);
  console.log(`   - Keywords: ${packageJson.keywords.join(', ')}`);
  console.log(`   - License: ${packageJson.license}`);
  console.log(`   - Author: ${packageJson.author}`);
  console.log(`   - Repository: ${packageJson.repository.url}`);
  console.log(`   - Homepage: ${packageJson.homepage}`);
  console.log(`   - Description: ${packageJson.description}`);

  // Check if dist files exist
  console.log('\n📁 Checking dist directory...');
  if (fs.existsSync('dist/index.js')) {
    console.log('   ✅ dist/index.js exists');
  } else {
    console.log('   ❌ dist/index.js missing');
  }

  if (fs.existsSync('dist/index.d.ts')) {
    console.log('   ✅ dist/index.d.ts exists');
  } else {
    console.log('   ❌ dist/index.d.ts missing');
  }

  // Check dist directory structure
  const distFiles = fs.readdirSync('dist');
  console.log(`   📂 Total files in dist: ${distFiles.length}`);
  distFiles.forEach(file => {
    console.log(`      - ${file}`);
  });

  console.log('\n🎉 Package test completed successfully!');
  console.log('\n📚 Next steps:');
  console.log('   1. Update repository URL in package.json');
  console.log('   2. Update author information if needed');
  console.log('   3. Run: npm login');
  console.log('   4. Run: npm publish');
  console.log('\n📖 See PUBLISHING.md for detailed instructions');

} catch (error) {
  console.error('\n❌ Package test failed:');
  console.error(error.message);
  process.exit(1);
}
