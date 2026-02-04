// ==========================================
// Loading Screen
// ==========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navItems = navLinks.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        }
    });
}

// ==========================================
// Back to Top Button
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard support (Enter key)
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 创建电竞产业趋势图表 - 优化版
function createEsportsChart() {
    const ctx = document.getElementById('esportsChart');
    if (!ctx) {
        console.warn('Chart canvas not found: esportsChart');
        return;
    }

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        return;
    }

    try {
        const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
        const revenue = [238.5, 254.3, 267.8, 275.7, 283.9, 293.31];
        const users = [4.44, 4.59, 4.72, 4.82, 4.89, 4.95];

        // 创建渐变色
        const revenueGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        revenueGradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        revenueGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
        revenueGradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

        const usersGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        usersGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
        usersGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.2)');
        usersGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: '产业收入',
                    data: revenue,
                    borderColor: '#6366f1',
                    backgroundColor: revenueGradient,
                    borderWidth: 4,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#6366f1',
                    pointHoverBorderWidth: 4,
                    yAxisID: 'y',
                    order: 1
                },
                {
                    label: '用户规模',
                    data: users,
                    borderColor: '#10b981',
                    backgroundColor: usersGradient,
                    borderWidth: 4,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#10b981',
                    pointHoverBorderWidth: 4,
                    yAxisID: 'y1',
                    order: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 25,
                        font: {
                            size: 15,
                            family: "'Inter', 'Noto Sans SC', sans-serif",
                            weight: '700'
                        },
                        color: 'rgba(255, 255, 255, 0.95)',
                        boxWidth: 12,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(17, 24, 39, 0.98)',
                    padding: 20,
                    titleFont: {
                        size: 16,
                        weight: '700',
                        family: "'Inter', 'Noto Sans SC', sans-serif"
                    },
                    bodyFont: {
                        size: 14,
                        weight: '600',
                        family: "'Inter', 'Noto Sans SC', sans-serif"
                    },
                    cornerRadius: 16,
                    displayColors: true,
                    boxPadding: 10,
                    boxWidth: 20,
                    boxHeight: 20,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 2,
                    caretSize: 8,
                    caretPadding: 10,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label}年`;
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.datasetIndex === 0) {
                                    label += context.parsed.y + ' 亿元';
                                    const prevValue = context.dataIndex > 0 ? revenue[context.dataIndex - 1] : revenue[0];
                                    const growth = ((context.parsed.y - prevValue) / prevValue * 100).toFixed(2);
                                    if (context.dataIndex > 0) {
                                        label += ` (${growth > 0 ? '+' : ''}${growth}%)`;
                                    }
                                } else {
                                    label += context.parsed.y + ' 亿人';
                                    const prevValue = context.dataIndex > 0 ? users[context.dataIndex - 1] : users[0];
                                    const growth = ((context.parsed.y - prevValue) / prevValue * 100).toFixed(2);
                                    if (context.dataIndex > 0) {
                                        label += ` (${growth > 0 ? '+' : ''}${growth}%)`;
                                    }
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '产业收入 (亿元)',
                        font: {
                            size: 14,
                            family: "'Inter', 'Noto Sans SC', sans-serif",
                            weight: '700'
                        },
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: {top: 0, bottom: 10}
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 10,
                        callback: function(value) {
                            return value + '亿';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)',
                        drawBorder: false,
                        lineWidth: 1
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '用户规模 (亿人)',
                        font: {
                            size: 14,
                            family: "'Inter', 'Noto Sans SC', sans-serif",
                            weight: '700'
                        },
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: {top: 0, bottom: 10}
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 10,
                        callback: function(value) {
                            return value + '亿';
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: {
                            size: 14,
                            weight: '700'
                        },
                        padding: 10
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                        lineWidth: 1
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    } catch (error) {
        console.error('Error creating esports chart:', error);
    }
}

// 创建投资成本分解图表 - 优化版（无图例）
function createInvestmentChart() {
    const ctx = document.getElementById('investmentChart');
    if (!ctx) {
        console.warn('Chart canvas not found: investmentChart');
        return;
    }

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        return;
    }

    try {
        const investmentData = {
        labels: ['电竞设备投入', '加盟成本', '装修投入', '其他费用'],
        data: [35.64, 8.8, 5.88, 0.35],
        colors: [
            '#6366f1', // 紫色 - 电竞设备（最大投入）
            '#f59e0b', // 橙色 - 加盟成本
            '#10b981', // 绿色 - 装修投入
            '#8b5cf6'  // 淡紫 - 其他费用
        ],
        descriptions: [
            '设备28台+服务器+外设',
            '加盟费+设计费+指导费',
            '弱电改造+主题房+前台',
            'OTA铺排+串流系统'
        ]
    };

    // 计算百分比
    const total = investmentData.data.reduce((a, b) => a + b, 0);
    const percentages = investmentData.data.map(val => ((val / total) * 100).toFixed(1));

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: investmentData.labels,
            datasets: [{
                data: investmentData.data,
                backgroundColor: investmentData.colors.map(color => color + '30'),
                borderColor: investmentData.colors,
                borderWidth: 4,
                hoverOffset: 20,
                hoverBorderWidth: 5,
                spacing: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 20
            },
            plugins: {
                legend: {
                    display: false // 隐藏默认图例
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(17, 24, 39, 0.98)',
                    padding: 20,
                    titleFont: {
                        size: 16,
                        weight: '700',
                        family: "'Inter', 'Noto Sans SC', sans-serif"
                    },
                    bodyFont: {
                        size: 14,
                        weight: '500',
                        family: "'Inter', 'Noto Sans SC', sans-serif",
                        lineHeight: 1.8
                    },
                    footerFont: {
                        size: 13,
                        weight: '600',
                        family: "'Inter', 'Noto Sans SC', sans-serif"
                    },
                    cornerRadius: 16,
                    displayColors: true,
                    boxPadding: 10,
                    boxWidth: 20,
                    boxHeight: 20,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 2,
                    caretSize: 8,
                    caretPadding: 10,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const value = context.parsed;
                            const percentage = percentages[context.dataIndex];
                            const desc = investmentData.descriptions[context.dataIndex];
                            return [
                                `投资金额: ${value}万元`,
                                `占比: ${percentage}%`,
                                `说明: ${desc}`
                            ];
                        },
                        footer: function(context) {
                            return `\n总投资: ${total.toFixed(2)}万元`;
                        }
                    }
                }
            },
            cutout: '65%',
            radius: '90%',
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                ctx.restore();

                const centerX = width / 2;
                const centerY = height / 2;

                // 绘制中心文字 - 总金额
                ctx.font = `900 ${Math.min(width, height) / 8}px 'Inter', sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                ctx.fillText(`${total.toFixed(2)}`, centerX, centerY - 20);

                // 绘制单位
                ctx.font = `600 ${Math.min(width, height) / 16}px 'Inter', sans-serif`;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillText('万元', centerX, centerY + 20);

                // 绘制标签
                ctx.font = `500 ${Math.min(width, height) / 20}px 'Inter', sans-serif`;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fillText('总投资', centerX, centerY + 50);

                ctx.save();
            }
        }]
    });
    } catch (error) {
        console.error('Error creating investment chart:', error);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Chart.js to load before creating charts
    if (typeof Chart !== 'undefined') {
        createEsportsChart();
        createInvestmentChart();
    } else {
        console.warn('Chart.js not loaded yet, retrying...');
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                createEsportsChart();
                createInvestmentChart();
            } else {
                console.error('Failed to load Chart.js library');
            }
        }, 1000);
    }
    
    createParticles();
    
    // Initialize calculator
    if (typeof calculate === 'function') {
        calculate();
    }
});

// 创建漂浮粒子效果
// 创建闪烁的漂浮粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.warn('Particles container not found');
        return;
    }
    
    const particleCount = 60; // 增加粒子数量
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机大小 (2-5px)
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机水平位置
        particle.style.left = `${Math.random() * 100}%`;
        
        // 随机动画时长 (15-30秒)
        const duration = Math.random() * 15 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // 随机延迟
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    console.log(`Created ${particleCount} twinkling particles`);
}

// 鼠标移动视差效果
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    const glowOrbs = document.querySelectorAll('.glow-orb');
    glowOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 观察器用于触发滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.stat-card, .esports-card, .chart-card, .financial-table-wrapper').forEach(el => {
    observer.observe(el);
});

// 数字递增动画
function animateValue(element, start, end, duration, decimals = 2) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        element.textContent = value.toFixed(decimals);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 为统计数字添加递增动画
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const number = entry.target;
            const targetValue = parseFloat(number.textContent.replace(',', ''));
            const decimals = number.textContent.includes('.') ? 2 : 0;
            animateValue(number, 0, targetValue, 2000, decimals);
        }
    });
}, { threshold: 0.5 });

// 观察所有数字元素
setTimeout(() => {
    document.querySelectorAll('.stat-number, .esports-number').forEach(el => {
        statObserver.observe(el);
    });
}, 500);

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 滚动到顶部
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('%c电竞酒店可行性研究报告 %c已加载完成 ✓', 
    'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 8px 16px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #10b981; color: white; padding: 8px 16px; border-radius: 0 4px 4px 0; font-weight: bold;'
);

// ==========================================
// 财务计算器功能
// ==========================================

// 默认值（滴灌通投资模型）
const defaultValues = {
    roomCount: 16,
    occupancyRate: 93,
    avgPrice: 280,
    profitShareRate: 30,
    deviceCount: 28,
    equipmentCost: 35.64,
    operatingPeriod: 60,
    expectedReturn: 18
};

// 计算财务指标
function calculate() {
    // 第一部分：核心输入
    const roomCount = parseFloat(document.getElementById('roomCount')?.value || 0);
    const occupancyRate = parseFloat(document.getElementById('occupancyRate')?.value || 0) / 100;
    const avgPrice = parseFloat(document.getElementById('avgPrice')?.value || 0);
    const profitShareRate = parseFloat(document.getElementById('profitShareRate')?.value || 0) / 100;
    
    // 第二部分：设备投资
    const deviceCount = parseFloat(document.getElementById('deviceCount')?.value || 0);
    const equipmentCost = parseFloat(document.getElementById('equipmentCost')?.value || 0); // 万元
    
    // 第三部分：投资核心指标参数
    const operatingPeriodMonths = parseFloat(document.getElementById('operatingPeriod')?.value || 60);
    const annualReturn = parseFloat(document.getElementById('expectedReturn')?.value || 18) / 100;
    
    // 计算月收益率（从年收益率转换）
    const monthlyReturn = annualReturn / 12;
    
    // 计算 PCF（滴灌通分成预期现金流）- 元/天
    // PCF = 房间数量 × 入住率 × 平均房价 × 分成比例
    const pcfDaily = roomCount * occupancyRate * avgPrice * profitShareRate;
    
    // 计算月PCF（元/月）
    const pcfMonthly = pcfDaily * 30;
    
    // 计算电竞设备平均价格（元/台）
    // 将万元转换为元
    const equipmentCostYuan = equipmentCost * 10000;
    const avgEquipmentPrice = deviceCount > 0 ? equipmentCostYuan / deviceCount : 0;
    
    // 计算总投资额（万元）
    const totalInvestment = equipmentCost;
    const totalInvestmentYuan = totalInvestment * 10000; // 转换为元
    
    // === 投资核心指标计算 ===
    
    // 1. ROI（绝对投资回报率）
    // ROI = (月PCF × 预计联营期限(月) / 总投资额 - 1) × 100%
    const totalReturn = pcfMonthly * operatingPeriodMonths; // 总回报（元）
    const roi = totalInvestmentYuan > 0 ? ((totalReturn / totalInvestmentYuan - 1) * 100) : 0;
    
    // 2. IRR（内部回报率）- 使用牛顿迭代法，按月计算
    // NPV = -总投资额 + Σ(月PCF / (1+月IRR)^t) = 0
    const irrMonthly = calculateIRR(totalInvestmentYuan, pcfMonthly, operatingPeriodMonths);
    // 将月IRR转换为年化IRR: (1 + 月IRR)^12 - 1
    const irrAnnual = ((Math.pow(1 + irrMonthly / 100, 12) - 1) * 100);
    
    // 3. YITO公式计算期限T（月）
    // 月PCF × T = 总投资额 × (1 + 月r × T)
    // 月PCF × T = 总投资额 + 总投资额 × 月r × T
    // 月PCF × T - 总投资额 × 月r × T = 总投资额
    // T × (月PCF - 总投资额 × 月r) = 总投资额
    // T = 总投资额 / (月PCF - 总投资额 × 月r)
    const yitoPeriodMonths = (pcfMonthly - totalInvestmentYuan * monthlyReturn) > 0 
        ? totalInvestmentYuan / (pcfMonthly - totalInvestmentYuan * monthlyReturn)
        : 0;
    
    // 调试输出
    console.log('=== 滴灌通投资模型 ===');
    console.log('第一部分：核心输入估计PCF');
    console.log('- 房间数量:', roomCount, '间');
    console.log('- 入住率:', (occupancyRate * 100).toFixed(2), '%');
    console.log('- 平均房价:', avgPrice, '元/间/天');
    console.log('- 分成比例:', (profitShareRate * 100).toFixed(2), '%');
    console.log('- PCF(日):', pcfDaily.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}), '元/天');
    console.log('- PCF(月):', pcfMonthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}), '元/月');
    console.log('');
    console.log('第二部分：设备投资');
    console.log('- 电竞设备数量:', deviceCount, '台');
    console.log('- 电竞设备投入:', equipmentCost, '万元');
    console.log('- 电竞设备平均价格:', Math.round(avgEquipmentPrice).toLocaleString('en-US'), '元/台');
    console.log('- 总投资额:', totalInvestment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}), '万元');
    console.log('');
    console.log('第三部分：投资核心指标');
    console.log('- 预计联营期限:', operatingPeriodMonths, '月');
    console.log('- 预期年收益率:', (annualReturn * 100).toFixed(2), '%');
    console.log('- 预期月收益率:', (monthlyReturn * 100).toFixed(4), '%');
    console.log('- ROI:', roi.toFixed(2), '%');
    console.log('- IRR(月):', irrMonthly.toFixed(2), '%');
    console.log('- IRR(年化):', irrAnnual.toFixed(2), '%');
    console.log('- YITO期限:', yitoPeriodMonths.toFixed(2), '月');
    
    // 更新显示（使用千分位格式）
    updateDisplay({
        pcfResult: formatNumberWithDecimals(pcfDaily, 2),
        avgEquipmentPrice: formatNumber(Math.round(avgEquipmentPrice)),
        totalInvestment2: formatNumberWithDecimals(totalInvestment, 2),
        roiResult: formatNumberWithDecimals(roi, 2),
        irrResult: formatNumberWithDecimals(irrAnnual, 2),
        yitoResult: formatNumberWithDecimals(yitoPeriodMonths, 2)
    });
}

// 计算IRR（内部回报率）使用牛顿迭代法
function calculateIRR(initialInvestment, annualCashFlow, periods) {
    // 初始猜测值
    let irr = 0.1; // 10%
    const maxIterations = 100;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
        let npv = -initialInvestment;
        let derivative = 0;
        
        // 计算NPV和导数
        for (let t = 1; t <= periods; t++) {
            const factor = Math.pow(1 + irr, t);
            npv += annualCashFlow / factor;
            derivative -= t * annualCashFlow / Math.pow(1 + irr, t + 1);
        }
        
        // 牛顿迭代
        const irrNew = irr - npv / derivative;
        
        // 检查收敛
        if (Math.abs(irrNew - irr) < tolerance) {
            return irrNew * 100; // 转换为百分比
        }
        
        irr = irrNew;
        
        // 防止负值或极端值
        if (irr < -0.99) irr = -0.99;
        if (irr > 10) irr = 10;
    }
    
    return irr * 100; // 转换为百分比
}

// 格式化数字，添加千分位（整数）
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// 格式化数字，添加千分位和指定小数位数
function formatNumberWithDecimals(num, decimals) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// 更新显示
function updateDisplay(values) {
    // 更新第一部分计算结果
    const pcfElement = document.getElementById('pcfResult');
    if (pcfElement) {
        pcfElement.textContent = values.pcfResult;
    }
    
    // 更新第二部分计算结果
    const avgPriceElement = document.getElementById('avgEquipmentPrice');
    if (avgPriceElement) {
        avgPriceElement.textContent = values.avgEquipmentPrice;
    }
    
    const totalInvElement = document.getElementById('totalInvestment2');
    if (totalInvElement) {
        totalInvElement.textContent = values.totalInvestment2;
    }
    
    // 更新第三部分投资核心指标
    const roiElement = document.getElementById('roiResult');
    if (roiElement) {
        roiElement.textContent = values.roiResult;
    }
    
    const irrElement = document.getElementById('irrResult');
    if (irrElement) {
        irrElement.textContent = values.irrResult;
    }
    
    const yitoElement = document.getElementById('yitoResult');
    if (yitoElement) {
        yitoElement.textContent = values.yitoResult;
    }
}

// 重置为默认值
function resetCalculator() {
    Object.keys(defaultValues).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = defaultValues[key];
        }
    });
    calculate();
    
    // 添加重置动画
    const calculator = document.querySelector('.calculator-section');
    calculator.style.animation = 'none';
    setTimeout(() => {
        calculator.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// 页面加载时初始化计算
window.addEventListener('DOMContentLoaded', () => {
    calculate();
});