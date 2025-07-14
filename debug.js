// Simple test file to debug the extension
console.log('Extension loaded');

// Test if the API is available
if (typeof browser !== 'undefined') {
    console.log('Using browser API (Firefox)');
} else if (typeof chrome !== 'undefined') {
    console.log('Using chrome API');
} else {
    console.log('No extension API available');
}
