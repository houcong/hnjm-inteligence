import type { SidebarIcon } from '@renderer/types'

/**
 * 默认显示的侧边栏图标
 * 河南经贸智能助手 - 精简版功能
 */
export const DEFAULT_SIDEBAR_ICONS: SidebarIcon[] = [
  'assistants', // AI 助手（核心功能）
  'store', // 助手商店
  'translate', // 翻译功能
  'knowledge', // 知识库
  'files', // 文件管理
  'notes' // 笔记功能
  // 'paintings',   // 绘图功能（已隐藏）
  // 'minapp',      // Mini程序（已隐藏）
  // 'code_tools',  // 代码工具（已隐藏）
]

/**
 * 必须显示的侧边栏图标（不能被隐藏）
 * 这些图标必须始终在侧边栏中可见
 */
export const REQUIRED_SIDEBAR_ICONS: SidebarIcon[] = ['assistants']
