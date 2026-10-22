$ErrorActionPreference = "Stop"

$ProjectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$ComposeFile = Join-Path $ProjectPath "docker-compose-prod.yaml"

try {
    docker info *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker Engine chưa chạy. Hãy mở Docker Desktop."
    }

    docker compose -f $ComposeFile pull product-api-prod
    if ($LASTEXITCODE -ne 0) {
        throw "Không tải được image mới từ Docker Hub."
    }

    docker compose -f $ComposeFile up -d --no-build product-api-prod
    if ($LASTEXITCODE -ne 0) {
        throw "Không cập nhật được Product API."
    }

    Write-Host "Cập nhật Product API thành công."
}
catch {
    Write-Host "Cập nhật thất bại: $_"
    exit 1
}