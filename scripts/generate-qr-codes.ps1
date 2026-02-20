param(
  [string]$Url = "https://bcwildwatch.co.za",
  [string]$Name = "public/BC Wild Watch QRCode",
  [string]$Logo = "public/BC Wild Watch Logo.svg",
  [double]$LogoSize = 0.25
)

if (!(Test-Path $Logo) -or !($Logo -like "*.svg")) {
  Write-Error "`"$Logo`" is not a valid svg file path"
  exit 1
}
$logo_svg_source = Get-Content $logo -Raw

wsl qrencode $Url -o "$Name.png" -m 0 -s 1 -l H
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$qr_png_base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$Name.png"))

$qr_svg_source = @"
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
  <defs>
    <symbol id="qrCode">
      <mask id="qrMask">
        <image
          width="1"
          href="data:image/png;base64,$qr_png_base64"
          style="image-rendering: pixelated" />
      </mask>
      <rect width="1" height="1" fill="currentColor" />
      <rect
        width="1"
        height="1"
        fill="currentColor"
        mask="url(#qrMask)"
        style="filter: invert(1)" />
    </symbol>
    <symbol id="logo" viewBox="0 0 100 100">
    $(
        ($logo_svg_source -replace '[\s\S]*<svg[\s\S]*?>([\s\S]*)</svg>[\s\S]*','$1'
        ) -replace '\r?\n','
    ')
    </symbol>
  </defs>
  <use
    href="#qrCode"
    x="0"
    y="0"
    width="1"
    height="1" />
  <circle
    cx="0.5"
    cy="0.5"
    r="$($LogoSize * 0.75)"
    fill="currentColor"
    style="filter: invert(1)" />
  <use
    href="#logo"
    x="$(0.5 - $LogoSize / 2.0)"
    y="$(0.5 - $LogoSize / 2.0)"
    width="$LogoSize"
    height="$LogoSize" />
</svg>
"@
$qr_svg_source | Set-Content -Path "$Name.svg" -Encoding UTF8  
