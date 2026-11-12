# Upload one PNG to the Yoiboshi GitHub repository and verify the stored Git blob.
# Requires GitHub CLI (gh) and an authenticated GitHub account with push access.
param(
  [Parameter(Mandatory=$true, Position=0)]
  [string]$ImagePath,
  [string]$Repository = 'rin3939kagamine-a11y/yoiboshi',
  [string]$Branch = 'main',
  [string]$DestinationDirectory = 'assets/character_candidates/2026-11-12_pink_cat_maid'
)

$ErrorActionPreference = 'Stop'
$source = (Resolve-Path -LiteralPath $ImagePath).Path
if ([IO.Path]::GetExtension($source).ToLowerInvariant() -ne '.png') {
  throw 'PNG files only.'
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI not found. Install from https://cli.github.com/ then run: gh auth login'
}
& gh auth status --hostname github.com 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw 'GitHub CLI is not logged in. Run: gh auth login'
}

$bytes = [IO.File]::ReadAllBytes($source)
if ($bytes.Length -lt 33 -or $bytes.Length -gt 100MB) { throw 'Invalid PNG size (33 B to 100 MiB).' }
$signature = [byte[]](137,80,78,71,13,10,26,10)
for ($i=0; $i -lt 8; $i++) {
  if ($bytes[$i] -ne $signature[$i]) { throw 'Invalid PNG signature.' }
}
if ($bytes[25] -ne 6) { throw 'Expected RGBA PNG (color type 6).' }

$prefix = [Text.Encoding]::ASCII.GetBytes("blob $($bytes.Length)`0")
$gitObject = New-Object byte[] ($prefix.Length + $bytes.Length)
[Array]::Copy($prefix,0,$gitObject,0,$prefix.Length)
[Array]::Copy($bytes,0,$gitObject,$prefix.Length,$bytes.Length)
$sha1 = [Security.Cryptography.SHA1]::Create()
$expectedGitSha = [BitConverter]::ToString($sha1.ComputeHash($gitObject)).Replace('-','').ToLowerInvariant()
$sha256 = [Security.Cryptography.SHA256]::Create()
$expectedSha256 = [BitConverter]::ToString($sha256.ComputeHash($bytes)).Replace('-','').ToLowerInvariant()

$destination = "$($DestinationDirectory.Trim('/'))/$([IO.Path]::GetFileName($source))"
$apiPath = "repos/$Repository/contents/$destination"
$previous = & gh api -X GET "$apiPath`?ref=$Branch" --jq '.sha' 2>$null
if ($LASTEXITCODE -eq 0) {
  if ($previous.Trim() -eq $expectedGitSha) {
    Write-Output "Already registered, Git SHA matched: $expectedGitSha"
    Write-Output "https://github.com/$Repository/blob/$Branch/$destination"
    exit 0
  }
  throw "A different file already exists at $destination. No overwrite attempted."
}

$payload = @{
  message = "assets: add standee $([IO.Path]::GetFileName($source))"
  content = [Convert]::ToBase64String($bytes)
  branch = $Branch
} | ConvertTo-Json -Compress
$tempFile = [IO.Path]::GetTempFileName()
try {
  [IO.File]::WriteAllText($tempFile,$payload,(New-Object Text.UTF8Encoding($false)))
  $response = & gh api -X PUT $apiPath --input $tempFile 2>&1
  if ($LASTEXITCODE -ne 0) { throw "GitHub upload failed: $response" }
} finally {
  Remove-Item -LiteralPath $tempFile -Force -ErrorAction SilentlyContinue
}

$storedSha = & gh api -X GET "$apiPath`?ref=$Branch" --jq '.sha'
if ($LASTEXITCODE -ne 0 -or $storedSha.Trim() -ne $expectedGitSha) {
  throw "Read-back hash mismatch. Expected Git SHA: $expectedGitSha; got: $storedSha"
}
Write-Output 'UPLOAD VERIFIED'
Write-Output "Git blob SHA: $expectedGitSha"
Write-Output "Local SHA256: $expectedSha256"
Write-Output "https://github.com/$Repository/blob/$Branch/$destination"
