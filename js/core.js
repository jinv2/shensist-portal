/**
 * SI-OS Kernel v1.6 (LingZhu)
 * 升级内容：支持系统重置 (Reboot) + 大师风格识别 (Style Extraction)
 */

const SIOS = {
    // 1. 系统状态
    state: {
        isReady: false,
        activeModules: new Set(),
        // 共享上下文记忆池
        sharedContext: {
            theme: "",
            visualTags: [],
            mood: "",
            summary: "",
            // 【新增】大师风格槽位
            masterStyle: "Default Sci-Fi" 
        }
    },

    // 2. 模块注册表
    registry: {
        "literature": { path: "modules/head_literature.js", keywords: ["小说", "故事", "剧本", "大纲", "story", "script", "plot", "设定"], name: "HEAD OF LITERATURE (文曲)" },
        "visual":     { path: "modules/head_visual.js",     keywords: ["visual", "画面", "分镜", "shot", "美术", "color", "midjourney"],   name: "HEAD OF VISUAL (巨灵)" },
        "music":      { path: "modules/head_music.js",      keywords: ["music", "音乐", "配乐", "sound", "音效", "sfx", "suno"],   name: "HEAD OF AUDIO (夔牛)" }
    },

    // 3. 初始化
    init: function() {
        if (this.state.isReady) return;
        const stream = document.getElementById('console-output');
        if (!stream) return;
        
        stream.innerHTML = ""; 
        this.ui.log("SI-OS KERNEL V1.6 ONLINE.", "sys");
        this.ui.log("SYSTEM REBOOTED. MEMORY CLEARED.", "sys");
        this.ui.log("READY FOR MASTER-CLASS CREATION...", "sys");
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');
        const resetBtn = document.getElementById('console-reset-btn');

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
            
            // 绑定发送按钮
            if (sendBtn) {
                const newSendBtn = sendBtn.cloneNode(true);
                sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
                newSendBtn.addEventListener('click', () => {
                    this.handleInput(newNode.value);
                    newNode.value = ''; 
                    newNode.focus();
                });
            }

            // 【新增】绑定重置按钮
            if (resetBtn) {
                const newResetBtn = resetBtn.cloneNode(true);
                resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
                newResetBtn.addEventListener('click', () => {
                    this.reset();
                });
            }
        }
    },

    // 【新增】重置系统
    reset: function() {
        this.state.isReady = false;
        this.state.activeModules.clear();
        this.state.sharedContext = { theme: "", visualTags: [], mood: "", summary: "", masterStyle: "Default Sci-Fi" };
        this.init(); // 重新初始化
    },

    // 4. 神经路由 & 风格识别
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

        // 【核心升级】简单的风格提取逻辑
        // 如果用户输入了 "风格：王家卫" 或 "style: Cyberpunk"，我们把它存下来
        if (text.includes("风格") || text.includes("style") || text.includes("Style")) {
            // 这里做一个简单的模拟提取，未来可以用 NLP
            this.ui.log("[SYSTEM] DETECTING STYLE PREFERENCE...", "sys");
            this.state.sharedContext.masterStyle = text; // 暂时把整句作为风格参考
        }

        if (text.includes("一键") || text.includes("全部") || text.includes("generate all")) {
            this.runMacro(text); 
            return;
        }

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
            this.loadModule("literature", text);
        }
    },

    // 全自动宏指令流水线
    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING 3-HEAD WORKFLOW (FULL IP CREATION) <<<", "sys");
        await this.loadModuleSync("literature", userInput);
        setTimeout(async () => {
            await this.loadModuleSync("visual", "AUTO_GENERATE");
            setTimeout(async () => {
                await this.loadModuleSync("music", "AUTO_GENERATE");
                this.ui.log(">>> IP ASSETS GENERATION COMPLETE. <<<", "sys");
            }, 1500);
        }, 1500);
    },

    // 5. 动态加载器
    loadModule: function(moduleKey, payload) { this.loadModuleSync(moduleKey, payload); },
    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            if (this.state.activeModules.has(moduleKey)) {
                this.dispatchToModule(moduleKey, payload);
                resolve();
                return;
            }
            this.ui.log(`MOUNTING HEAD: [${config.name}] ...`, "sys");
            const script = document.createElement('script');
            script.src = config.path;
            script.onload = () => {
                this.state.activeModules.add(moduleKey);
                this.ui.log(`[${config.name}] ONLINE.`, "sys");
                this.dispatchToModule(moduleKey, payload);
                resolve();
            };
            script.onerror = () => { this.ui.log(`ERROR: MODULE [${config.name}] FAILED.`, "sys"); }
            document.body.appendChild(script);
        });
    },

    // 6. 信号分发
    dispatchToModule: function(moduleKey, payload) {
        const moduleObjectName = "Head" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleObjectName]) {
            window[moduleObjectName].process(payload, this);
        } else {
            this.ui.log(`CRITICAL ERROR: ENTRY POINT [${moduleObjectName}] NOT FOUND.`, "sys");
        }
    },

    // 7. UI 接口
    ui: {
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            if (!stream) return;
            const div = document.createElement('div');
            div.className = `log-entry log-${type}`;
            div.innerText = text;
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        },
        renderCodeCard: function(title, codeContent) {
            const stream = document.getElementById('console-output');
            if (!stream) return;
            const card = document.createElement('div');
            card.style.cssText = `background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 8px; margin: 10px 0; padding: 0; overflow: hidden; position: relative;`;
            const header = document.createElement('div');
            header.style.cssText = `background: rgba(0, 0, 0, 0.3); padding: 5px 10px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);`;
            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 10px; color: #666; font-family: 'Orbitron'; letter-spacing: 1px;";
            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY";
            copyBtn.style.cssText = `background: var(--accent); color: #000; border: none; border-radius: 4px; padding: 2px 8px; font-size: 10px; font-weight: bold; cursor: pointer; font-family: 'Orbitron';`;
            copyBtn.onclick = () => { navigator.clipboard.writeText(codeContent); copyBtn.innerText = "COPIED!"; copyBtn.style.background = "#00ff88"; setTimeout(() => { copyBtn.innerText = "COPY"; copyBtn.style.background = "var(--accent)"; }, 2000); };
            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `padding: 10px; font-family: 'Courier New', monospace; font-size: 12px; color: #e0e0e0; white-space: pre-wrap; word-break: break-all;`;
            header.appendChild(titleSpan); header.appendChild(copyBtn); card.appendChild(header); card.appendChild(codeBlock); stream.appendChild(card); stream.scrollTop = stream.scrollHeight;
        }
    }
};

(function autoStart() {
    const checkTimer = setInterval(() => {
        const consoleEl = document.getElementById('console-output');
        if (consoleEl) { clearInterval(checkTimer); setTimeout(() => SIOS.init(), 200); }
    }, 100);
})();
