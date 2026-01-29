/**
 * SI-OS Kernel v1.0 (LingZhu)
 * 端侧微前端神经中枢 | The Client-Side Micro-Frontend Neural Bus
 * Copyright 2026 TianSuan AI Lab
 */

const SIOS = {
    // === 1. 系统状态 ===
    state: {
        isReady: false,
        activeModules: new Set(), // 记录已挂载的模块
        memory: []                // 短期记忆池
    },

    // === 2. 模块注册表 (Module Registry) ===
    // 这里定义了“咒语”与“实体文件”的映射关系
    registry: {
        "literature": {
            path: "modules/arm_literature.js",
            keywords: ["小说", "故事", "剧本", "story", "novel", "write"],
            name: "NARRATIVE ARM"
        },
        "music": {
            path: "modules/arm_music.js",
            keywords: ["音乐", "bgm", "歌曲", "music", "sound", "audio"],
            name: "SONIC ARM"
        },
        "visual": {
            path: "modules/arm_visual.js",
            keywords: ["画面", "图片", "视频", "分镜", "visual", "video", "image"],
            name: "VISUAL ARM"
        }
    },

    // === 3. 初始化启动 ===
    init: function() {
        this.ui.log("SI-OS KERNEL INITIALIZED...", "sys");
        this.ui.log("AWAITING NEURAL INPUT...", "sys");
        this.state.isReady = true;
        
        // 绑定 UI 输入事件 (接管 index.html 的输入框)
        const input = document.getElementById('console-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleInput(e.target.value);
                e.target.value = ''; // 清空输入框
            }
        });
    },

    // === 4. 神经路由 (The Neural Router) ===
    // 分析用户说的话，决定唤醒哪只手臂
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

        // 简单的关键词匹配 (未来这里接入 Local LLM)
        let targetModule = null;
        
        for (let [key, config] of Object.entries(this.registry)) {
            if (config.keywords.some(k => text.toLowerCase().includes(k))) {
                targetModule = key;
                break;
            }
        }

        if (targetModule) {
            this.loadModule(targetModule, text);
        } else {
            // 如果没听懂
            setTimeout(() => {
                this.ui.log("指令模糊。请指定意图 (如: 创建故事 / 生成音乐 / 渲染画面)", "sys");
            }, 500);
        }
    },

    // === 5. 动态加载器 (The Loader) ===
    // 核心科技：按需通过网络抓取 JS 代码并注入大脑
    loadModule: function(moduleKey, payload) {
        const config = this.registry[moduleKey];

        // 如果模块已经加载过，直接调用
        if (this.state.activeModules.has(moduleKey)) {
            this.dispatchToModule(moduleKey, payload);
            return;
        }

        // 首次加载：动态创建 <script> 标签
        this.ui.log(`正在挂载 [${config.name}] ...`, "sys");
        
        const script = document.createElement('script');
        script.src = config.path;
        script.onload = () => {
            this.state.activeModules.add(moduleKey);
            this.ui.log(`[${config.name}] 挂载成功。神经连接建立。`, "sys");
            this.dispatchToModule(moduleKey, payload);
        };
        script.onerror = () => {
            this.ui.log(`错误：无法加载模块 [${config.name}]。请检查 modules/ 目录。`, "sys");
        };
        
        document.body.appendChild(script);
    },

    // === 6. 信号分发 (The Dispatcher) ===
    dispatchToModule: function(moduleKey, payload) {
        // 假设每个模块加载后，都会在 window 下暴露一个同名对象
        // 例如 arm_literature.js 会暴露 window.ArmLiterature
        const moduleName = "Arm" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        
        if (window[moduleName]) {
            window[moduleName].process(payload, this); // 把控制权交给模块
        } else {
            this.ui.log(`错误：模块 [${moduleKey}] 代码异常，未找到入口函数。`, "sys");
        }
    },

    // === 7. UI 接口 ===
    ui: {
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            const div = document.createElement('div');
            div.className = `log-entry log-${type}`;
            div.innerText = text;
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        }
    }
};

// 启动系统
window.onload = function() {
    // 确保 DOM 加载完后再启动
    setTimeout(() => {
        if(window.SIOS) SIOS.init();
    }, 1000);
};
