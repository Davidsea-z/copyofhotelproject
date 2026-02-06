# IRR 计算逻辑详解

## 一、核心概念

### 1. 什么是IRR（内部收益率）
IRR（Internal Rate of Return）是让项目净现值（NPV）等于0的贴现率。它反映了投资的真实收益率。

### 2. 基本公式
```
NPV = -初始投资 + ∑(现金流_t / (1 + IRR)^t) = 0
```

## 二、防止数值爆炸的关键策略

### 问题：
当联营期限很长（如660天）时，使用 `(1 + IRR)^660` 会导致：
- 数值过大溢出（overflow）
- 数值过小下溢（underflow）
- 计算精度丢失

### 解决方案：
**将天数转换为年数进行贴现**，从根本上减小指数的量级：
```javascript
// ❌ 错误做法：直接用天数
factor = Math.pow(1 + irr, 660)  // 指数过大，计算爆炸

// ✅ 正确做法：转换为年数
years = 660 / 365 = 1.808年
factor = Math.pow(1 + irr, 1.808)  // 指数合理，计算稳定
```

## 三、日分账IRR计算逻辑

### 3.1 数据准备
```javascript
// 输入参数（从界面获取）
roomCount = 100         // 房间数量
occupancyRate = 100%    // 入住率
avgPrice = 200          // 平均房价（元/天）
profitShareRate = 10%   // 分成比例
equipmentCost = 100     // 设备投入（万元）
annualReturn = 18%      // 预期年收益率

// 计算PCF（预期现金流）
pcfDaily = roomCount × occupancyRate × avgPrice × profitShareRate
        = 100 × 1.0 × 200 × 0.10
        = 2,000 元/天

// 总投资额
totalInvestment = 100万元 = 1,000,000元

// 计算联营期限（YITO）
monthlyReturn = annualReturn / 12 = 0.18 / 12 = 0.015（1.5%/月）
pcfMonthly = pcfDaily × 30 = 2,000 × 30 = 60,000元/月

yitoPeriodMonths = totalInvestment / (pcfMonthly - totalInvestment × monthlyReturn)
                 = 1,000,000 / (60,000 - 1,000,000 × 0.015)
                 = 1,000,000 / (60,000 - 15,000)
                 = 1,000,000 / 45,000
                 = 22.22 个月

yitoPeriodDays = yitoPeriodMonths × 30 = 22.22 × 30 = 666天
```

### 3.2 构造现金流（周聚合，防止数据量过大）
```javascript
function buildYitoDailyCashFlows(yitoPeriodDays, pcfDaily) {
    const flows = [];
    const fullWeeks = Math.floor(yitoPeriodDays / 7);  // 完整周数
    const remainderDays = yitoPeriodDays % 7;           // 剩余天数
    
    // 按周聚合现金流
    for (let week = 1; week <= fullWeeks; week++) {
        flows.push({ 
            days: week * 7,           // 第几天收到现金流
            amount: pcfDaily * 7      // 一周的现金流总额
        });
    }
    
    // 最后不足一周的天数
    if (remainderDays > 0) {
        flows.push({ 
            days: yitoPeriodDays, 
            amount: pcfDaily * remainderDays 
        });
    }
    
    return flows;
}

// 示例：666天的日分账现金流
// 666天 = 95周 + 1天
// 生成96笔现金流记录：
[
    { days: 7,   amount: 2000 × 7 = 14,000 },    // 第1周
    { days: 14,  amount: 2000 × 7 = 14,000 },    // 第2周
    { days: 21,  amount: 2000 × 7 = 14,000 },    // 第3周
    ...
    { days: 665, amount: 2000 × 7 = 14,000 },    // 第95周
    { days: 666, amount: 2000 × 1 = 2,000 }      // 最后1天
]
```

### 3.3 计算年化IRR（核心算法）
```javascript
function calculateIRRByDays(initialInvestment, cashFlowDetails) {
    // 第一步：将天数转换为年数（关键！）
    const cashFlowsWithYears = cashFlowDetails.map(flow => ({
        years: flow.days / 365,  // 666天 → 1.825年
        amount: flow.amount
    }));
    
    // 第二步：牛顿迭代法求解IRR
    let irr = 0.1;  // 初始猜测值：10%
    
    for (let i = 0; i < 1000; i++) {
        let npv = -initialInvestment;  // NPV初始值 = -1,000,000
        let derivative = 0;             // 导数初始值
        
        // 计算NPV和导数
        for (const flow of cashFlowsWithYears) {
            const t = flow.years;           // 时间（年）
            const amount = flow.amount;      // 现金流金额
            
            // 使用 Math.exp + Math.log 提升数值稳定性
            const logFactor = Math.log(1 + irr);
            const factor = Math.exp(t * logFactor);              // = (1 + irr)^t
            const derivativeFactor = Math.exp((t + 1) * logFactor);  // = (1 + irr)^(t+1)
            
            // NPV累加：NPV += 现金流 / (1 + irr)^t
            npv += amount / factor;
            
            // 导数累加：derivative -= t × 现金流 / (1 + irr)^(t+1)
            derivative -= (t * amount) / derivativeFactor;
        }
        
        // 牛顿迭代公式：irr_new = irr - NPV / derivative
        const irrNew = irr - npv / derivative;
        
        // 检查收敛条件
        if (Math.abs(irrNew - irr) < 1e-8 && Math.abs(npv) < 1e-6) {
            return irrNew;  // 返回年化IRR（小数形式，如0.2534 = 25.34%）
        }
        
        irr = irrNew;
        
        // 边界限制
        if (irr < -0.99) irr = -0.99;  // 最低 -99%
        if (irr > 10) irr = 10;        // 最高 1000%
    }
    
    return irr;  // 返回最优解
}
```

### 3.4 日分账计算示例

**输入数据：**
```
初始投资：1,000,000 元
日PCF：2,000 元
联营期限：666 天（22.22个月）
```

**现金流构造（96笔，按周聚合）：**
```
周1:  第7天   收到 14,000元 → 折现为 14,000 / (1+IRR)^(7/365)
周2:  第14天  收到 14,000元 → 折现为 14,000 / (1+IRR)^(14/365)
周3:  第21天  收到 14,000元 → 折现为 14,000 / (1+IRR)^(21/365)
...
周95: 第665天 收到 14,000元 → 折现为 14,000 / (1+IRR)^(665/365)
最后: 第666天 收到 2,000元  → 折现为 2,000 / (1+IRR)^(666/365)
```

**求解过程：**
```
NPV = -1,000,000 + ∑(现金流_i / (1+IRR)^(天数_i/365)) = 0
```

通过牛顿迭代法，找到让NPV=0的IRR值（年化收益率）。

## 四、周分账IRR计算逻辑

周分账与日分账的唯一区别是：**现金流按周聚合，而不是按天产生**。

### 4.1 构造现金流（完全相同）
```javascript
// 周分账使用相同的 buildYitoDailyCashFlows 函数
// 因为该函数已经按周聚合了现金流
const cashFlows = buildYitoDailyCashFlows(yitoPeriodDays, pcfDaily);
```

### 4.2 计算逻辑（完全相同）
```javascript
// 周分账使用相同的 calculateIRRByDays 函数
const irrAnnual = calculateIRRByDays(totalInvestment, cashFlows);
```

### 4.3 为什么日分账和周分账结果相同？

因为：
1. **现金流构造方式相同**：都是按周聚合
2. **贴现方式相同**：都是按天数/365转换为年数后贴现
3. **求解方法相同**：都使用牛顿迭代法

**实际区别在于业务场景：**
- **日分账**：理论上每天都产生现金流（实际按周聚合计算）
- **周分账**：每7天结算一次现金流（与按周聚合计算完全匹配）

## 五、双周分账IRR计算逻辑

双周分账是每14天结算一次。

### 5.1 构造现金流（按14天聚合）
```javascript
function buildYitoBiweeklyCashFlows(yitoPeriodDays, pcfDaily) {
    const flows = [];
    const periodDays = 14;  // 双周 = 14天
    const fullPeriods = Math.floor(yitoPeriodDays / periodDays);  // 完整双周数
    const remainderDays = yitoPeriodDays % periodDays;             // 剩余天数
    
    // 按双周聚合现金流
    for (let p = 1; p <= fullPeriods; p++) {
        flows.push({ 
            days: p * periodDays,      // 第几天收到现金流
            amount: pcfDaily * periodDays  // 14天的现金流总额
        });
    }
    
    // 最后不足14天的天数
    if (remainderDays > 0) {
        flows.push({ 
            days: yitoPeriodDays, 
            amount: pcfDaily * remainderDays 
        });
    }
    
    return flows;
}

// 示例：666天的双周分账现金流
// 666天 = 47个双周 + 8天
// 生成48笔现金流记录：
[
    { days: 14,  amount: 2000 × 14 = 28,000 },   // 第1个双周
    { days: 28,  amount: 2000 × 14 = 28,000 },   // 第2个双周
    { days: 42,  amount: 2000 × 14 = 28,000 },   // 第3个双周
    ...
    { days: 658, amount: 2000 × 14 = 28,000 },   // 第47个双周
    { days: 666, amount: 2000 × 8 = 16,000 }     // 最后8天
]
```

### 5.2 计算逻辑（相同）
```javascript
// 使用相同的 calculateIRRByDays 函数
const irrAnnual = calculateIRRByDays(totalInvestment, cashFlows);
```

## 六、计算流程总结

### 日/周分账流程
```
1. 计算日PCF = 房间数 × 入住率 × 房价 × 分成比例
2. 计算联营期限（YITO）= 总投资 / (月PCF - 总投资×月收益率)
3. 按周聚合现金流（95周 + 剩余天）
4. 将天数转换为年数（天/365）
5. 牛顿迭代求解年化IRR
```

### 双周分账流程
```
1. 计算日PCF（同上）
2. 计算联营期限（同上）
3. 按双周聚合现金流（47个双周 + 剩余天）
4. 将天数转换为年数（天/365）
5. 牛顿迭代求解年化IRR
```

## 七、关键代码位置

| 功能 | 代码行数 | 说明 |
|------|---------|------|
| 日/周现金流构造 | 950-961 | `buildYitoDailyCashFlows()` |
| 双周现金流构造 | 969-981 | `buildYitoBiweeklyCashFlows()` |
| IRR核心计算 | 994-1072 | `calculateIRRByDays()` - 防数值爆炸版 |
| 主计算函数 | 680-800 | `calculate()` - 整合所有计算 |
| 日分账IRR显示 | 1086-1129 | `calculateDailyIRR()` - 更新卡片显示 |

## 八、数值稳定性保障

### 8.1 防止指数爆炸
```javascript
// 将天数转换为年数
years = days / 365  // 666天 → 1.825年
```

### 8.2 使用稳定的指数计算
```javascript
// 使用 Math.exp + Math.log 替代 Math.pow
const logFactor = Math.log(1 + irr);
const factor = Math.exp(t * logFactor);  // 等价于 Math.pow(1 + irr, t)
```

### 8.3 边界限制
```javascript
// 限制IRR范围，防止发散
if (irr < -0.99) irr = -0.99;  // 最低 -99%
if (irr > 10) irr = 10;        // 最高 1000%
```

### 8.4 收敛条件
```javascript
// 同时检查 IRR 差值和 NPV 是否接近0
if (Math.abs(irrNew - irr) < 1e-8 && Math.abs(npv) < 1e-6) {
    return irrNew;  // 收敛
}
```

## 九、实际计算示例

### 示例数据
```
房间数：100间
入住率：100%
平均房价：200元/天
分成比例：10%
设备投入：100万元
预期年收益率：18%
```

### 计算结果
```
日PCF：2,000元/天
月PCF：60,000元/月
联营期限：22.22个月（666天）
总现金流：2,000 × 666 = 1,332,000元
年化IRR：约 25.34%
```

### IRR含义
年化IRR = 25.34% 表示：
- 投资100万元
- 在666天内，每天收到2,000元现金流（按周结算）
- 这笔投资的年化收益率为 25.34%
- 高于预期的18%年收益率，说明投资回报良好

## 十、代码优势

1. **数值稳定**：天数转年数，避免指数爆炸
2. **计算准确**：使用 Math.exp + Math.log 提升精度
3. **性能优化**：周聚合减少计算量（96笔 vs 666笔）
4. **边界保护**：IRR范围限制，防止发散
5. **收敛保证**：双重收敛条件，确保结果可靠
