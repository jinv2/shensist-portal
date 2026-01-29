/**
 * SI-OS Kernel v4.2 (Final Stable)
 * 职责：找回帮助逻辑 + 稳定 9-ASSET 输出
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
        this.ui.log("SI-OS KERNEL V4.2 ONLINE.", "sys");
        this.ui.log("9-ASSET MATRIX READY. CLICK [? GUIDE] FOR HELP.", "sys"); 
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');
        const resetBtn = document.getElementById('console-reset-btn');

        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.sharedContext.masterStyle = btn.getAttribute('data-value');
                this.ui.log(`[STYLE LOCKED]: ${this.state.sharedContext.masterStyle}`, "sys");
            };
        });

        if (input) {
            input.onkeypress = (e) => { if (e.key === 'Enter') { this.handleInput(input.value); input.value = ''; } };
            if (sendBtn) { sendBtn.onclick = () => { this.handleInput(input.value); input.value = ''; }; }
            if (resetBtn) { resetBtn.onclick = () => { this.reset(); }; }
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
        if (text.includes("一键") || text.includes("全部") || text.includes("generate all")) {
            this.runMacro(text); 
            return;
        }
        this.loadModuleSync("literature", text);
    },

    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING 3-HEAD WORKFLOW <<<", "sys");
        try {
            await this.loadModuleSync("literature", userInput);
            await new Promise(r => setTimeout(r, 2500)); 
            await this.loadModuleSync("visual", "AUTO_MODE");
            await new Promise(r => setTimeout(r, 2500));
            await this.loadModuleSync("music", "AUTO_MODE");
            this.ui.log(">>> ALL 9 CORE ASSETS DELIVERED. <<<", "sys");
        } catch (e) { this.ui.log("EXECUTION ERROR.", "sys"); }
    },

    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            if (this.state.activeModules.has(moduleKey)) {
                this.dispatchToModule(moduleKey, payload);
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = config.path;
            script.onload = () => {
                this.state.activeModules.add(moduleKey);
                this.dispatchToModule(moduleKey, payload);
                resolve();
            };
            document.body.appendChild(script);
        });
    },

    dispatchToModule: function(moduleKey, payload) {
        const moduleObjectName = "Head" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleObjectName]) { window[moduleObjectName].process(payload, this); }
    },

    ui: {
        // === 教程指南逻辑 ===
        showHelp: function() {
            const helpText = `
【神思庭 · 造物主协议指南】
1. 风格锁定：点击上方甲板按钮选择基调。
2. 主题注入：在毛玻璃框输入灵感关键词。
3. 显化生成：点击 [✦ MATERIALIZE] 启动裂变。
4. 资产提取：点击卡片右上角 [COPY ASSET] 复制内容。
※ 建议每次新创作前点击 [↻ REBOOT] 重置。
            `;
            this.renderCodeCard("CREATOR_PROTOCOL_V4.DOC", helpText);
        },

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
            card.style.cssText = `background: rgba(15, 15, 15, 0.95); border: 2px solid var(--accent); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); border-radius: 12px; margin: 20px 0; padding: 0; overflow: hidden;`;
            const header = document.createElement('div');
            header.style.cssText = `background: rgba(0, 240, 255, 0.15); padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent);`;
            const titleSpan = document.createElement('span');
            titleSpan.innerText = title;
            titleSpan.style.cssText = "font-size: 12px; color: #fff; font-weight:900; font-family: 'Orbitron';";
            const copyBtn = document.createElement('button');
            copyBtn.innerText = "COPY ASSET";
            copyBtn.style.cssText = `background: var(--accent); color: #000; border: none; border-radius: 4px; padding: 5px 12px; font-size: 10px; font-weight: bold; cursor: pointer;`;
            copyBtn.onclick = () => { navigator.clipboard.writeText(codeContent); copyBtn.innerText = "DONE!"; setTimeout(() => copyBtn.innerText = "COPY ASSET", 2000); };
            const codeBlock = document.createElement('div');
            codeBlock.innerText = codeContent;
            codeBlock.style.cssText = `padding: 20px; font-family: 'Courier New', monospace; font-size: 14px; color: #fff; white-space: pre-wrap;`;
            header.appendChild(titleSpan); header.appendChild(copyBtn); card.appendChild(header); card.appendChild(codeBlock);
            stream.appendChild(card); stream.scrollTop = stream.scrollHeight;
        }
    }
};
