Set-StrictMode -Version Latest
Write-Host "Building CSHTML - websdk.cshtml"

$cshtml = @"
@{
 Layout = "~/Views/iphone/Shared/_Layout.cshtml";
    ViewBag.Title = "Skype for Business - Interactive Web SDK";
}

<title>Skype for Business - Interactive Web SDK</title>
<div id="wrapper">
"@
$path = (Resolve-Path (Join-Path $PSScriptRoot ..\))
$html = Get-Content -Raw -Path (Join-Path $path "\index.html")
$separators = [System.Collections.ArrayList]::new()
$separators.Add("<!-- content_body -->") | Out-Null
$separators.Add("<!-- end_content_body -->") | Out-Null
$split = $html.Split($separators.ToArray(), [System.StringSplitOptions]::RemoveEmptyEntries)

#add style sheets into html fragment
$cshtml += [Environment]::NewLine
$cshtml += '<link rel="stylesheet" type="text/css" href="~/Content/websdk/styles.css" />'
$cshtml += [Environment]::NewLine
$cshtml += '<link rel="stylesheet" type="text/css" href="~/Content/websdk/online.css" />'
$cshtml += [Environment]::NewLine

#operate on the middle section as that is where the content exists
$body = $split[1].Replace("samples/", "~/Content/websdk/samples/").Replace("index.js", "~/Content/websdk/index.js")
$cshtml += $body
$cshtml += "</div>"

#save the file
$cshtml | Out-File (Join-Path $path "\websdk.cshtml")

Write-Host "Finished  Building CSHTML - websdk.cshtml"