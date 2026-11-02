# guoxuefengshui

Chinese metaphysics & feng shui H5 toolkit (project folder: `AiCode`).

Mobile-first web app: static pages under `wwwroot/zeri` plus an ASP.NET Core API, with optional LLM streaming interpret and MySQL-backed logs/cache.

#### Description

Self-hostable hub for calendar selection, BaZi, Zi Wei, Qi Men, compass tools, and related utilities. Entry: `/zeri/index/`.

#### Software Architecture

- **Runtime**: ASP.NET Core 3.1 (`AiCode`)
- **Frontend**: HTML/CSS/JS under `AiCode/wwwroot/zeri/`
- **Data**: MySQL + local `Data/ip2region.xdb`
- **AI**: Configurable multi-provider LLM (see `appsettings.Example.json`)
- **Secrets**: Real `appsettings.json` is gitignored; copy from Example

#### Installation

1. Install .NET Core 3.1 SDK (or a newer SDK that can build `netcoreapp3.1`) and MySQL.
2. Clone this repo and enter `AiCode/`.
3. Copy `appsettings.Example.json` to `appsettings.json` and fill DB / API keys / signing key.
4. Run:
   ```bash
   dotnet restore
   dotnet run
   ```
5. Open `/zeri/index/`. For production: `dotnet publish -c Release` and host with IIS / reverse proxy.

#### Instructions

1. Use the home hub cards to open each tool.
2. BaZi / Zi Wei / Qi Men support charting and optional AI interpret when LLM keys are configured.
3. Compass-related pages need mobile sensors / location permissions as applicable.
4. Admin UI: `/zeri/manage/` (MySQL-backed accounts and access logs).

#### Contribution

1. Fork the repository  
2. Create a `Feat_xxx` branch  
3. Commit (do not commit secrets, `bin/`, `obj/`, or large tool binaries)  
4. Open a Pull Request  

#### Notes

Content is for learning/reference only. Keep API keys and DB passwords out of git.
