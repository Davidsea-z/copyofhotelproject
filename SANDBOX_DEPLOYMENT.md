# 电竞酒店研究报告 - 沙盒部署信息

## 项目概述
- **名称**: 电竞酒店行业可行性研究报告展示系统
- **类型**: 纯静态HTML展示网站
- **来源**: https://github.com/Davidsea-z/copyofhotelproject.git

## 在线访问地址

### 🌐 沙盒预览地址（当前可用）
**URL**: https://3000-inwe0negpfvutuwhv4fmz-2e77fc33.sandbox.novita.ai

### 📱 原始部署地址
- **GitHub Pages**: https://davidsea-z.github.io/copyofhotelproject
- **Cloudflare Pages**: https://gamehotelmodel.pages.dev

## 项目特性

### 📊 主要内容
1. **酒店业基本面数据**
   - 门店总数：34.9万家
   - GOP率：36.2%
   - 客房规模：1,764万间
   - 平均房价：373.2元
   - 营业额：5,314亿元
   - 出租率：49.5%

2. **电竞产业数据**
   - 销售收入：293.31亿元（+6.40%）
   - 用户规模：4.95亿人（+1.06%）
   - 产业趋势图：2020-2025年收入与用户双轴折线图
   - 投资分解图：成本结构环形图

3. **完整财务模型**
   - 回本周期：15.07个月
   - 一次性投入：50.67万元
   - 年营收：136.87万元
   - 年利润：40.36万元

### 🎨 技术特色
- **设计系统**: 现代化UI + 渐变 + 毛玻璃效果
- **数据可视化**: Chart.js + 交互式图表
- **响应式设计**: 桌面/平板/手机完美适配
- **CDN技术**: Tailwind CSS + Google Fonts

## 本地服务信息

### PM2 服务管理
```bash
# 查看服务状态
pm2 list

# 查看日志
pm2 logs hotel-report --nostream

# 重启服务
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart hotel-report

# 停止服务
pm2 stop hotel-report

# 删除服务
pm2 delete hotel-report
```

### 项目结构
```
webapp/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   └── main.js            # 交互脚本
├── ecosystem.config.cjs    # PM2配置
├── package.json           # 依赖配置
├── README.md              # 原始项目文档
└── SANDBOX_DEPLOYMENT.md  # 本文档
```

### 服务配置
- **端口**: 3000
- **服务名**: hotel-report
- **运行环境**: Cloudflare Pages Dev (Wrangler)
- **进程管理**: PM2

## 数据来源
- **酒店业数据**: 毕马威《2025年中国酒店业的韧性之路》
- **电竞产业数据**: 腾讯电竞、行业研究报告
- **财务模型**: XX店投资分成模式真实案例

## 浏览器兼容性
| 浏览器 | 最低版本 | 状态 |
|--------|---------|------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

## 部署状态
- ✅ **沙盒部署**: 已完成
- ✅ **服务运行**: 正常
- ✅ **公共访问**: 已开启
- ⏰ **沙盒生命周期**: 1小时（自动延长）

## 更新时间
- **部署时间**: 2026-02-04
- **最后更新**: 2026-02-04 15:00 (UTC+8)

---

**🎉 享受您的电竞酒店研究报告展示系统！**
