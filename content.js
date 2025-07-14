// Content script that injects the "Comment with AI" button into LinkedIn posts
(function() {
    'use strict';

    let modalContainer = null;

    // Function to inject AI comment buttons
    function injectAIButtons() {
        // Select all LinkedIn post containers that don't already have our button
        const posts = document.querySelectorAll('[data-urn]:not([data-ai-button-added])');
        
        posts.forEach(post => {
            // Find the actions bar (like, comment, share buttons)
            const actionsBar = post.querySelector('.feed-shared-social-action-bar');
            if (actionsBar && actionsBar.parentElement) {
                // Create our AI comment button
                const aiButton = createAIButton(post);
                
                // Insert the button after the existing action buttons
                actionsBar.parentElement.appendChild(aiButton);
                
                // Mark this post as having our button to avoid duplicates
                post.setAttribute('data-ai-button-added', 'true');
            }
        });
    }

    // Create the AI comment button
    function createAIButton(postElement) {
        const button = document.createElement('button');
        button.className = 'artdeco-button artdeco-button--muted artdeco-button--3 artdeco-button--tertiary ember-view social-actions-button comment-button flex-wrap';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
                <path d="M10.5 6.5c0 .8-.7 1.5-1.5 1.5S7.5 7.3 7.5 6.5 8.2 5 9 5s1.5.7 1.5 1.5zM6.5 6.5C6.5 7.3 5.8 8 5 8s-1.5-.7-1.5-1.5S4.2 5 5 5s1.5.7 1.5 1.5z"/>
                <path d="M8 9c-1.5 0-2.8 1-3.2 2.4h6.4C10.8 10 9.5 9 8 9z"/>
            </svg>
            Comment with AI
        `;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAIModal(postElement);
        });
        
        return button;
    }

    // Extract post content for AI processing
    function extractPostContent(postElement) {
        const textContent = postElement.querySelector('[data-test-id="main-feed-activity-card__commentary"]') ||
                          postElement.querySelector('.feed-shared-text') ||
                          postElement.querySelector('.break-words');
        
        const authorElement = postElement.querySelector('.feed-shared-actor__name') ||
                            postElement.querySelector('.update-components-actor__name');
        
        return {
            text: textContent ? textContent.innerText.trim() : '',
            author: authorElement ? authorElement.innerText.trim() : 'Unknown'
        };
    }

    // Open the AI modal
    function openAIModal(postElement) {
        const postContent = extractPostContent(postElement);
        
        if (!postContent.text) {
            alert('Could not extract post content. Please try again.');
            return;
        }

        createModal(postContent, postElement);
    }

    // Create and show the modal
    function createModal(postContent, postElement) {
        // Remove existing modal if any
        if (modalContainer) {
            modalContainer.remove();
        }

        modalContainer = document.createElement('div');
        modalContainer.className = 'ai-modal-overlay';
        modalContainer.innerHTML = `
            <div class="ai-modal">
                <div class="ai-modal-header">
                    <h3>Generate AI Comment</h3>
                    <button class="ai-modal-close">&times;</button>
                </div>
                <div class="ai-modal-content">
                    <div class="post-preview">
                        <strong>Post by ${postContent.author}:</strong>
                        <p>"${postContent.text.substring(0, 200)}${postContent.text.length > 200 ? '...' : ''}"</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="style-select">Comment Style:</label>
                        <select id="style-select" class="form-control">
                            <option value="">Select a style...</option>
                            <option value="affirmative">Affirmative</option>
                            <option value="enhancing">Enhancing</option>
                            <option value="funny">Funny</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="language-select">Language:</label>
                        <select id="language-select" class="form-control">
                            <option value="">Select a language...</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Italian">Italian</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Dutch">Dutch</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cta-input">Call to Action (optional):</label>
                        <input type="text" id="cta-input" class="form-control" placeholder="e.g., What do you think? Let's connect!">
                    </div>
                    
                    <div class="ai-modal-actions">
                        <button id="generate-comment" class="btn-primary" disabled>Generate Comment</button>
                        <button id="cancel-modal" class="btn-secondary">Cancel</button>
                    </div>
                    
                    <div id="loading-indicator" class="loading" style="display: none;">
                        <div class="spinner"></div>
                        <p>Generating your AI comment...</p>
                    </div>
                    
                    <div id="result-container" style="display: none;">
                        <h4>Generated Comment:</h4>
                        <div id="generated-comment" class="generated-comment"></div>
                        <div class="result-actions">
                            <button id="copy-comment" class="btn-primary">Copy Comment</button>
                            <button id="insert-comment" class="btn-primary">Insert into LinkedIn</button>
                            <button id="regenerate" class="btn-secondary">Generate Again</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalContainer);

        // Add event listeners
        setupModalEventListeners(postContent, postElement);
    }

    // Set up event listeners for the modal
    function setupModalEventListeners(postContent, postElement) {
        const styleSelect = document.getElementById('style-select');
        const languageSelect = document.getElementById('language-select');
        const generateBtn = document.getElementById('generate-comment');
        const cancelBtn = document.getElementById('cancel-modal');
        const closeBtn = document.querySelector('.ai-modal-close');
        const copyBtn = document.getElementById('copy-comment');
        const insertBtn = document.getElementById('insert-comment');
        const regenerateBtn = document.getElementById('regenerate');

        // Enable generate button when both style and language are selected
        function checkFormValidity() {
            generateBtn.disabled = !styleSelect.value || !languageSelect.value;
        }

        styleSelect.addEventListener('change', checkFormValidity);
        languageSelect.addEventListener('change', checkFormValidity);

        // Close modal
        function closeModal() {
            if (modalContainer) {
                modalContainer.remove();
                modalContainer = null;
            }
        }

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });

        // Generate comment
        generateBtn.addEventListener('click', () => generateAIComment(postContent));
        regenerateBtn?.addEventListener('click', () => generateAIComment(postContent));

        // Copy comment
        copyBtn?.addEventListener('click', copyToClipboard);

        // Insert comment
        insertBtn?.addEventListener('click', () => insertCommentToLinkedIn(postElement));
    }

    // Generate AI comment using ChatGPT
    async function generateAIComment(postContent) {
        const style = document.getElementById('style-select').value;
        const language = document.getElementById('language-select').value;
        const customCTA = document.getElementById('cta-input').value;

        // Show loading
        document.getElementById('loading-indicator').style.display = 'block';
        document.getElementById('result-container').style.display = 'none';

        try {
            // Get API key from storage
            const result = await new Promise((resolve) => {
                chrome.storage.sync.get(['openai_api_key'], resolve);
            });

            if (!result.openai_api_key) {
                throw new Error('OpenAI API key not configured. Please set it in the extension options.');
            }

            const prompt = createPrompt(postContent, style, language, customCTA);
            const response = await callOpenAI(result.openai_api_key, prompt);

            // Hide loading and show result
            document.getElementById('loading-indicator').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('generated-comment').textContent = response;

        } catch (error) {
            document.getElementById('loading-indicator').style.display = 'none';
            alert('Error generating comment: ' + error.message);
        }
    }

    // Create prompt for ChatGPT
    function createPrompt(postContent, style, language, customCTA) {
        const styleDescriptions = {
            affirmative: 'supportive and positive, agreeing with the main points',
            enhancing: 'adding valuable insights and building upon the ideas',
            funny: 'humorous and light-hearted while remaining professional'
        };

        const cta = customCTA || 'What are your thoughts on this?';

        return `Please write a ${styleDescriptions[style]} comment in ${language} for this LinkedIn post:

"${postContent.text}"

The comment should be:
- ${styleDescriptions[style]}
- Professional and appropriate for LinkedIn
- 2-3 sentences long
- Include this call to action at the end: "${cta}"

Please respond with only the comment text, no additional formatting or quotes.`;
    }

    // Call OpenAI API
    async function callOpenAI(apiKey, prompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate comment');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    // Copy to clipboard
    async function copyToClipboard() {
        const comment = document.getElementById('generated-comment').textContent;
        try {
            await navigator.clipboard.writeText(comment);
            const copyBtn = document.getElementById('copy-comment');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (error) {
            alert('Failed to copy to clipboard');
        }
    }

    // Insert comment into LinkedIn
    function insertCommentToLinkedIn(postElement) {
        const comment = document.getElementById('generated-comment').textContent;
        
        // Find the comment input field for this post
        const commentButton = postElement.querySelector('[aria-label*="comment" i], [data-control-name="comment"]');
        if (commentButton) {
            commentButton.click();
            
            // Wait for comment box to appear
            setTimeout(() => {
                const commentBox = postElement.querySelector('[data-placeholder*="comment" i], .ql-editor, [contenteditable="true"]');
                if (commentBox) {
                    commentBox.focus();
                    commentBox.innerHTML = comment;
                    
                    // Trigger input events
                    commentBox.dispatchEvent(new Event('input', { bubbles: true }));
                    commentBox.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    // Close modal
                    if (modalContainer) {
                        modalContainer.remove();
                        modalContainer = null;
                    }
                } else {
                    alert('Could not find comment input field. Please copy the comment and paste it manually.');
                }
            }, 1000);
        } else {
            alert('Could not find comment button. Please copy the comment and paste it manually.');
        }
    }

    // Initialize the extension
    function init() {
        // Inject buttons initially
        injectAIButtons();
        
        // Set up mutation observer to handle dynamically loaded content
        const observer = new MutationObserver((mutations) => {
            let shouldInject = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    shouldInject = true;
                }
            });
            
            if (shouldInject) {
                setTimeout(injectAIButtons, 1000);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Start the extension when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
