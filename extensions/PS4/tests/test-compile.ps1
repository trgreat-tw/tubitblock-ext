param(
    [Parameter(Mandatory)][string]$Cli,
    [Parameter(Mandatory)][string]$ArduinoData,
    [string]$BuildRoot = (Join-Path ([IO.Path]::GetTempPath()) 'tubitblock-ps4-1.3.0-tests')
)
$ErrorActionPreference = 'Stop'
$extension = Split-Path -Parent $PSScriptRoot
$resultsPath = Join-Path $PSScriptRoot 'results'
$core = Join-Path $ArduinoData 'packages\esp32\hardware\esp32\3.1.3'
if (-not (Test-Path -LiteralPath (Join-Path $core 'platform.txt'))) { throw 'The existing official ESP32 Core 3.1.3 is required; it will not be installed automatically.' }
New-Item -ItemType Directory -Path $BuildRoot -Force | Out-Null
$config = Join-Path $BuildRoot 'arduino-cli.json'
@{updater=@{enable_notification=$false};directories=@{data=$ArduinoData;user=(Join-Path $BuildRoot 'sketchbook');downloads=(Join-Path $BuildRoot 'downloads')}} |
    ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $config -Encoding utf8
$nm = Get-ChildItem -LiteralPath (Join-Path $ArduinoData 'packages\esp32\tools\esp-x32') -Filter 'xtensa-esp32-elf-nm.exe' -Recurse | Select-Object -First 1 -ExpandProperty FullName
if (-not $nm) { throw 'The installed ESP32 toolchain nm executable was not found.' }
$cases = @(
    @{Name='PS4Default';Source=(Join-Path $resultsPath 'PS4Default\PS4Default.ino')},
    @{Name='PS4Connection';Source=(Join-Path $extension 'examples\PS4Connection\PS4Connection.ino')}
)
$results = @()
foreach ($case in $cases) {
    $name = $case.Name
    $source = Get-Content -Raw -LiteralPath $case.Source
    $cleanup = [regex]::Match($source, '\b(?:PS4R|pad)\.setClearBondsOnStart\(true\)')
    $begin = [regex]::Match($source, '\b(?:PS4R|pad)\.begin\(')
    if (-not $cleanup.Success -or -not $begin.Success -or $cleanup.Index -gt $begin.Index) { throw "Cleanup ordering is incorrect in $name" }
    $sketch = Join-Path $BuildRoot $name
    New-Item -ItemType Directory -Path $sketch -Force | Out-Null
    Copy-Item -LiteralPath $case.Source -Destination (Join-Path $sketch "$name.ino") -Force
    $build = Join-Path $BuildRoot "build-$name"
    $log = Join-Path $resultsPath "compile-$name.log"
    & $Cli compile --config-file $config --fqbn esp32:esp32:esp32 --libraries (Join-Path $extension 'lib') --build-path $build --verbose $sketch *> $log
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) { Get-Content -LiteralPath $log -Tail 35; throw "Compilation failed for $name ($exitCode)" }
    $symbols = (& $nm -C --defined-only (Join-Path $build "$name.ino.elf")) -join "`n"
    $exclusive = $symbols -match 'PS4ControllerReconnect::begin\(' -and $symbols -notmatch 'PS4Controller::begin\(|DS4Controller::begin\('
    $coreConfirmed = (Get-Content -Raw -LiteralPath $log).Contains($core)
    if (-not $exclusive -or -not $coreConfirmed) { throw "Unexpected backend or Core in $name" }
    $results += [ordered]@{name=$name;exitCode=$exitCode;core='3.1.3';coreConfirmed=$coreConfirmed;onlyPS4ControllerReconnect=$exclusive;library='1.1.1-r4';log=$log;build=$build}
    Write-Output "PASS $name CORE=3.1.3 ONLY_PS4R=$exclusive"
    Get-Content -LiteralPath $log -Tail 10
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $resultsPath 'compile-results.json') -Encoding utf8
