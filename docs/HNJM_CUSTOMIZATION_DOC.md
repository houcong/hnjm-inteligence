# 河南经贸智能助手 - 定制化开发文档

## 项目信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 河南经贸智能助手 |
| 版本号 | 1.0.0 |
| 基于项目 | [Cherry Studio](https://github.com/CherryHQ/cherry-studio) v1.7.6 |
| 许可证 | AGPL-3.0 |
| 定制日期 | 2024-12-23 |

---

## 一、定制内容清单

### 1. 品牌定制

| 修改项 | 原值 | 新值 | 文件位置 |
|--------|------|------|----------|
| 应用名称 | CherryStudio | HNJM-AI | `package.json` |
| 显示名称 | Cherry Studio | 河南经贸智能助手 | `electron-builder.yml` |
| 应用ID | com.kangfenmao.CherryStudio | cn.yjgj.hnjm-ai | `electron-builder.yml` |
| 版本号 | 1.7.6 | 1.0.0 | `package.json` |
| 协议 | cherrystudio:// | hnjmai:// | 多个文件 |
| 作者 | support@cherry-ai.com | 河南经济贸易技师学院 | `package.json` |
| 官网 | cherry-ai.com | www.yjgj.cn | `package.json` |
| Logo | 樱桃图标 | 学院Logo | `build/logo.png` |

### 2. 界面文字修改

| 文件 | 修改内容 |
|------|----------|
| `src/renderer/src/i18n/locales/zh-cn.json` | 替换所有 "Cherry Studio" 为 "河南经贸智能助手" |
| `src/renderer/src/config/env.ts` | APP_NAME 常量 |
| `src/renderer/*.html` | 窗口标题 |
| `src/main/apiServer/middleware/openapi.ts` | API 文档标题 |

### 3. 预置教育助手

新增文件：`resources/data/agents-hnjm.json`

| 分类 | 助手名称 | ID |
|------|----------|-----|
| 教师助手 | 📚 备课助手 | hnjm-teacher-lesson |
| | 📝 出题助手 | hnjm-teacher-exam |
| | ✅ 批改助手 | hnjm-teacher-review |
| | 🔬 教研助手 | hnjm-teacher-research |
| 学生助手 | 🎓 学习辅导 | hnjm-student-tutor |
| | 📖 作业助手 | hnjm-student-homework |
| | 🎯 职业规划 | hnjm-student-career |
| | 🔧 技能助手 | hnjm-student-skill |
| 行政助手 | 📄 公文写作 | hnjm-admin-document |
| | 🗓️ 会议助手 | hnjm-admin-meeting |
| | 📊 数据统计 | hnjm-admin-data |
| 通用助手 | 💬 智能问答 | hnjm-general |
| | 🌐 翻译助手 | hnjm-translate |
| | ✍️ 写作助手 | hnjm-writing |

助手加载逻辑修改：`src/renderer/src/pages/store/assistants/presets/index.ts`

### 4. 功能精简

#### 侧边栏隐藏功能

文件：`src/renderer/src/config/sidebar.ts`

| 功能 | 状态 |
|------|------|
| assistants (AI助手) | ✅ 保留 |
| store (助手商店) | ✅ 保留 |
| translate (翻译) | ✅ 保留 |
| knowledge (知识库) | ✅ 保留 |
| files (文件) | ✅ 保留 |
| notes (笔记) | ✅ 保留 |
| paintings (绘图) | ❌ 隐藏 |
| minapp (Mini程序) | ❌ 隐藏 |
| code_tools (代码工具) | ❌ 隐藏 |

#### 设置页面精简

文件：`src/renderer/src/pages/settings/SettingsPage.tsx`

| 设置项 | 状态 |
|--------|------|
| 模型服务商 | ✅ 保留 |
| 模型管理 | ✅ 保留 |
| 通用设置 | ✅ 保留 |
| 显示设置 | ✅ 保留 |
| 数据管理 | ✅ 保留 |
| MCP 插件 | ✅ 保留 |
| 网络搜索 | ✅ 保留 |
| 记忆功能 | ✅ 保留 |
| 文档处理 | ✅ 保留 |
| 快捷短语 | ✅ 保留 |
| 快捷键 | ✅ 保留 |
| 关于 | ✅ 保留 |
| API 服务器 | ❌ 隐藏 |
| 快捷助手 | ❌ 隐藏 |
| 划词助手 | ❌ 隐藏 |

### 5. 关于页面

文件：`src/renderer/src/pages/settings/AboutSettings.tsx`

| 修改项 | 内容 |
|--------|------|
| 应用描述 | 河南经济贸易技师学院智能助手平台 |
| 联系邮箱 | admin@yjgj.cn |
| 官网链接 | https://www.yjgj.cn |
| 版权声明 | © 2024 河南经济贸易技师学院 |

移除的链接：
- GitHub 仓库
- 帮助文档
- 更新日志
- 问题反馈
- 企业版

### 6. CI/CD 配置

文件：`.github/workflows/release.yml`

| 修改项 | 说明 |
|--------|------|
| macOS 签名 | 禁用 (CSC_IDENTITY_AUTO_DISCOVERY: false) |
| 环境变量 | 移除不需要的 secrets |

---

## 二、修改文件清单

```
build/
└── logo.png                          # 应用图标

package.json                          # 应用信息
electron-builder.yml                  # 打包配置

src/main/
├── index.ts                          # 应用ID
├── services/ProtocolClient.ts        # 协议配置
└── apiServer/
    ├── app.ts                        # API 名称
    └── middleware/openapi.ts         # API 文档

src/renderer/
├── index.html                        # 窗口标题
├── miniWindow.html
├── selectionAction.html
├── selectionToolbar.html
└── src/
    ├── config/
    │   ├── env.ts                    # APP_NAME
    │   └── sidebar.ts                # 侧边栏配置
    ├── i18n/locales/zh-cn.json       # 中文语言包
    ├── pages/settings/
    │   ├── SettingsPage.tsx          # 设置页面
    │   └── AboutSettings.tsx         # 关于页面
    ├── pages/store/assistants/presets/index.ts  # 助手加载
    ├── providers/WebSearchProvider/BaseWebSearchProvider.ts
    ├── components/ObsidianExportDialog.tsx
    └── utils/
        ├── export.ts
        └── oauth.ts

resources/data/
└── agents-hnjm.json                  # 教育助手配置

.github/workflows/
└── release.yml                       # 打包工作流

docs/
├── HNJM_CUSTOMIZATION_GUIDE.md       # 定制指南
└── HNJM_CUSTOMIZATION_DOC.md         # 本文档
```

---

## 三、Git 提交记录

```
feat: 品牌定制 - 河南经贸智能助手
feat: 添加河南经贸教育类专用 AI 助手
feat: 精简功能模块，适配教育场景
feat: 修改关于页面
docs: 更新 README 为河南经贸智能助手文档
ci: 禁用 macOS 代码签名，简化构建配置
docs: 添加河南经贸技师学院 AI 平台定制指南
```

---

## 四、打包与发布

### 自动打包

推送 tag 触发 GitHub Actions 自动打包：

```bash
git tag v1.0.0
git push hnjm v1.0.0
```

### 产物列表

| 平台 | 文件名 |
|------|--------|
| Windows x64 | 河南经贸智能助手-1.0.0-x64-setup.exe |
| Windows arm64 | 河南经贸智能助手-1.0.0-arm64-setup.exe |
| macOS arm64 | 河南经贸智能助手-1.0.0-arm64.dmg |
| macOS x64 | 河南经贸智能助手-1.0.0-x64.dmg |
| Linux x64 | 河南经贸智能助手-1.0.0-x64.AppImage |
| Linux arm64 | 河南经贸智能助手-1.0.0-arm64.AppImage |

### 发布地址

https://github.com/houcong/hnjm-inteligence/releases

---

## 五、后续维护

### 版本更新

1. 修改 `package.json` 中的 version
2. 创建新 tag 并推送
3. GitHub Actions 自动打包发布

### 同步上游更新

```bash
# 添加上游仓库
git remote add upstream https://github.com/CherryHQ/cherry-studio.git

# 获取上游更新
git fetch upstream

# 合并更新（注意解决冲突）
git merge upstream/main
```

### 注意事项

1. 合并上游更新时注意保留定制内容
2. 关注上游安全更新
3. 定期备份定制配置

---

## 六、联系方式

- 项目仓库：https://github.com/houcong/hnjm-inteligence
- 技术支持：admin@yjgj.cn
- 学院官网：https://www.yjgj.cn

---

*文档版本: 1.0*
*创建日期: 2024-12-23*
