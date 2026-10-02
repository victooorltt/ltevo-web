# Instalar la skill actualizada

Esta carpeta contiene la versión 2.0 lista para usar. Los scripts del repositorio ya están actualizados; la sesión del agente tiene `.agents/` protegida como solo lectura y no puede reemplazar la skill activa.

Desde PowerShell en la raíz del repositorio:

```powershell
Copy-Item -Path ".\.agents\skills\ltevo-blog-generator" -Destination "$env:TEMP\ltevo-blog-generator-backup" -Recurse -Force
Copy-Item -Path ".\skill-updates\ltevo-blog-generator\*" -Destination ".\.agents\skills\ltevo-blog-generator" -Recurse -Force
```

Copia también `references/` y `assets/`; reemplazar solo `SKILL.md` dejaría enlaces a recursos ausentes. Recarga la skill en Antigravity después de copiar. El registro de skills debe refrescarse tras instalar (si utilizas Gentle AI: `gentle-ai skill-registry refresh`); no indica que la skill activa haya cambiado antes de la copia.

La autorización de autoría corresponde a Víctor Lasheras y su perfil en `/sobre-nosotros`, con información confirmada por LTEvo. Las pruebas/experiencia que se incluyan en nuevos artículos requieren hechos documentados.

Comprueba desde el repositorio:

```powershell
node --test scripts/validate-post.test.mjs scripts/blog-tools.test.mjs
node scripts/validate-post.mjs --all
```

El validador comprueba contrato local; el build y preview real siguen siendo obligatorios antes de publicar. La skill no promete posiciones ni impone keywords literales, longitud según KD o un número artificial de fuentes/visualizaciones.
