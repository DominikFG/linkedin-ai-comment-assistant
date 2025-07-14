// Options page script
// Use browser API if available (Firefox), fallback to chrome API
const extensionAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('options-form');
    const apiKeyInput = document.getElementById('api-key');
    const defaultLanguageSelect = document.getElementById('default-language');
    const defaultCtaInput = document.getElementById('default-cta');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Load saved settings
    loadSettings();

    // Save settings when form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });

    function loadSettings() {
        extensionAPI.storage.sync.get([
            'openai_api_key',
            'default_language',
            'default_cta'
        ], function(result) {
            if (result.openai_api_key) {
                apiKeyInput.value = result.openai_api_key;
            }
            
            if (result.default_language) {
                defaultLanguageSelect.value = result.default_language;
            }
            
            if (result.default_cta) {
                defaultCtaInput.value = result.default_cta;
            } else {
                defaultCtaInput.value = 'What are your thoughts on this?';
            }
        });
    }

    function saveSettings() {
        const apiKey = apiKeyInput.value.trim();
        const defaultLanguage = defaultLanguageSelect.value;
        const defaultCta = defaultCtaInput.value.trim();

        if (!apiKey) {
            showError('Please enter your OpenAI API key');
            return;
        }

        if (!apiKey.startsWith('sk-')) {
            showError('Please enter a valid OpenAI API key (should start with "sk-")');
            return;
        }

        // Test API key by making a simple request
        testApiKey(apiKey)
            .then(() => {
                // Save settings if API key is valid
                extensionAPI.storage.sync.set({
                    openai_api_key: apiKey,
                    default_language: defaultLanguage,
                    default_cta: defaultCta || 'What are your thoughts on this?'
                }, function() {
                    if (extensionAPI.runtime.lastError) {
                        showError('Failed to save settings: ' + extensionAPI.runtime.lastError.message);
                    } else {
                        showSuccess('Settings saved successfully!');
                    }
                });
            })
            .catch((error) => {
                showError('Invalid API key: ' + error.message);
            });
    }

    async function testApiKey(apiKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Invalid API key');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    function showSuccess(message) {
        hideMessages();
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    function showError(message) {
        hideMessages();
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
});
