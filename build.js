#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Files to include in the extension package
const extensionFiles = [
    'manifest.json',
    'background.js',
    'content.js',
    'popup.html',
    'popup.js',
    'options.html',
    'options.js',
    'styles.css',
    'icons/README.md'
];

// Create the extension package
function createExtensionPackage() {
    const output = fs.createWriteStream('linkedin-ai-comment-assistant.zip');
    const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
    });

    output.on('close', function() {
        console.log('Extension package created: linkedin-ai-comment-assistant.zip');
        console.log(`Total size: ${archive.pointer()} bytes`);
        console.log('\nTo install in Firefox:');
        console.log('1. Open Firefox');
        console.log('2. Navigate to about:debugging');
        console.log('3. Click "This Firefox"');
        console.log('4. Click "Load Temporary Add-on"');
        console.log('5. Select the linkedin-ai-comment-assistant.zip file');
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    // Add files to the archive
    extensionFiles.forEach(file => {
        if (fs.existsSync(file)) {
            if (fs.statSync(file).isDirectory()) {
                archive.directory(file, file);
            } else {
                archive.file(file, { name: file });
            }
            console.log(`Added: ${file}`);
        } else {
            console.warn(`Warning: ${file} not found`);
        }
    });

    archive.finalize();
}

// Validate manifest.json
function validateManifest() {
    try {
        const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
        console.log('✓ manifest.json is valid');
        console.log(`Extension: ${manifest.name} v${manifest.version}`);
        return true;
    } catch (error) {
        console.error('✗ manifest.json is invalid:', error.message);
        return false;
    }
}

// Main execution
if (validateManifest()) {
    createExtensionPackage();
} else {
    process.exit(1);
}
