# PowerShell script for development server management
$serverProcess = $null
$serverUrl = ""

function Start-Server {
    if ($serverProcess -ne $null) {
        Write-Host "O servidor já está em execução. Pressione 'r' para reiniciar."
        return
    }
    
    Write-Host "Iniciando servidor de desenvolvimento..."
    $serverProcess = Start-Process -NoNewWindow -PassThru -FilePath "npm" -ArgumentList "run dev"
    Start-Sleep -Seconds 2  # Wait for server to start
    
    # Get server URL (usually http://localhost:5173 for Vite)
    $serverUrl = "http://localhost:5173"
    Write-Host "Server URL: $serverUrl"
}

function Show-Url {
    if ($serverUrl -eq "") {
        Write-Host "Server is not running. Start it first with 'r'."
        return
    }
    Write-Host "Server URL: $serverUrl"
}

function Open-Browser {
    if ($serverUrl -eq "") {
        Write-Host "Server is not running. Start it first with 'r'."
        return
    }
    Start-Process $serverUrl
}

function Clear-Console {
    Clear-Host
    Write-Host "Atalhos:"
    Write-Host "  pressione r + enter para reiniciar o servidor"
    Write-Host "  pressione u + enter para mostrar a URL do servidor"
    Write-Host "  pressione o + enter para abrir no navegador"
    Write-Host "  pressione c + enter para limpar o console"
    Write-Host "  pressione q + enter para sair"
}

function Stop-Server {
    if ($serverProcess -ne $null) {
        Write-Host "Parando servidor..."
        Stop-Process -Id $serverProcess.Id -Force
        $serverProcess = $null
        $serverUrl = ""
    }
}

Clear-Console
Start-Server

while ($true) {
    $input = Read-Host
    switch ($input) {
        "r" { Stop-Server; Start-Server }
        "u" { Show-Url }
        "o" { Open-Browser }
        "c" { Clear-Console }
        "q" { Stop-Server; break }
        default { Write-Host "Comando desconhecido: $input" }
    }
}
