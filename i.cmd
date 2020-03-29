call .\entorno.cmd
start "demo" /d .\ cmd.exe /k yarn demo
start "build-dev-watch" /d .\ cmd.exe /k yarn build-dev-watch