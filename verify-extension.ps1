# Firefox Extension Verification Script

Write-Host "=== LinkedIn AI Comment Assistant - Firefox Extension Verification ===" -ForegroundColor Cyan

# Required files for the extension
$requiredFiles = @(
    "manifest.json",
    "background.js",
    "content.js", 
    "popup.html",
    "popup.js",
    "options.html",
    "options.js",
    "styles.css"
)

Write-Host "`n1. Checking required files..." -ForegroundColor Yellow

$allFilesPresent = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (MISSING)" -ForegroundColor Red
        $allFilesPresent = $false
    }
}

Write-Host "`n2. Validating manifest.json..." -ForegroundColor Yellow
try {
    $manifest = Get-Content "manifest.json" | ConvertFrom-Json
    Write-Host "  ✓ manifest.json is valid JSON" -ForegroundColor Green
    Write-Host "  ✓ Extension: $($manifest.name) v$($manifest.version)" -ForegroundColor Green
    Write-Host "  ✓ Manifest Version: $($manifest.manifest_version)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ manifest.json is invalid: $($_.Exception.Message)" -ForegroundColor Red
    $allFilesPresent = $false
}

Write-Host "`n3. Checking package file..." -ForegroundColor Yellow
if (Test-Path "linkedin-ai-comment-assistant.zip") {
    $zipSize = (Get-Item "linkedin-ai-comment-assistant.zip").Length
    Write-Host "  ✓ Extension package exists ($zipSize bytes)" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Extension package not found (run: npm run build)" -ForegroundColor Yellow
}

Write-Host "`n=== Installation Instructions ===" -ForegroundColor Cyan
Write-Host "To install in Firefox:" -ForegroundColor White
Write-Host "1. Open Firefox" -ForegroundColor Gray
Write-Host "2. Navigate to about:debugging" -ForegroundColor Gray
Write-Host "3. Click 'This Firefox'" -ForegroundColor Gray
Write-Host "4. Click 'Load Temporary Add-on'" -ForegroundColor Gray
Write-Host "5. Select the manifest.json file from this directory" -ForegroundColor Gray

Write-Host "`n=== Configuration Required ===" -ForegroundColor Cyan
Write-Host "After installation:" -ForegroundColor White
Write-Host "1. Click the extension icon in Firefox toolbar" -ForegroundColor Gray
Write-Host "2. Click 'Open Settings'" -ForegroundColor Gray
Write-Host "3. Enter your OpenAI API key (get from: https://platform.openai.com/api-keys)" -ForegroundColor Gray
Write-Host "4. Save settings" -ForegroundColor Gray
Write-Host "5. Visit LinkedIn.com to test" -ForegroundColor Gray

if ($allFilesPresent) {
    Write-Host "`n✅ Extension is ready for installation!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Extension has missing files. Please fix before installation." -ForegroundColor Red
}

Write-Host "`n=== Quick Start ===" -ForegroundColor Cyan
Write-Host "npm run build    # Create extension package" -ForegroundColor Gray
Write-Host "Then load manifest.json in Firefox about:debugging" -ForegroundColor Gray
