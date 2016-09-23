<#
    .SYNOPSIS
    Merges the *.d.ts files in the ext and sdk folders (and optionally in the 
    int folder) and then generates documentation from the output
    
    .EXAMPLE
    npm test (in parent directory)
    Runs the typescript compiler against the samples and then runs this script with no parameters.    

    .EXAMPLE
    .\BuildSDK.ps1
    Same as described in synopsis

    .PARAMETER specBasePath
    Optional: Full path to the spec folder

    .PARAMETER outputFolder
    Optional: Path to the output folder. If not specified the output is generated 
    in the current directory as:
    {currentdirectory}\S4B-Documentation

    .PARAMETER includeIntPath
    Optional: To generate documentation as jLync sees things (ext + sdk + int).
#>
param
(
    [string]$specBasePath = "",
    [string]$outputFolder = "",
    [switch]$includeIntPath
)

## Init Variables ##
$executingScriptDirectory = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$outputFile = Join-Path $executingScriptDirectory "s4b.sdk.d.ts"

if ($specBasePath -eq "")
{    
    $specBasePath = (get-item $executingScriptDirectory).Parent.FullName
}

if ($outputFolder -eq "")
{
    $outputFolder = join-path $executingScriptDirectory "S4B-Documentation"
}
if (test-path $outputFolder)
{
    Remove-Item $outputFolder -Force -Recurse | out-null
}
new-item $outputFolder -ItemType D -Force
## End variables ##


if (test-path -Path $outputFile)
{
    Remove-Item $outputFile -Force | out-null
}

$extPath = Join-Path $specBasePath "common"
$sdkPath = Join-Path $specBasePath "s4b.sdk"
$intPath = Join-Path $specBasePath "int"

if ($includeIntPath)
{
    $files = Get-ChildItem $extPath, $sdkPath, $intPath -Filter "*.d.ts"
}
else
{
    $files = Get-ChildItem $extPath, $sdkPath -Filter "*.d.ts"
}

foreach($file in $files)
{
    $content = (Get-Content $file.FullName | Where-Object {$_ -notmatch "/// <reference"})

    Add-Content -Value $content -Path $outputFile
    Write-Verbose "Merged $file.FullName into $outputFile"
}

## Temporary fix until typedoc releases a version that uses Typescript 1.7.3 (to support polymorphic 'this' typing)
(Get-Content $outputFile) -replace ": this|:this",": any" | Set-Content $outputFile
Write-Host
Write-Host "Building public documentation from file: $outputFile" -ForegroundColor Yellow
Write-Verbose "$specBasePath\node_modules\.bin\typedoc --out $outputFolder `"$outputFile`" --experimentalDecorators --target es5 --includeDeclarations --verbose"
&$specBasePath\node_modules\.bin\typedoc --out $outputFolder `"$outputFile`" --experimentalDecorators --target es5 --includeDeclarations --verbose

if ($?)
{
    Write-Host "Public documentation generated at $outputFolder" -ForegroundColor Green
}
else
{
    Write-Host "Error occurred" -ForegroundColor Red
}