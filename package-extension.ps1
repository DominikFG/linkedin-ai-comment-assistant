# PowerShell script to package the Firefox extension

Write-Host "Packaging LinkedIn AI Comment Assistant for Firefox..." -ForegroundColor Green

# Files to include in the extension package
$extensionFiles = @(
    "manifest.json",
    "background.js", 
    "content.js",
    "popup.html",
    "popup.js",
    "options.html",
    "options.js",
    "styles.css"
)

# Check if all required files exist
$missingFiles = @()
foreach ($file in $extensionFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "Missing required files:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
}

# Create the ZIP package
$zipPath = "linkedin-ai-comment-assistant.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating extension package..."

# Use .NET to create the ZIP file
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

foreach ($file in $extensionFiles) {
    if (Test-Path $file) {
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file, $file) | Out-Null
        Write-Host "  Added: $file" -ForegroundColor Gray
    }
}

$zip.Dispose()

Write-Host "`nExtension package created successfully!" -ForegroundColor Green
Write-Host "File: $zipPath" -ForegroundColor Yellow

Write-Host "`nTo install in Firefox:" -ForegroundColor Cyan
Write-Host "1. Open Firefox" -ForegroundColor White
Write-Host "2. Navigate to about:debugging" -ForegroundColor White  
Write-Host "3. Click 'This Firefox'" -ForegroundColor White
Write-Host "4. Click 'Load Temporary Add-on'" -ForegroundColor White
Write-Host "5. Select the manifest.json file (not the zip)" -ForegroundColor White

Write-Host "`nFor permanent installation:" -ForegroundColor Cyan
Write-Host "1. Sign the extension at https://addons.mozilla.org/developers/" -ForegroundColor White
Write-Host "2. Or use web-ext tool: npx web-ext build" -ForegroundColor White
