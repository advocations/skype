param (
    [switch]$Online = $false,
    [switch]$Watch = $false
)

Set-StrictMode -Version Latest
Write-Host "Building Samples..."

$path = (Resolve-Path(Join-Path $PSScriptRoot ..\))

#copy config.js
Write-Host "Copying config.js..."
Copy-Item (Join-Path $path config.js) (Join-Path $path \samples\config.js) -Force
Write-Host "Finished Copying config.js"

#tsc compile
Write-Host "Compiling TS files"
$tsc = (Resolve-Path(Join-Path $PSScriptRoot ..\node_modules\typescript\lib\tsc.js))
node $tsc -p $path
Write-Host "Finished Compiling TS files"

#process-samples
& (Join-Path $PSScriptRoot .\Process-Samples.ps1) -Online:$Online

if ($Online)
{
    #create cshtml
    & (Join-Path $PSScriptRoot .\Build-CSHTML.ps1)
}

Write-Host "Finished Building Samples"

if ($Watch) {
    Write-Host "--- Watching for files changes ---"
    node $tsc -w -p $path
}