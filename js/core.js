/**
 * SI-OS Kernel v1.9 (修正版)
 * 解决 3-HEAD 9-OUTPUT 链条断裂问题
 * 版权：天算AI科技实验室 (Natural Algorithm)
 */

const SIOS = {
    state: {
        isReady: false,
        activeModules: new Set(),
        sharedContext: { theme: "", visualTags: [], mood: "", summary: "", masterStyle: "Default Cinematic" }
    },

    registry: {
        "literature": { path: "modules/head_literature.js", keywords: ["小说", "故事", "剧本", "大纲"], name: "HEAD OF LITERATURE" },
        "visual":     { path: "modules/head_visual.js",     keywords: ["visual", "画面", "分镜"],   name: "HEAD OF VISUAL" },
        "music":      { path: "modules/head_music.js",      keywords: ["music", "音乐", "配乐"],   name: "HEAD OF AUDIO" }
    },

    init: function() {
        if (this.state.isReady) return;
        const stream = document.getElementById('console-output');
        if (!stream) return;
        
        stream.innerHTML = ""; 
        this.ui.log("SI-OS KERNEL V4.1 ONLINE.", "sys");
        this.ui.log("9-ASSET MATRIX READY.", "sys"); 
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');
        const resetBtn = document.getElementById('console-reset-btn');

        // 绑定风格按钮逻辑
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.sharedContext.masterStyle = btn.getAttribute('data-value');
                this.ui.log(`[STYLE LOCKED]: ${this.state.sharedContext.masterStyle}`, "sys");
            };
        });

        if (input) {
            input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    this.handleInput(input.value);
                    input.value = ''; 
                }
            };
            if (sendBtn) {
                sendBtn.onclick = () => {
                    this.handleInput(input.value);
                    input.value = ''; 
                };
            }
            if (resetBtn) {
                resetBtn.onclick = () => { this.reset(); };
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

        // 一键生成宏指令 (核心修正：改为 async 确保顺序)
        if (text.includes("一键") || text.includes("全部") || text.includes("generate all")) {
            this.runMacro(text); 
            return;
        }

        // 单模块触发
        for (let [key, config] of Object.entries(this.registry)) {
            if (config.keywords.some(k => text.includes(k))) {
                this.loadModuleSync(key, text);
                return;
            }
        }
        this.loadModuleSync("literature", text);
    },

    // 核心修正：严格顺序执行 3个 Head，产出 9个输出
    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING 3-HEAD WORKFLOW <<<", "sys");
        
        try {
            // 1. 文曲星 (产出 1, 2, 3)
            this.ui.log("STEP 1: GENERATING LITERARY ASSETS...", "sys");
            await this.loadModuleSync("literature", userInput);
            
            // 等待文曲星执行完毕的延迟
            await new Promise(r => setTimeout(r, 3000)); 

            // 2. 巨灵神 (产出 4, 5, 6)
            this.ui.log("STEP 2: GENERATING VISUAL ASSETS...", "sys");
            await this.loadModuleSync("visual", "AUTO_MODE");

            await new Promise(r => setTimeout(r, 3000));

            // 3. 夔牛 (产出 7, 8, 9)
            this.ui.log("STEP 3: GENERATING SONIC ASSETS...", "sys");
            await this.loadModuleSync("music", "AUTO_MODE");

            this.ui.log(">>> ALL 9 CORE ASSETS DELIVERED. <<<", "sys");
        } catch (e) {
            console.error(e);
            this.ui.log("SYSTEM HALTED: MACRO EXECUTION ERROR.", "sys");
        }
    },

    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            
            // 如果模块已经加载，直接运行
            if (this.state.activeModules.has(moduleKey)) {
                this.dispatchToModule(moduleKey, payload);
                resolve();
                return;
            }

            // 动态加载脚本
            const script = document.createElement('script');
            script.src = config.path;
            script.onload = () => {
                this.state.activeModules.add(moduleKey);
                this.ui.log(`[${config.name}] ENGINE ACTIVATED.`, "sys");
                this.dispatchToModule(moduleKey, payload);
                resolve();
            };
            document.body.appendChild(script);
        });
    },

    dispatchToModule: function(moduleKey, payload) {
        const moduleObjectName = "Head" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleObjectName]) {
            window[moduleObjectName].process(payload, this);
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
        renderCodeCard: function(title, codeContent) {
            const stream = document.getElementById('console-output');
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(15, 15, 15, 0.95); 
                border: 2px solid var(--accent);
                box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
                border-radius: 12px; margin: 20px 0; padding: 0; overflow: hidden;
            `;
            const header = document.createElement('div');
            header.style.cssText = `background: rgba(0, 240, 255, 0.15); padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent);`;
            
            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 12px; color: #fff; font-weight:900; font-family: 'Orbitron'; letter-spacing: 2px;";
            
            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY ASSET";
            copyBtn.style.cssText = `background: var(--accent); color: #000; border: none; border-radius: 4px; padding: 5px 12px; font-size: 10px; font-weight: bold; cursor: pointer; font-family: 'Orbitron';`;
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(codeContent);
                copyBtn.innerText = "DONE!";
                setTimeout(() => copyBtn.innerText = "COPY ASSET", 2000);
            };

            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `padding: 20px; font-family: 'Courier New', monospace; font-size: 14px; color: #fff; white-space: pre-wrap; line-height: 1.6;`;

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
    const timer = setInterval(() => {
        if (document.getElementById('console-output')) {
            clearInterval(timer);
            SIOS.init();
        }
    }, 100);
})();
