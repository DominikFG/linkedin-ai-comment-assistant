# Testing Instructions for LinkedIn AI Comment Assistant

## Fixed Issues

1. **Duplicate event listeners**: Combined the two `onInstalled` listeners into one
2. **API compatibility**: Added support for both Firefox (`browser`) and Chrome (`chrome`) APIs
3. **Fallback method**: Added fallback to open options page using `tabs.create()` if `openOptionsPage()` fails
4. **Added logging**: Enhanced debug logging to help identify issues

## How to Test

### Step 1: Load the Extension in Firefox

1. Open Firefox
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to `c:\Repos\answer-with-ai\` and select `manifest.json`

### Step 2: Check if Options Page Opens Automatically

After loading the extension:
- The options page should open automatically in a new tab
- Check the Browser Console (F12) for debug messages

### Step 3: Manual Testing

If the options page doesn't open automatically:

1. **Using the Popup**:
   - Click the extension icon in the toolbar
   - Click "Open Settings" button

2. **Using about:addons**:
   - Go to `about:addons`
   - Find "LinkedIn AI Comment Assistant"
   - Click "Options" or "Preferences"

3. **Direct URL**:
   - Open a new tab and go to: `moz-extension://[extension-id]/options.html`
   - (Replace [extension-id] with the actual ID shown in about:debugging)

### Step 4: Test the Options Page

1. Enter a test API key (start with "sk-")
2. Select a default language
3. Enter a default CTA
4. Click "Save Settings"
5. Check for success/error messages

### Step 5: Debug Console Output

Open Browser Console (Ctrl+Shift+J) and look for:
- "Background script loaded, using: [browser API/chrome API]"
- "Extension installed/updated: [details]"
- "Checking for API key: [result]"
- "No API key found, opening options page" (if no API key)

## Common Issues and Solutions

### Issue: Options page doesn't open
**Solution**: Use the popup button or manual methods above

### Issue: Extension API not available
**Check**: Make sure you're testing in Firefox and the extension is properly loaded

### Issue: Storage errors
**Check**: Make sure storage permission is granted

### Issue: Console errors
**Check**: Look for specific error messages in the console and share them for debugging

## Files Modified

- `background.js`: Fixed duplicate listeners, added logging, added fallback
- `manifest.json`: Added proper Firefox configuration, removed broken icon references
- `options.js`: Added Firefox API compatibility
- `popup.html`: Created manual options page opener

The extension should now work properly in Firefox and automatically open the options page when first installed (if no API key is configured).
