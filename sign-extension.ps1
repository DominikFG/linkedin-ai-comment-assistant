# Firefox Extension Signing Helper Script

Write-Host "=== Firefox Extension Signing Helper ===" -ForegroundColor Cyan

Write-Host "`n🔍 Checking extension..." -ForegroundColor Yellow
if (-not (Test-Path "manifest.json")) {
    Write-Host "❌ manifest.json not found. Please run this script from the extension directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Extension directory found" -ForegroundColor Green

Write-Host "`n📋 Choose your signing method:" -ForegroundColor Yellow
Write-Host "1. Manual submission to Mozilla Add-ons (Recommended)" -ForegroundColor White
Write-Host "2. Automated signing with web-ext (Requires API keys)" -ForegroundColor White
Write-Host "3. Developer mode installation (Unsigned, testing only)" -ForegroundColor White

$choice = Read-Host "`nEnter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`n🌐 Manual Mozilla Add-ons Submission" -ForegroundColor Green
        Write-Host "=================================" -ForegroundColor Green
        
        # Build the extension
        Write-Host "`n📦 Building extension package..." -ForegroundColor Yellow
        .\package-extension.ps1
        
        Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Go to https://addons.mozilla.org/developers/" -ForegroundColor White
        Write-Host "2. Create account or log in" -ForegroundColor White
        Write-Host "3. Click 'Submit a New Add-on'" -ForegroundColor White
        Write-Host "4. Choose 'On your own' for self-distribution (unlisted)" -ForegroundColor White
        Write-Host "   OR 'On this site' for public listing" -ForegroundColor White
        Write-Host "5. Upload: linkedin-ai-comment-assistant.zip" -ForegroundColor Yellow
        Write-Host "6. Wait for review (usually a few hours to 7 days)" -ForegroundColor White
        Write-Host "7. Download the signed .xpi file" -ForegroundColor White
        Write-Host "8. Install by dragging .xpi to Firefox" -ForegroundColor White
        
        # Open the Mozilla Add-ons developer page
        $openBrowser = Read-Host "`nOpen Mozilla Add-ons developer page? (y/n)"
        if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
            Start-Process "https://addons.mozilla.org/developers/"
        }
    }
    
    "2" {
        Write-Host "`n🔧 Automated Signing with web-ext" -ForegroundColor Green
        Write-Host "===================================" -ForegroundColor Green
        
        Write-Host "`n⚠️ You need Mozilla Add-ons API credentials:" -ForegroundColor Yellow
        Write-Host "1. Go to https://addons.mozilla.org/developers/addon/api/key/" -ForegroundColor White
        Write-Host "2. Generate API key and secret" -ForegroundColor White
        Write-Host "3. Come back here with the credentials" -ForegroundColor White
        
        $hasCredentials = Read-Host "`nDo you have API credentials? (y/n)"
        
        if ($hasCredentials -eq "y" -or $hasCredentials -eq "Y") {
            $apiKey = Read-Host "Enter API Key"
            $apiSecret = Read-Host "Enter API Secret" -AsSecureString
            $apiSecretPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiSecret))
            
            Write-Host "`n🔨 Building and signing extension..." -ForegroundColor Yellow
            
            # Set environment variables
            $env:WEB_EXT_API_KEY = $apiKey
            $env:WEB_EXT_API_SECRET = $apiSecretPlain
            
            # Run web-ext sign
            npx web-ext sign --channel=unlisted
            
            Write-Host "`n✅ Check the web-ext-artifacts folder for your signed .xpi file" -ForegroundColor Green
        } else {
            Write-Host "`n📋 To get API credentials:" -ForegroundColor Cyan
            Write-Host "1. Go to https://addons.mozilla.org/developers/addon/api/key/" -ForegroundColor White
            Start-Process "https://addons.mozilla.org/developers/addon/api/key/"
        }
    }
    
    "3" {
        Write-Host "`n🛠️ Developer Mode Installation (Unsigned)" -ForegroundColor Green
        Write-Host "=========================================" -ForegroundColor Green
        
        Write-Host "`n⚠️ This only works with Firefox Developer Edition or Nightly" -ForegroundColor Yellow
        Write-Host "`n📋 Steps:" -ForegroundColor Cyan
        Write-Host "1. Download Firefox Developer Edition:" -ForegroundColor White
        Write-Host "   https://www.mozilla.org/firefox/developer/" -ForegroundColor Gray
        Write-Host "2. Open Firefox Developer Edition" -ForegroundColor White
        Write-Host "3. Go to about:config" -ForegroundColor White
        Write-Host "4. Search for: xpinstall.signatures.required" -ForegroundColor White
        Write-Host "5. Set it to: false" -ForegroundColor White
        Write-Host "6. Go to about:debugging" -ForegroundColor White
        Write-Host "7. Click 'This Firefox'" -ForegroundColor White
        Write-Host "8. Click 'Load Temporary Add-on'" -ForegroundColor White
        Write-Host "9. Select manifest.json from this folder" -ForegroundColor White
        
        $openDevEdition = Read-Host "`nOpen Firefox Developer Edition download page? (y/n)"
        if ($openDevEdition -eq "y" -or $openDevEdition -eq "Y") {
            Start-Process "https://www.mozilla.org/firefox/developer/"
        }
    }
    
    default {
        Write-Host "`n❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n💡 Tip: For permanent installation in regular Firefox, you MUST use option 1 or 2." -ForegroundColor Cyan
Write-Host "Mozilla requires all extensions to be signed for security reasons." -ForegroundColor Gray
