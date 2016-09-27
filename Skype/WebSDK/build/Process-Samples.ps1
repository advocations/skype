param (
    [switch]$Online = $false
)

Set-StrictMode -Version Latest
Write-Host "Processing Samples"

$path = (Resolve-Path (Join-Path $PSScriptRoot ..\samples))

class Sample
{
    [string]$name
    [string]$location
}

class Category
{
    [string]$name
    [Sample[]]$items
    [boolean]$preview
}

class Config
{
    [Category[]]$categories
}

function isPresent([string]$target, [string]$local_path)
{
    if (Test-Path (Join-Path $local_path ("\{0}" -f $target)))
    {
        return $true;
    }

    return $false;
}

$config = [Config]::new()
$old_config = [Config](Get-Content -Raw -Path (Join-Path $path \config.json) | ConvertFrom-Json)

$dir_categories = Get-ChildItem -Path $path -Directory
$categories = [System.Collections.ArrayList]::new()

#parse each top-level folder as it's a category of samples
foreach($item in $dir_categories)
{
    $category = [Category]::new()
    $samples = [System.Collections.ArrayList]::new()
    $final_samples = [System.Collections.ArrayList]::new()

    #each directory under the top-level is a new samples for that category
    foreach($dir in $item.GetDirectories())
    {
        $sample = [Sample]::new();
        $sample.name = $dir.Name
        $sample.location = $dir.FullName.Replace($path, "samples").Replace("\", "/")
        if (!(isPresent -target "ignore" -local_path $dir.FullName))
        {
            $samples.Add($sample) | Out-Null
        }
    }

    #if we have this category in our old config we need to pull the old
    #since it has the ordering we want to maintain
    $old_category = $old_config.categories | Where { $_.name -eq $item.Name } | Select -First 1
    if ($old_category)
    {
        foreach($var in $old_category.items)
        {
            $temp = $samples | Where { $_.name -eq $var.name }
            if ($temp)
            {
                $final_samples.Add($temp) | Out-Null
                $samples.Remove($temp) | Out-Null
            }
        }
    }

    #add new samples not found in old config
    $final_samples.AddRange($samples) | Out-Null

    #if the category is not empty we want to add it to the temporary configuration
    if ($final_samples.Count -ne 0)
    {
        $category.name = $item.Name
        $category.items = $final_samples
        $category.preview = (isPresent -target "preview" -local_path $item.FullName)

        $categories.Add($category) | Out-Null;
    }
}

$final_categories = [System.Collections.ArrayList]::new()

#iterate over the established categories
foreach($item in $old_config.categories)
{
    $temp = $categories | Where { $_.name -eq $item.name }
    if ($temp)
    {
        $final_categories.Add($temp) | Out-Null
        $categories.Remove($temp)
    }
}

#add new categories not found in old config
$final_categories.AddRange($categories) | Out-Null

$config.categories = $final_categories

if ($Online)
{
    $js =@"
var location_config = {
    content: '/Content/websdk/',
    token: 'websdk'
};
"@
    $js | Out-File (Join-Path $path \location_config.js)
    ConvertTo-Json $config -Depth 5 -Compress | Out-File -Encoding UTF8 (Join-Path $path \config.json)
}
else
{
        $js =@"
var location_config = {
    content: '',
    token: ''
};
"@
    $js | Out-File (Join-Path $path \location_config.js)
    ConvertTo-Json $config -Depth 5 | Out-File -Encoding UTF8 (Join-Path $path \config.json)
}

Write-Host "Finished Processing Samples"