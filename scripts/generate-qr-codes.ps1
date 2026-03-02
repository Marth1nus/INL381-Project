param(
  [string]$Url = "https://bcwildwatch.co.za",
  [string]$Name = "public/BC Wild Watch QRCode",
  [string]$Logo = "public/BC Wild Watch Logo.svg",
  [double]$LogoSize = 0.25,
  [switch]$IncludeBackground
)

if (!(Test-Path $Logo) -or !($Logo -like "*.svg")) {
  Write-Error "`"$Logo`" is not a valid svg file path"
  exit 1
}
$logo_svg_source = Get-Content $logo -Raw

wsl qrencode $Url -o "$Name.png" -m 0 -s 1 -l H
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$qr_svg_source = @"
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
  <defs>
    <symbol id="QrCode">
      <rect
        width="1"
        height="1"
        fill="currentColor"
        mask="url(#QrDotsMask)" />
      <mask id="QrDotsMask">
        <image
          width="1"
          href="data:image/png;base64,$([Convert]::ToBase64String([IO.File]::ReadAllBytes("$Name.png")))"
          style="image-rendering: pixelated; filter: invert(1)" />
      </mask>
    </symbol>
    <symbol id="logo" viewBox="$($logo_svg_source -replace '[\s\S]*?<svg[\s\S]*?viewBox="([\d\s]+)"[\s\S]*>[\s\S]*','$1')">
    $(
        ($logo_svg_source -replace '[\s\S]*?<svg[\s\S]*?>([\s\S]*)</svg>[\s\S]*','$1'
        ) -replace '\r?\n','
    ')
    </symbol>
  </defs>
  $(if ($IncludeBackground) { '<rect width="1" height="1" fill="white" />' })
  <use
    href="#QrCode"
    x="0"
    y="0"
    width="1"
    height="1"
    mask="url(#logoCutOut)" />
  <mask id="logoCutOut">
    <rect width="1" height="1" fill="white" />
    <circle
    cx="0.5"
    cy="0.5"
    r="$($LogoSize * 0.75)"
    fill="black" />
  </mask>
  <use
    href="#logo"
    x="$(0.5 - $LogoSize / 2.0)"
    y="$(0.5 - $LogoSize / 2.0)"
    width="$LogoSize"
    height="$LogoSize" />
</svg>
"@
$qr_svg_source | Set-Content -Path "$Name.svg" -Encoding UTF8  
