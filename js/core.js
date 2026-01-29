/**
 * SI-OS Kernel v1.5 (LingZhu)
 * 升级内容：支持 Send 按钮监听
 */

const SIOS = {
    // 1. 系统状态
    state: {
        isReady: false,
        activeModules: new Set(),
        // 共享上下文记忆池
        sharedContext: {
            theme: "",      // 主题
            visualTags: [], // 视觉关键词
            mood: "",       // 情绪基调
            summary: ""     // 故事梗概
        }
    },

    // 2. 模块注册表
    registry: {
        "literature": { 
            path: "modules/head_literature.js", 
            keywords: ["小说", "故事", "剧本", "大纲", "story", "script", "plot", "设定"], 
            name: "HEAD OF LITERATURE (文曲)" 
        },
        "visual": { 
            path: "modules/head_visual.js",     
            keywords: ["visual", "画面", "分镜", "shot", "美术", "color", "midjourney"],   
            name: "HEAD OF VISUAL (巨灵)" 
        },
        "music": { 
            path: "modules/head_music.js",      
            keywords: ["music", "音乐", "配乐", "sound", "音效", "sfx", "suno"],   
            name: "HEAD OF AUDIO (夔牛)" 
        }
    },

    // 3. 初始化 (核心修改：绑定按钮事件)
    init: function() {
        if (this.state.isReady) return;
        const stream = document.getElementById('console-output');
        if (!stream) return;
        
        stream.innerHTML = ""; 
        this.ui.log("SI-OS KERNEL V1.5 ONLINE.", "sys");
        this.ui.log("ARCH: 3-HEAD 6-ARM MATRIX.", "sys"); 
        this.ui.log("READY FOR PROFESSIONAL WORKFLOW...", "sys");
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');

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
            
            // 【新增】监听发送按钮点击
            if (sendBtn) {
                const newBtn = sendBtn.cloneNode(true);
                sendBtn.parentNode.replaceChild(newBtn, sendBtn);
                newBtn.addEventListener('click', () => {
                    this.handleInput(newNode.value);
                    newNode.value = ''; // 清空输入框
                    newNode.focus();    // 焦点回到输入框
                });
            }
        }
    },

    // 4. 神经路由 & 宏指令
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");

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

    // 5. 动态加载器 (Promise)
    loadModule: function(moduleKey, payload) {
        this.loadModuleSync(moduleKey, payload);
    },

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
            script.onerror = () => {
                this.ui.log(`ERROR: MODULE [${config.name}] FAILED.`, "sys");
            }
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
            card.style.cssText = `
                background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2);
                border-radius: 8px; margin: 10px 0; padding: 0; overflow: hidden; position: relative;
            `;

            const header = document.createElement('div');
            header.style.cssText = `
                background: rgba(0, 0, 0, 0.3); padding: 5px 10px; display: flex;
                justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            `;

            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 10px; color: #666; font-family: 'Orbitron'; letter-spacing: 1px;";

            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY";
            copyBtn.style.cssText = `
                background: var(--accent); color: #000; border: none; border-radius: 4px;
                padding: 2px 8px; font-size: 10px; font-weight: bold; cursor: pointer; font-family: 'Orbitron';
            `;
            
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(codeContent);
                copyBtn.innerText = "COPIED!";
                copyBtn.style.background = "#00ff88"; 
                setTimeout(() => {
                    copyBtn.innerText = "COPY";
                    copyBtn.style.background = "var(--accent)";
                }, 2000);
            };

            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `
                padding: 10px; font-family: 'Courier New', monospace; font-size: 12px; color: #e0e0e0;
                white-space: pre-wrap; word-break: break-all;
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
