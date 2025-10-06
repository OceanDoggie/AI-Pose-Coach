# PoseCoach 部署指南

## 📦 部署到 Netlify

### 方法1：通过 GitHub 自动部署（推荐）

#### 第1步：推送到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: PoseCoach app ready for deployment"

# 添加远程仓库（替换成你的 GitHub 仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git push -u origin main
```

#### 第2步：在 Netlify 部署

1. 访问 [Netlify](https://www.netlify.com/) 并登录
2. 点击 "Add new site" → "Import an existing project"
3. 选择 "GitHub" 并授权访问
4. 选择你的 PoseCoach 仓库
5. 配置构建设置（应该会自动检测到 `netlify.toml`）：
   - **Base directory**: `PoseCoach`（如果你的项目在子目录）
   - **Build command**: `npm run build`（已在 netlify.toml 配置）
   - **Publish directory**: `dist/public`（已在 netlify.toml 配置）
6. 点击 "Deploy site"

#### 第3步：等待部署完成

Netlify 会自动构建并部署你的应用，几分钟后你就能看到你的应用上线了！

---

### 方法2：手动部署

如果你不想使用 GitHub，也可以手动部署：

```bash
# 1. 本地构建
npm install
npm run build

# 2. 使用 Netlify CLI 部署
npx netlify-cli deploy --prod --dir=dist/public
```

---

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5000
```

---

## 📋 脚本说明

- `npm run dev` - 启动本地开发服务器（带后端）
- `npm run build` - 构建前端静态文件（用于 Netlify 部署）
- `npm run build:full` - 构建前端+后端（用于完整部署）
- `npm run start` - 启动生产服务器（需要先运行 build:full）

---

## 🔧 配置文件说明

### `netlify.toml`
Netlify 部署配置文件，包含：
- 构建命令和输出目录
- SPA 路由重定向规则
- 安全头部配置
- 缓存策略

### `package.json`
项目依赖和脚本配置：
- `build` 脚本用于 Netlify 部署（只构建前端）
- `build:full` 脚本用于完整部署（前端+后端）

---

## ⚙️ 环境说明

### 当前架构
这个应用现在是**纯前端应用**：
- ✅ 所有姿态检测在浏览器中运行
- ✅ 照片存储在浏览器的本地状态
- ✅ 无需后端服务器
- ✅ 可以部署到任何静态托管服务（Netlify, Vercel, GitHub Pages 等）

### 如果需要持久化存储
如果将来需要保存照片到服务器，可以考虑：
1. 使用 Netlify Functions（无服务器函数）
2. 集成第三方存储服务（如 Supabase, Firebase）
3. 部署到支持 Node.js 的平台（如 Vercel, Railway）

---

## 🌐 访问权限

注意：这个应用需要访问摄像头权限
- Netlify 自动提供 HTTPS
- 现代浏览器只允许在 HTTPS 或 localhost 访问摄像头
- 部署后确保使用 HTTPS 访问

---

## 📱 功能特性

- 🎯 实时姿态检测
- 📊 相似度评分
- 🤖 AI 拍照指导
- 📸 自动/手动快门
- 🖼️ 照片库管理
- 🎨 深色/浅色主题
- 🌍 中英文双语

---

## 🐛 常见问题

### 相机无法访问？
- 确保使用 HTTPS 或 localhost
- 检查浏览器权限设置
- 尝试使用不同的浏览器

### 部署后页面空白？
- 检查浏览器控制台错误
- 确认构建成功
- 检查 `netlify.toml` 中的路径配置

---

## 📞 需要帮助？

如果遇到部署问题，可以：
1. 查看 Netlify 的部署日志
2. 检查浏览器控制台错误
3. 确认所有依赖都已安装


