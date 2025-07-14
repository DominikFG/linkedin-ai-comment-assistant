# Firefox Extension Signing Guide

## Getting Your Extension Signed by Mozilla

### Prerequisites
1. **Mozilla Developer Account**: Create account at https://addons.mozilla.org/developers/
2. **Extension ID**: Your extension needs a unique ID (already configured in manifest.json)

### Step-by-Step Signing Process

#### 1. Prepare Your Extension
```bash
# Verify extension is ready
npm run verify

# Create final package
npm run build
```

#### 2. Submit to Mozilla Add-ons (AMO)
1. Go to https://addons.mozilla.org/developers/
2. Click "Submit a New Add-on"
3. Choose "On this site" (for public listing) or "On your own" (for self-distribution)
4. Upload your `linkedin-ai-comment-assistant.zip` file
5. Fill out the required information:
   - **Name**: LinkedIn AI Comment Assistant
   - **Summary**: Add AI-powered comment suggestions to LinkedIn posts
   - **Description**: (Use the description from README.md)
   - **Category**: Productivity
   - **Tags**: linkedin, ai, productivity, automation

#### 3. Review Process
- **Automated Review**: Usually takes a few minutes to hours
- **Human Review**: May take 1-7 days if flagged for manual review
- **Common Issues**: External scripts, permissions, content policy

#### 4. After Approval
- Download the signed .xpi file
- Install via Firefox: drag .xpi file to Firefox window
- Extension will be permanently installed

### Alternative: Self-Distribution Signing

If you don't want public listing:

1. Go to https://addons.mozilla.org/developers/
2. Submit add-on
3. Choose "On your own" (unlisted)
4. Upload extension
5. Get signed .xpi file for private distribution

## Option 2: Use web-ext Tool (Automated)

### Install web-ext
```bash
npm install -g web-ext
```

### Build and Sign
```bash
# Build extension
web-ext build

# Sign extension (requires API keys)
web-ext sign --api-key=YOUR_API_KEY --api-secret=YOUR_API_SECRET
```

### Get API Keys
1. Go to https://addons.mozilla.org/developers/addon/api/key/
2. Generate API credentials
3. Use in web-ext command

## Option 3: Developer Mode (Testing Only)

For development/testing without signing:

### Firefox Developer Edition
1. Download Firefox Developer Edition
2. Open about:config
3. Set `xpinstall.signatures.required` to `false`
4. Install unsigned extension

### Firefox Nightly
1. Download Firefox Nightly
2. Same steps as Developer Edition

**Note**: This only works in Developer/Nightly builds, not regular Firefox.

## Troubleshooting

### Common Signing Rejections
- **External Scripts**: Remove any external script references
- **Permissions**: Justify all permissions in description
- **Content Policy**: Ensure compliance with Mozilla policies

### If Rejected
1. Read rejection reason carefully
2. Fix identified issues
3. Resubmit extension
4. Response time usually faster on resubmission

## Important Notes

- **Free Process**: Mozilla signing is free
- **Required**: All Firefox extensions must be signed for regular Firefox
- **Review Time**: Can take up to 7 days for new extensions
- **Updates**: Each update needs new signing

## Quick Commands

```bash
# Verify extension
npm run verify

# Package for submission
npm run build

# The resulting file to upload:
# linkedin-ai-comment-assistant.zip
```
