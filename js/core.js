/**
 * SI-OS Kernel v1.1 (LingZhu)
 * 修复版：采用“暴力挂载”策略，解决无反应问题
 * Copyright 2026 TianSuan AI Lab
 */

const SIOS = {
    // === 1. 系统状态 ===
    state: {
        isReady: false,
        activeModules: new Set(),
        memory: []
    },

    // === 2. 模块注册表 ===
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

    // === 3. 初始化启动 (核心修复点) ===
    init: function() {
        if (this.state.isReady) return; // 防止重复启动

        console.log("SI-OS Kernel: Force Starting...");
        
        // 找到屏幕
        const stream = document.getElementById('console-output');
        if (!stream) {
            console.error("SI-OS Error: Console screen not found.");
            return;
        }

        // 1. 清空 HTML 里原本写死的 "LOADING..."
        stream.innerHTML = ""; 

        // 2. 打印活的系统启动日志
        this.ui.log("SI-OS KERNEL V1.1 LOADED.", "sys");
        this.ui.log("NEURAL LINK ESTABLISHED.", "sys");
        this.ui.log("WAITING FOR COMMAND...", "sys");
        
        this.state.isReady = true;
        
        // 3. 强力接管输入框
        const input = document.getElementById('console-input');
        if (input) {
            // 移除可能存在的旧监听器（克隆大法）
            const newNode = input.cloneNode(true);
            input.parentNode.replaceChild(newNode, input);
            
            // 绑定新事件
            newNode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleInput(e.target.value);
                    e.target.value = ''; 
                }
            });
            // 自动聚焦，让用户直接能打字
            newNode.focus();
        }
    },

    // === 4. 神经路由 ===
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

        let targetModule = null;
        // 模糊匹配意图
        for (let [key, config] of Object.entries(this.registry)) {
            if (config.keywords.some(k => text.toLowerCase().includes(k))) {
                targetModule = key;
                break;
            }
        }

        if (targetModule) {
            this.loadModule(targetModule, text);
        } else {
            setTimeout(() => {
                this.ui.log("UNKNOWN COMMAND. TRY 'STORY', 'MUSIC', OR 'VISUAL'.", "sys");
            }, 500);
        }
    },

    // === 5. 动态加载器 ===
    loadModule: function(moduleKey, payload) {
        const config = this.registry[moduleKey];

        // 防止重复加载
        if (this.state.activeModules.has(moduleKey)) {
            this.dispatchToModule(moduleKey, payload);
            return;
        }

        this.ui.log(`MOUNTING MODULE: [${config.name}] ...`, "sys");
        
        const script = document.createElement('script');
        script.src = config.path;
        script.onload = () => {
            this.state.activeModules.add(moduleKey);
            this.ui.log(`[${config.name}] ONLINE.`, "sys");
            this.dispatchToModule(moduleKey, payload);
        };
        script.onerror = () => {
            this.ui.log(`ERROR: MODULE [${config.name}] NOT FOUND.`, "sys");
            this.ui.log(`CHECK PATH: ${config.path}`, "sys");
        };
        
        document.body.appendChild(script);
    },

    // === 6. 信号分发 ===
    dispatchToModule: function(moduleKey, payload) {
        // 拼凑模块对象名：literature -> ArmLiterature
        const moduleName = "Arm" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        
        if (window[moduleName]) {
            window[moduleName].process(payload, this);
        } else {
            this.ui.log(`CRITICAL ERROR: MODULE [${moduleKey}] HAS NO ENTRY POINT.`, "sys");
        }
    },

    // === 7. UI 接口 ===
    ui: {
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            if (!stream) return;
            const div = document.createElement('div');
            div.className = `log-entry log-${type}`;
            div.innerText = text;
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        }
    }
};

// === 🚀 V1.1 强力启动逻辑 🚀 ===
// 不再等待 window.onload，而是每 100ms 检查一次屏幕是否存在
// 一旦发现屏幕，立刻启动，绝不拖泥带水
(function autoStart() {
    const checkTimer = setInterval(() => {
        const consoleEl = document.getElementById('console-output');
        if (consoleEl) {
            clearInterval(checkTimer);
            // 稍微延迟 200ms 确保动画跑完，然后启动
            setTimeout(() => {
                SIOS.init();
            }, 200);
        }
    }, 100);
})();
