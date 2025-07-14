// Popup script for the Firefox extension
const extensionAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const openOptionsBtn = document.getElementById('openOptions');
    const testExtensionBtn = document.getElementById('testExtension');

    // Check extension status
    checkExtensionStatus();

    // Event listeners
    openOptionsBtn.addEventListener('click', openOptionsPage);
    testExtensionBtn.addEventListener('click', testExtension);

    function checkExtensionStatus() {
        extensionAPI.storage.sync.get(['openai_api_key'], (result) => {
            if (result.openai_api_key) {
                statusDiv.className = 'status ready';
                statusDiv.textContent = '✓ Extension configured and ready!';
            } else {
                statusDiv.className = 'status not-configured';
                statusDiv.textContent = '⚠ Please configure your OpenAI API key';
            }
        });
    }

    function openOptionsPage() {
        if (extensionAPI.runtime.openOptionsPage) {
            extensionAPI.runtime.openOptionsPage();
        } else {
            // Fallback: create a new tab with options page
            extensionAPI.tabs.create({
                url: extensionAPI.runtime.getURL('options.html')
            });
        }
        window.close();
    }

    function testExtension() {
        extensionAPI.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0].url.includes('linkedin.com')) {
                extensionAPI.tabs.sendMessage(tabs[0].id, {action: 'checkButtons'}, (response) => {
                    if (response && response.buttonCount > 0) {
                        alert(`Extension is working! Found ${response.buttonCount} AI comment buttons on this page.`);
                    } else {
                        alert('Extension is ready! Visit a LinkedIn post to see the AI comment button.');
                    }
                });
            } else {
                extensionAPI.tabs.create({
                    url: 'https://www.linkedin.com/feed/'
                });
            }
        });
    }
});
