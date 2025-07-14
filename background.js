// Background script for the Firefox extension
// Use browser API if available (Firefox), fallback to chrome API
const extensionAPI = typeof browser !== 'undefined' ? browser : chrome;

console.log('Background script loaded, using:', typeof browser !== 'undefined' ? 'browser API' : 'chrome API');

// Set up cross-browser storage compatibility
if (typeof browser !== 'undefined' && browser.storage) {
    // Firefox - ensure storage permissions are available
    console.log('Firefox detected, using browser.storage API');
} else if (typeof chrome !== 'undefined' && chrome.storage) {
    // Chrome/Chromium - use chrome API
    console.log('Chrome detected, using chrome.storage API');
}

extensionAPI.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated:', details);
    console.log('LinkedIn AI Comment Assistant installed');
    
    // Initialize default settings
    extensionAPI.storage.sync.get(['openai_api_key', 'default_language', 'default_cta'], (result) => {
        console.log('Checking for stored settings:', result);
        
        // Set default values if not present
        const defaults = {};
        if (!result.default_language) {
            defaults.default_language = 'english';
        }
        if (!result.default_cta) {
            defaults.default_cta = 'What are your thoughts on this?';
        }
        
        if (Object.keys(defaults).length > 0) {
            extensionAPI.storage.sync.set(defaults, () => {
                console.log('Default settings saved:', defaults);
            });
        }
        
        // Open options page if API key is not configured
        if (!result.openai_api_key) {
            console.log('No API key found, opening options page');
            setTimeout(() => {
                if (extensionAPI.runtime.openOptionsPage) {
                    extensionAPI.runtime.openOptionsPage();
                } else {
                    // Fallback: create a new tab with options page
                    extensionAPI.tabs.create({
                        url: extensionAPI.runtime.getURL('options.html')
                    });
                }
            }, 1000); // Delay to ensure extension is fully loaded
        } else {
            console.log('API key found, extension ready');
        }
    });
});

// Handle messages from content script
extensionAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === 'openOptionsPage') {
        console.log('Opening options page via message');
        if (extensionAPI.runtime.openOptionsPage) {
            extensionAPI.runtime.openOptionsPage();
        } else {
            // Fallback: create a new tab with options page
            extensionAPI.tabs.create({
                url: extensionAPI.runtime.getURL('options.html')
            });
        }
    }
    return true;
});
