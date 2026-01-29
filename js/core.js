/**
 * SI-OS Kernel v1.8 (LingZhu)
 * 升级内容：高对比度边框 (Visibilty Update)
 */

const SIOS = {
    // 1. 系统状态
    state: {
        isReady: false,
        activeModules: new Set(),
        sharedContext: { theme: "", visualTags: [], mood: "", summary: "", masterStyle: "Default Cinematic" }
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
        this.ui.log("SI-OS KERNEL V1.8 ONLINE.", "sys");
        this.ui.log("STYLE DECK: MOUNTED.", "sys"); 
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');
        const resetBtn = document.getElementById('console-reset-btn');

        // 绑定风格按钮
        const styleBtns = document.querySelectorAll('.style-btn');
        styleBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');
                const selectedStyle = newBtn.getAttribute('data-value');
                this.state.sharedContext.masterStyle = selectedStyle;
                this.ui.log(`[STYLE LOCKED]: ${selectedStyle}`, "sys");
            });
        });

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
            
            if (sendBtn) {
                const newSendBtn = sendBtn.cloneNode(true);
                sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
                newSendBtn.addEventListener('click', () => {
                    this.handleInput(newNode.value);
                    newNode.value = ''; 
                    newNode.focus();
                });
            }

            if (resetBtn) {
                const newResetBtn = resetBtn.cloneNode(true);
                resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
                newResetBtn.addEventListener('click', () => { this.reset(); });
            }
        }
    },

    reset: function() {
        this.state.isReady = false;
        this.state.activeModules.clear();
        this.state.sharedContext = { theme: "", visualTags: [], mood: "", summary: "", masterStyle: "Default Cinematic" };
        document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
        this.init();
    },

    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

        if (text.includes("风格") || text.includes("style")) {
            this.state.sharedContext.masterStyle = text; 
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

    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING 3-HEAD WORKFLOW <<<", "sys");
        const currentStyle = this.state.sharedContext.masterStyle;
        this.ui.log(`[PIPELINE CONFIG]: Style = ${currentStyle}`, "mod");

        await this.loadModuleSync("literature", userInput);
        setTimeout(async () => {
            await this.loadModuleSync("visual", "AUTO_GENERATE");
            setTimeout(async () => {
                await this.loadModuleSync("music", "AUTO_GENERATE");
                this.ui.log(">>> IP ASSETS GENERATION COMPLETE. <<<", "sys");
            }, 1500);
        }, 1500);
    },

    loadModule: function(moduleKey, payload) { this.loadModuleSync(moduleKey, payload); },
    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            // 每次强制重载，确保 process 函数被执行
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

    dispatchToModule: function(moduleKey, payload) {
        const moduleObjectName = "Head" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleObjectName]) {
            window[moduleObjectName].process(payload, this);
        } else {
            this.ui.log(`CRITICAL ERROR: ENTRY POINT [${moduleObjectName}] NOT FOUND.`, "sys");
        }
    },

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
        // 【核心修改】 加粗边框逻辑
        renderCodeCard: function(title, codeContent) {
            const stream = document.getElementById('console-output');
            if (!stream) return;
            const card = document.createElement('div');
            // 修改这里：边框加粗，颜色变亮
            card.style.cssText = `
                background: rgba(20, 20, 20, 0.9); 
                border: 2px solid var(--accent); /* 加粗边框 */
                box-shadow: 0 0 15px rgba(0, 240, 255, 0.15); /* 增加辉光 */
                border-radius: 8px; margin: 15px 0; padding: 0; overflow: hidden; position: relative;
            `;
            const header = document.createElement('div');
            header.style.cssText = `background: rgba(0, 240, 255, 0.1); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--accent);`;
            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 11px; color: #fff; font-weight:bold; font-family: 'Orbitron'; letter-spacing: 1px;";
            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY";
            copyBtn.style.cssText = `background: var(--accent); color: #000; border: none; border-radius: 4px; padding: 4px 10px; font-size: 10px; font-weight: bold; cursor: pointer; font-family: 'Orbitron';`;
            copyBtn.onclick = () => { navigator.clipboard.writeText(codeContent); copyBtn.innerText = "COPIED!"; copyBtn.style.background = "#00ff88"; setTimeout(() => { copyBtn.innerText = "COPY"; copyBtn.style.background = "var(--accent)"; }, 2000); };
            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `padding: 15px; font-family: 'Courier New', monospace; font-size: 13px; color: #e0e0e0; white-space: pre-wrap; word-break: break-all; line-height: 1.5;`;
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
