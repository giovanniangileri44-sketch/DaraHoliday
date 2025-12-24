$ffmpegPath = "C:\Users\giova\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"

if (-not (Test-Path $ffmpegPath)) {
    Write-Host "FFmpeg executable not found at suspected path. Trying system PATH..."
    if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
        $ffmpegPath = "ffmpeg"
    } else {
        Write-Error "FFmpeg not found. Please restart your terminal or verify path."
        exit 1
    }
}

$videosDir = "c:\Users\giova\OneDrive - Politecnico di Milano\Desktop\dara\public\videos"
# Get only mp4 files
$videos = Get-ChildItem -Path $videosDir -Recurse -Filter *.mp4

foreach ($video in $videos) {
    # Skip already compressed files to avoid loops if re-running
    if ($video.Name -like "*_compressed.mp4") { continue }

    if ($video.Length -gt 20MB) {
        Write-Host "Compressing $($video.Name) ($([math]::Round($video.Length / 1MB, 2)) MB)..."
        $inputPath = $video.FullName
        $outputPath = "$($video.DirectoryName)\$($video.BaseName)_compressed.mp4"
        
        # Using call operator & directly with quoted arguments
        & $ffmpegPath -y -i "$inputPath" -vcodec libx264 -crf 28 -preset fast "$outputPath"
        
        if ($LASTEXITCODE -eq 0) {
            $newItem = Get-Item $outputPath
            Write-Host "Compressed to $([math]::Round($newItem.Length / 1MB, 2)) MB"
            
            # Verify the new file is actually smaller and exists then replace
            if ($newItem.Exists -and $newItem.Length -gt 0) {
                 Remove-Item $inputPath -Force
                 Rename-Item $outputPath $video.Name -Force
            }
        } else {
            Write-Error "Failed to compress $($video.Name)"
        }
    } else {
        Write-Host "Skipping $($video.Name) (already small: $([math]::Round($video.Length / 1MB, 2)) MB)"
    }
}
