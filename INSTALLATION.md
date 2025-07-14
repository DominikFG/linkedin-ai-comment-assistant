# LinkedIn AI Comment Assistant - Firefox Extension

A Firefox extension that adds AI-powered comment generation to LinkedIn posts using OpenAI's ChatGPT.

## Features

- 🤖 **AI-Powered Comments**: Generate intelligent comments using OpenAI's ChatGPT
- 🎯 **Multiple Styles**: Choose from "Affirmative", "Enhancing", or "Funny" comment styles
- 🌍 **Multi-Language**: Support for multiple languages including English, Spanish, French, German, Italian, Portuguese, Dutch, and Russian
- 🎛️ **Customizable**: Configure your own OpenAI API key and default settings
- 📝 **CTA Integration**: Automatically includes Call-to-Action in generated comments

## Installation Instructions

### Method 1: Load as Temporary Extension (Development)

1. **Package the Extension**:
   ```powershell
   npm run build
   ```
   Or run the PowerShell script directly:
   ```powershell
   .\package-extension.ps1
   ```

2. **Install in Firefox**:
   - Open Firefox
   - Navigate to `about:debugging`
   - Click "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on"
   - Navigate to the extension folder and select `manifest.json` (NOT the zip file)

### Method 2: Load Extension Folder Directly

1. Open Firefox
2. Navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from this project folder

## Configuration

1. **Get OpenAI API Key**:
   - Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (it starts with `sk-`)

2. **Configure the Extension**:
   - Click the extension icon in Firefox toolbar
   - Click "Open Settings"
   - Enter your OpenAI API key
   - Set your preferred default language
   - Customize the default Call-to-Action text
   - Click "Save Settings"

## Usage

1. **Navigate to LinkedIn**: Go to [LinkedIn.com](https://linkedin.com)
2. **Find Posts**: Scroll through your feed or visit specific posts
3. **Use AI Comments**: Look for the "Comment with AI" button under posts
4. **Generate Comment**: 
   - Click the button
   - Select your preferred style (Affirmative, Enhancing, or Funny)
   - Choose your language
   - Click "Generate Comment"
   - Review and post the generated comment

## File Structure

```
linkedin-ai-comment-assistant/
├── manifest.json           # Extension manifest
├── background.js          # Background script
├── content.js            # Content script for LinkedIn
├── popup.html           # Extension popup interface
├── popup.js            # Popup functionality
├── options.html        # Settings page
├── options.js         # Settings functionality
├── styles.css        # CSS styles for modal and UI
├── package.json     # Project configuration
├── package-extension.ps1  # Build script
└── README.md       # This file
```

## Development

### Prerequisites
- Node.js (for package management)
- Firefox Developer Edition (recommended)

### Building
```bash
npm install
npm run build
```

### Testing
1. Load the extension in Firefox
2. Open browser console (F12)
3. Navigate to LinkedIn
4. Check for console messages
5. Test the "Comment with AI" buttons

## Troubleshooting

### Extension Not Loading
- Ensure all files are present
- Check manifest.json syntax
- Verify Firefox version compatibility (57.0+)

### Options Page Not Saving
- Check browser console for errors
- Verify storage permissions in manifest
- Ensure API key format is correct (starts with 'sk-')

### Buttons Not Appearing
- Refresh LinkedIn page
- Check content script console messages
- Verify LinkedIn hasn't changed their DOM structure

### API Errors
- Verify API key is correct and active
- Check OpenAI account has available credits
- Ensure internet connection is stable

## Privacy & Security

- ✅ **No Data Collection**: This extension doesn't collect or store personal data
- ✅ **Local Storage**: Settings are stored locally in browser
- ✅ **Direct API Calls**: Communicates directly with OpenAI API
- ✅ **Open Source**: All code is visible and auditable

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your OpenAI API key is valid
3. Ensure you have sufficient OpenAI credits
4. Try refreshing the LinkedIn page

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Note**: This extension requires an active OpenAI API key with available credits. Standard OpenAI API pricing applies for each generated comment.
