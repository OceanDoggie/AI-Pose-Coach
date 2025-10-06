# 🎯 AI Pose Coach

> 把「小红书 / Instagram 教程」装进相机里：用自然语言 + 动态小人 + 相似度条，实时教你和摄影师怎么拍，像一位随身的 **AI 拍照教练**。

## ✨ 功能特性

- 🎯 **实时姿态检测** - 使用浏览器端 AI 分析你的姿势
- 📊 **相似度评分** - 实时评估你的姿势与标准姿势的匹配度
- 🤖 **AI 教练指导** - 提供针对模特和摄影师的实时建议
- 📸 **智能快门** - 达到标准时自动拍照
- 🖼️ **照片库** - 保存和管理你的拍摄作品
- 🎨 **现代 UI** - 支持深色/浅色主题
- 🌍 **双语支持** - 中文/英文界面

## 🚀 快速开始

### 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/YOUR_USERNAME/PoseCoach.git
cd PoseCoach

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 在浏览器访问
# http://localhost:5000
```

### 部署到 Netlify

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

快速部署：
1. 推送代码到 GitHub
2. 在 Netlify 导入项目
3. 自动检测配置并部署 ✅

## 📋 技术栈

### 前端
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Radix UI** - 无障碍组件库
- **Framer Motion** - 动画效果

### AI & 检测
- **MediaPipe Pose** - 姿态检测（计划集成）
- **浏览器端推理** - 无需服务器

### 状态管理
- **React Query** - 数据获取和缓存
- **React Hooks** - 状态管理

## 📱 使用方法

1. **选择姿势** - 从姿势库中选择一个标准姿势
2. **开启相机** - 允许浏览器访问摄像头
3. **调整姿势** - 根据实时提示调整你的姿势
4. **自动拍照** - 达到设定分数时自动拍摄
5. **查看照片** - 在照片库中查看和管理作品

## 🎨 预设姿势

- 🌅 阳光半身侧身笑
- 🚶 休闲双手叉腰
- 👔 经典肖像姿势
- 🏃 动感跃起
- 💃 优雅侧身

## 🔧 项目结构

```
PoseCoach/
├── client/              # 前端代码
│   ├── src/
│   │   ├── components/  # React 组件
│   │   ├── lib/         # 工具库
│   │   ├── data/        # 数据配置
│   │   └── pages/       # 页面组件
│   └── index.html
├── server/              # 后端代码（本地开发用）
├── shared/              # 共享类型定义
├── netlify.toml         # Netlify 配置
└── package.json         # 项目配置
```

## 🌐 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**注意：** 需要支持摄像头访问和现代 JavaScript 特性

## 📝 开发说明

### 可用脚本

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本（仅前端）
npm run build:full # 构建完整版本（前端+后端）
npm run check      # TypeScript 类型检查
```

### 本地开发要求

- Node.js 20+
- npm 9+
- 现代浏览器（支持 ES2020+）

## 🐛 问题反馈

如果遇到问题，请：
1. 查看浏览器控制台错误
2. 确认摄像头权限已授权
3. 确保使用 HTTPS 或 localhost

## 📄 许可证

MIT License

## 🙏 致谢

- MediaPipe Pose - Google 的姿态检测模型
- Radix UI - 无障碍组件库
- Tailwind CSS - 实用优先的 CSS 框架

---

**开始你的拍照之旅吧！** 📸✨


