[README.md](https://github.com/user-attachments/files/34251987/README.md)
# baziai# guoxuefengshui

国学 · 风水 · 命理 H5 工具站（项目目录：`AiCode`）。

面向手机浏览器的「择日 / 命理 / 风水」一站式入口：前端静态页 + ASP.NET Core API，部分模块支持大模型流式解读与后台访问统计。

---

#### 介绍

本仓库提供一套可自建部署的国学风水 Web 应用，首页聚合多项工具，主要包括：

| 模块 | 路径 | 说明 |
|------|------|------|
| 嫁娶择日 | `/zeri/jiaqu/` | 择日相关 |
| 搬家择日 | `/zeri/banjia/` | 搬家择日 |
| 电子罗盘 | `/zeri/luopan/` | 手机罗盘 |
| 立极尺 | `/zeri/liji/` | 立极尺 / 流年飞星 |
| 八字排盘 | `/zeri/bazi/` | 四柱排盘与 AI 解读 |
| 奇门遁甲 | `/zeri/qimen/` | 奇门排盘与解读 |
| 理气 / 玄空 | `/zeri/liqi/`、`/zeri/index/xuankong.html` | 理气与玄空飞星 |
| 紫微斗数 | `/zeri/ziwei/` | 紫微排盘与大运曲线 |
| 地图罗盘 | `/zeri/dituluopan/` | 地图叠加罗盘 |
| 演海 / 春牛 / 滚盘珠等 | `/zeri/yanhai/` 等 | 其它术数小工具 |
| 助农介绍 | `/zeri/fengmi/` | 助农产品介绍页 |
| 管理后台 | `/zeri/manage/` | 访问日志、在线、模型等 |

根路径 `/` 会跳转到 `/zeri/index/`。

---

#### 软件架构

```
浏览器 H5 (wwwroot/zeri/*)
        │
        ▼
ASP.NET Core 3.1 (AiCode)
  ├── Controllers   REST /zeri/api/*
  ├── Services      排盘、AI 解读、缓存、访问日志等
  ├── Middleware    Ticket / 安全相关
  └── wwwroot       静态资源与各功能页
        │
        ├── MySQL          解读缓存、访问日志、管理账号等
        └── 大模型 API     智谱 / Nvidia / Agnes 等（可配置多路竞速）
```

- **运行时**：.NET Core 3.1 Web
- **前端**：原生 HTML / CSS / JS（移动端优先）
- **数据**：MySQL（连接串见配置）；本地另有 `Data/ip2region.xdb` 做 IP 属地
- **配置**：`AiCode/appsettings.json`（本地私有，已 gitignore）；仓库提供 `appsettings.Example.json` 作模板

主要依赖包：`ChineseCalendar`、`MySqlConnector`、`IP2Region.Net`、`SkiaSharp`、`Swashbuckle.AspNetCore`。

---

#### 安装教程

1. **环境**
   - 安装 [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet/3.1)（或更高 SDK，并确保能编译 `netcoreapp3.1`）
   - 准备 MySQL 5.7+ / 8.x，并创建数据库（默认名可参考配置中的 `AiCode`）

2. **获取代码**
   ```bash
   git clone <本仓库地址>
   cd guoxuefengshui/AiCode
   ```

3. **配置**
   ```bash
   # 复制示例配置为本地配置（勿把含密钥的文件提交到 Git）
   copy appsettings.Example.json appsettings.json
   ```
   编辑 `appsettings.json`，至少填写：
   - `ConnectionStrings:AiCodeMySql`
   - 各 `LlmProviders.*.ApiKey`（按你实际启用的模型）
   - `ApiSecurity:SigningKey`（请换成足够长的随机串）

4. **编译运行**
   ```bash
   dotnet restore
   dotnet run
   ```
   浏览器打开提示的本地地址，或直接访问 `/zeri/index/`。

5. **生产部署（IIS 示例）**
   ```bash
   dotnet publish -c Release -o ./publish
   ```
   将发布目录挂到 IIS（需安装 ASP.NET Core Hosting Bundle），站点根指向发布输出；确保 `wwwroot`、`Data`、配置文件一并部署，并开放对 MySQL 的访问。

---

#### 使用说明

1. 打开站点首页 `/zeri/index/`，点选对应卡片进入功能页。
2. **八字 / 紫微 / 奇门** 等：录入出生信息或起局条件后排盘；若已配置大模型，可使用流式 AI 解读（思考过程默认开启）。
3. **罗盘 / 立极尺 / 地图罗盘**：需手机浏览器，并授予定位或传感器权限（视功能而定）。
4. **管理后台**：访问 `/zeri/manage/`，使用后台账号登录，可查看访问日志、在线情况等（账号数据在 MySQL）。
5. 本地调试注意：`appsettings.json` 仅本机使用；仓库忽略真实密钥，克隆后务必用 Example 自行配置。

---

#### 目录说明

```
guoxuefengshui/
├── README.md
├── .gitignore
└── AiCode/                 # 主工程
    ├── Controllers/
    ├── Services/
    ├── Middleware/
    ├── Data/               # ip2region 等
    ├── wwwroot/zeri/       # H5 各功能页
    ├── appsettings.Example.json
    └── AiCode.csproj
```

---

#### 参与贡献

1. Fork 本仓库  
2. 新建 `Feat_xxx` 分支  
3. 提交代码（请勿提交 `appsettings.json`、密钥、`bin/`、`obj/`、大型工具目录）  
4. 新建 Pull Request  

---

#### 注意事项

- 本项目含术数类内容，仅供学习与参考，不构成任何决策建议。  
- 请遵守所使用大模型服务商的条款与当地法律法规。  
- 上传或公开仓库前，确认已排除数据库密码、API Key 等敏感信息。
