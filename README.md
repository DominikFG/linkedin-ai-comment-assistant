# LinkedIn AI Comment Assistant

A Firefox extension that adds AI-powered comment generation to LinkedIn posts using OpenAI's ChatGPT API.

## Features

- 🤖 **AI-Powered Comments**: Generate intelligent comments using ChatGPT
- 🎭 **Multiple Styles**: Choose from affirmative, enhancing, or funny comment styles
- 🌍 **Multi-Language Support**: Generate comments in 10+ languages
- 📢 **Custom CTAs**: Include personalized call-to-action messages
- 🔗 **LinkedIn Integration**: Seamlessly integrates with LinkedIn's interface
- 📋 **Easy Copying**: One-click copy to clipboard or direct insertion

## Installation

### From Source (Development)

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension directory
6. The extension will be loaded temporarily

### Setting Up

1. After installation, click on the extension icon in Firefox
2. Click "Options" or the extension will automatically open the options page
3. Enter your OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))
4. Configure your default language and call-to-action message
5. Save your settings

## Usage

1. **Navigate to LinkedIn**: Open LinkedIn.com in your browser
2. **Find Posts**: Browse your LinkedIn feed
3. **Click "Comment with AI"**: You'll see a blue button on each post
4. **Configure Your Comment**:
   - Select a style (Affirmative, Enhancing, or Funny)
   - Choose your preferred language
   - Optionally customize the call-to-action
5. **Generate**: Click "Generate Comment" and wait for AI to create your response
6. **Use the Comment**: Copy to clipboard or insert directly into LinkedIn

## Comment Styles

- **Affirmative**: Supportive and positive responses that agree with the main points
- **Enhancing**: Adds valuable insights and builds upon the original ideas
- **Funny**: Humorous and light-hearted while maintaining professionalism

## Supported Languages

- English
- Spanish
- French
- German
- Italian
- Portuguese
- Dutch
- Chinese
- Japanese
- Korean

## Privacy & Security

- Your OpenAI API key is stored locally in your browser
- No data is sent to any servers except OpenAI's official API
- Post content is only used for generating comments and is not stored
- The extension only works on linkedin.com domains

## Requirements

- Firefox browser
- Valid OpenAI API key
- Internet connection

## API Costs

This extension uses OpenAI's API, which has usage-based pricing. Each comment generation typically costs a few cents. Monitor your usage on the [OpenAI dashboard](https://platform.openai.com/usage).

## Troubleshooting

### Extension not working
- Make sure you've entered a valid API key in the options
- Check that you're on linkedin.com
- Try refreshing the page

### Comments not generating
- Verify your API key is correct and has available credits
- Check your internet connection
- Make sure you've selected both style and language

### Button not appearing
- Refresh the LinkedIn page
- Make sure the extension is enabled
- Try scrolling to load more posts

## Development

To modify this extension:

1. Edit the source files as needed
2. Reload the extension in `about:debugging`
3. Test your changes on LinkedIn

### File Structure

```
├── manifest.json          # Extension configuration
├── content.js             # Main content script
├── background.js          # Background script
├── styles.css             # Extension styles
├── options.html           # Settings page
├── options.js             # Settings page logic
├── icons/                 # Extension icons
└── README.md              # This file
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.

## Disclaimer

This extension is not affiliated with LinkedIn or OpenAI. Use responsibly and in accordance with LinkedIn's terms of service and community guidelines.
