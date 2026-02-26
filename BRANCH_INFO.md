# 🌿 分支信息

## 当前分支
**分支名称**: `feature/v2.2-investment-tools`  
**创建时间**: 2026-02-26  
**基于**: `main` 分支  

## 分支用途
此分支用于开发和维护 v2.2 版本的新功能：
- 内部投资方案评估系统
- 储备项目智能筛选器

## ⚠️ 重要规则

### ✅ 必须遵守
1. **所有后续改动都在此分支上进行**
2. **不要切换回 main 分支进行开发工作**
3. **每次修改后都要提交到此分支**
4. **功能完成并测试通过后，再合并到 main**

### 🔒 分支保护
```bash
# 始终确认当前在正确的分支上
git branch --show-current
# 应该显示: feature/v2.2-investment-tools

# 如果不小心切换到了其他分支，立即切换回来
git checkout feature/v2.2-investment-tools
```

## 📦 已包含的提交

### Commit 1: 核心功能实现
```
d5a6dc8 - feat: 添加内部投资方案评估系统和储备项目筛选器
- 新增内部投资方案评估模块，支持多方案对比
- 实现综合评分系统（ROI、回本周期、风险、市场成熟度）
- 添加储备项目智能筛选功能，支持多维度筛选
- 集成Chart.js可视化图表（柱状图、饼图、散点图）
- 响应式设计，支持移动端和桌面端
```

### Commit 2: 功能说明文档
```
8495070 - docs: 添加v2.2版本新功能详细说明文档
- 新增 NEW_FEATURES_V2.2.md（4.7KB）
- 包含完整的功能说明、使用场景、技术实现
```

### Commit 3: 快速上手指南
```
4608a2d - docs: 添加v2.2快速上手指南
- 新增 QUICK_START_V2.2.md（2.5KB）
- 包含快速使用步骤、评分算法说明、使用技巧
```

### Commit 4: GitHub推送指南
```
7ad6f3c - docs: 添加GitHub推送指南文档
- 新增 github_push_instructions.txt
- 包含推送到远程仓库的详细步骤
```

## 🚀 推送到GitHub

### 首次推送（需要GitHub授权）
```bash
# 方法1: 通过界面授权
1. 访问 #github 标签页
2. 完成GitHub授权
3. 执行推送命令

# 方法2: 推送命令
cd /home/user/webapp
git push -u origin feature/v2.2-investment-tools
```

### 后续推送
```bash
git push origin feature/v2.2-investment-tools
# 或简写为
git push
```

## 🔄 工作流程

### 日常开发
```bash
# 1. 确认在正确分支
git branch --show-current

# 2. 进行开发工作
# （编辑文件...）

# 3. 查看修改
git status

# 4. 提交修改
git add .
git commit -m "类型: 简短描述"

# 5. 推送到远程
git push
```

### 提交信息规范
- `feat:` - 新功能
- `fix:` - 修复bug
- `docs:` - 文档更新
- `style:` - 样式调整
- `refactor:` - 重构代码
- `test:` - 测试相关
- `chore:` - 构建/工具相关

## 📊 分支统计

**文件修改**:
- ✅ `index.html` - 新增约250行（2个section）
- ✅ `css/style.css` - 新增约700行（完整样式系统）
- ✅ `js/main.js` - 新增约550行（交互逻辑）
- ✅ `README.md` - 更新版本日志

**新增文件**:
- ✅ `NEW_FEATURES_V2.2.md` - 功能详细说明
- ✅ `QUICK_START_V2.2.md` - 快速上手指南
- ✅ `github_push_instructions.txt` - GitHub推送指南
- ✅ `BRANCH_INFO.md` - 本文件

**代码统计**: 约2050行新增代码和文档

## 🎯 下一步计划

### 待完成任务
- [ ] 推送分支到GitHub远程仓库
- [ ] 创建Pull Request（可选）
- [ ] 代码审查和测试
- [ ] 合并到main分支
- [ ] 部署到生产环境

### 后续开发
所有新的改动都应该：
1. 在此分支上进行
2. 提交清晰的commit message
3. 定期推送到远程
4. 保持与main分支的同步（如有必要）

## 📞 需要帮助？

如果遇到分支相关问题：
```bash
# 查看所有分支
git branch -a

# 查看当前分支
git branch --show-current

# 切换回此分支
git checkout feature/v2.2-investment-tools

# 查看分支差异
git diff main feature/v2.2-investment-tools
```

---

**记住**: 始终在 `feature/v2.2-investment-tools` 分支上工作！🌿
