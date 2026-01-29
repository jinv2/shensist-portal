/**
 * SI-OS Kernel v1.2 (LingZhu)
 * 生产力版：支持记忆共享、一键宏指令、自动剪贴板
 */

const SIOS = {
    // 1. 系统状态
    state: {
        isReady: false,
        activeModules: new Set(),
        // 【核心升级】共享上下文记忆池
        sharedContext: {
            theme: "",      // 主题 (如：赛博朋克)
            visualTags: [], // 视觉关键词
            mood: "",       // 情绪基调
            summary: ""     // 故事梗概
        }
    },

    // 2. 模块注册表
    registry: {
        "literature": { path: "modules/arm_literature.js", keywords: ["story", "小说", "设定"], name: "NARRATIVE ARM" },
        "visual":     { path: "modules/arm_visual.js",     keywords: ["visual", "画面", "图"],   name: "VISUAL ARM" },
        "music":      { path: "modules/arm_music.js",      keywords: ["music", "音乐", "BGM"],   name: "SONIC ARM" }
    },

    // 3. 初始化 (保持强力启动逻辑)
    init: function() {
        if (this.state.isReady) return;
        const stream = document.getElementById('console-output');
        if (!stream) return;
        
        stream.innerHTML = ""; 
        this.ui.log("SI-OS KERNEL V1.2 ONLINE.", "sys");
        this.ui.log("MEMORY POOL: ACTIVE.", "sys");
        this.ui.log("READY FOR MACRO COMMAND...", "sys");
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        if (input) {
            const newNode = input.cloneNode(true);
            input.parentNode.replaceChild(newNode, input);
            newNode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleInput(e.target.value);
                    e.target.value = ''; 
                }
            });
            newNode.focus();
        }
    },

    // 4. 神经路由 & 宏指令
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

        // 【核心升级】检测“一键生成”宏指令
        if (text.includes("一键") || text.includes("全部") || text.includes("generate all")) {
            this.runMacro(text); // 触发全自动流水线
            return;
        }

        // 普通单模块触发
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
            // 默认交给文学臂处理，视为开始
            this.loadModule("literature", text);
        }
    },

    // 【新增】全自动宏指令流水线
    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING SUPER-INDIVIDUAL WORKFLOW <<<", "sys");
        
        // 第一步：文学臂 (产出设定)
        await this.loadModuleSync("literature", userInput);
        
        // 间隔 1秒
        setTimeout(async () => {
             // 第二步：视觉臂 (读取文学臂的记忆)
            await this.loadModuleSync("visual", "AUTO_GENERATE");
            
            // 间隔 1秒
            setTimeout(async () => {
                // 第三步：声波臂 (读取文学臂的记忆)
                await this.loadModuleSync("music", "AUTO_GENERATE");
                
                this.ui.log(">>> WORKFLOW COMPLETE. ASSETS READY. <<<", "sys");
            }, 1500);
        }, 1500);
    },

    // 5. 动态加载器 (支持 Promise)
    loadModule: function(moduleKey, payload) {
        this.loadModuleSync(moduleKey, payload);
    },

    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            
            // 如果已加载，直接运行
            if (this.state.activeModules.has(moduleKey)) {
                this.dispatchToModule(moduleKey, payload);
                resolve();
                return;
            }

            this.ui.log(`MOUNTING: [${config.name}] ...`, "sys");
            const script = document.createElement('script');
            script.src = config.path;
            script.onload = () => {
                this.state.activeModules.add(moduleKey);
                this.ui.log(`[${config.name}] ONLINE.`, "sys");
                this.dispatchToModule(moduleKey, payload);
                resolve();
            };
            document.body.appendChild(script);
        });
    },

    // 6. 信号分发
    dispatchToModule: function(moduleKey, payload) {
        const moduleName = "Arm" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleName]) {
            window[moduleName].process(payload, this);
        }
    },

    // 7. UI 接口 (含复制按钮生成器)
    ui: {
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            if (!stream) return;
            const div = document.createElement('div');
            div.className = `log-entry log-${type}`;
            div.innerText = text; // 普通文本
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        },

        // 【新增】渲染带有复制按钮的代码块卡片
        renderCodeCard: function(title, codeContent) {
            const stream = document.getElementById('console-output');
            if (!stream) return;

            // 创建卡片容器
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(0, 240, 255, 0.2);
                border-radius: 8px;
                margin: 10px 0;
                padding: 0;
                overflow: hidden;
                position: relative;
            `;

            // 标题栏 + 复制按钮
            const header = document.createElement('div');
            header.style.cssText = `
                background: rgba(0, 0, 0, 0.3);
                padding: 5px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            `;

            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 10px; color: #666; font-family: 'Orbitron'; letter-spacing: 1px;";

            // 复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY";
            copyBtn.style.cssText = `
                background: var(--accent);
                color: #000;
                border: none;
                border-radius: 4px;
                padding: 2px 8px;
                font-size: 10px;
                font-weight: bold;
                cursor: pointer;
                font-family: 'Orbitron';
            `;
            
            // 复制逻辑
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(codeContent);
                copyBtn.innerText = "COPIED!";
                copyBtn.style.background = "#00ff88"; // 变绿
                setTimeout(() => {
                    copyBtn.innerText = "COPY";
                    copyBtn.style.background = "var(--accent)";
                }, 2000);
            };

            // 代码内容区
            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `
                padding: 10px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: #e0e0e0;
                white-space: pre-wrap;
                word-break: break-all;
            `;

            header.appendChild(titleSpan);
            header.appendChild(copyBtn);
            card.appendChild(header);
            card.appendChild(codeBlock);
            stream.appendChild(card);
            stream.scrollTop = stream.scrollHeight;
        }
    }
};

(function autoStart() {
    const checkTimer = setInterval(() => {
        const consoleEl = document.getElementById('console-output');
        if (consoleEl) {
            clearInterval(checkTimer);
            setTimeout(() => SIOS.init(), 200);
        }
    }, 100);
})();
