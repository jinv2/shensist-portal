/**
 * SI-OS Kernel v4.3 (Stable Fix)
 * 职责：找回生成逻辑 + 绑定显化按钮
 */

const SIOS = {
    state: {
        isReady: false,
        activeModules: new Set(),
        sharedContext: { theme: "", visualTags: [], mood: "", summary: "", masterStyle: "Default Cinematic" }
    },

    registry: {
        "literature": { path: "modules/head_literature.js", name: "LITERATURE" },
        "visual":     { path: "modules/head_visual.js",     name: "VISUAL" },
        "music":      { path: "modules/head_music.js",      name: "AUDIO" }
    },

    init: function() {
        if (this.state.isReady) return;
        const stream = document.getElementById('console-output');
        if (!stream) return;
        
        stream.innerHTML = ""; 
        this.ui.log("SI-OS KERNEL V4.3 ONLINE.", "sys");
        this.state.isReady = true;
        
        const input = document.getElementById('console-input');
        const sendBtn = document.getElementById('console-send-btn');

        // 绑定风格按钮
        document.querySelectorAll('.style-deck .style-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.sharedContext.masterStyle = btn.getAttribute('data-value');
                this.ui.log(`[STYLE LOCKED]: ${this.state.sharedContext.masterStyle}`, "sys");
            };
        });

        // 绑定发送逻辑
        if (input) {
            input.onkeypress = (e) => { if (e.key === 'Enter') { this.handleInput(input.value); input.value = ''; } };
            if (sendBtn) {
                sendBtn.onclick = () => { this.handleInput(input.value); input.value = ''; };
            }
        }
    },

    reset: function() {
        document.getElementById('console-output').innerHTML = "";
        this.state.activeModules.clear();
        this.state.sharedContext = { theme: "", masterStyle: "Default Cinematic" };
        this.ui.log(">> SYSTEM RESET COMPLETED.", "sys");
    },

    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> ${text}`, "user");
        this.runMacro(text);
    },

    runMacro: async function(userInput) {
        this.ui.log(">>> INITIATING 3-HEAD WORKFLOW...", "sys");
        try {
            await this.loadModuleSync("literature", userInput);
            await new Promise(r => setTimeout(r, 2000)); 
            await this.loadModuleSync("visual", "AUTO_MODE");
            await new Promise(r => setTimeout(r, 2000));
            await this.loadModuleSync("music", "AUTO_MODE");
            this.ui.log(">>> 9 CORE ASSETS DELIVERED.", "sys");
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
        showHelp: function() {
            const help = `【造物主协议】\n1. 选风格\n2. 输主题\n3. 点显化\n※ 完工后点 REBOOT 清空屏幕。`;
            this.renderCodeCard("GUIDE.DOC", help);
        },
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            const div = document.createElement('div');
            div.style.color = type === 'sys' ? 'var(--accent)' : '#fff';
            div.style.marginBottom = "5px";
            div.innerText = text;
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        },
        renderCodeCard: function(title, codeContent) {
            const stream = document.getElementById('console-output');
            const card = document.createElement('div');
            card.style.cssText = `background: #0a0a0a; border: 1px solid var(--accent); border-radius: 8px; margin: 15px 0; overflow: hidden;`;
            card.innerHTML = `
                <div style="background:rgba(0,240,255,0.1); padding:8px 15px; font-size:10px; display:flex; justify-content:space-between;">
                    <span>${title}</span>
                    <span style="cursor:pointer" onclick="navigator.clipboard.writeText(\`${codeContent}\`)">[COPY]</span>
                </div>
                <div style="padding:15px; font-size:13px; color:#ccc; white-space:pre-wrap;">${codeContent}</div>
            `;
            stream.appendChild(card);
            stream.scrollTop = stream.scrollHeight;
        }
    }
};
