/**
 * SI-OS Kernel v4.3 (Stable)
 * 修复输入无响应问题，回归 9-Asset 逻辑
 */

const SIOS = {
    state: {
        isReady: false,
        activeModules: new Set(),
        sharedContext: { theme: "", masterStyle: "Cinematic" }
    },

    registry: {
        "literature": { path: "modules/head_literature.js", name: "LITERATURE" },
        "visual":     { path: "modules/head_visual.js",     name: "VISUAL" },
        "music":      { path: "modules/head_music.js",      name: "AUDIO" }
    },

    init: function() {
        if (this.state.isReady) return;
        this.ui.log(">> SI-OS KERNEL v4.3 ONLINE.", "sys");
        this.state.isReady = true;

        // 绑定回车事件
        const input = document.getElementById('console-input');
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.handleInput(input.value);
                input.value = '';
            }
        };
    },

    reset: function() {
        document.getElementById('console-output').innerHTML = "";
        this.state.activeModules.clear();
        this.ui.log(">> SYSTEM REBOOTED.", "sys");
    },

    // 核心修复：确保输入后能正确触发
    handleInput: function(text) {
        if (!text.trim()) return;
        this.ui.log(`> USER: ${text}`, "user");
        this.runMacro(text);
    },

    runMacro: async function(userInput) {
        this.ui.log(">> INITIATING 3-HEAD GENERATION...", "sys");
        try {
            // 1. 文曲
            await this.loadModuleSync("literature", userInput);
            await new Promise(r => setTimeout(r, 2000));
            // 2. 巨灵
            await this.loadModuleSync("visual", "AUTO_MODE");
            await new Promise(r => setTimeout(r, 2000));
            // 3. 夔牛
            await this.loadModuleSync("music", "AUTO_MODE");
            this.ui.log(">> 9 CORE ASSETS DELIVERED.", "sys");
        } catch (e) {
            this.ui.log(">> ERROR IN MACRO EXECUTION.", "sys");
        }
    },

    loadModuleSync: function(moduleKey, payload) {
        return new Promise((resolve) => {
            const config = this.registry[moduleKey];
            if (this.state.activeModules.has(moduleKey)) {
                this.dispatchToModule(moduleKey, payload);
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = config.path;
                script.onload = () => {
                    this.state.activeModules.add(moduleKey);
                    this.dispatchToModule(moduleKey, payload);
                    resolve();
                };
                document.body.appendChild(script);
            }
        });
    },

    dispatchToModule: function(moduleKey, payload) {
        const moduleObjectName = "Head" + moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
        if (window[moduleObjectName]) {
            window[moduleObjectName].process(payload, this);
        }
    },

    ui: {
        showHelp: function() {
            const guide = `【协议指南】\n1. 选择风格按钮。\n2. 输入创作主题。\n3. 点击发送，系统将交付9项资产。\n4. 点击卡片右上角复制。`;
            this.renderCodeCard("SYSTEM_GUIDE.DOC", guide);
        },
        log: function(text, type) {
            const stream = document.getElementById('console-output');
            const div = document.createElement('div');
            div.style.marginBottom = "10px";
            div.style.color = type === 'sys' ? 'var(--accent)' : '#fff';
            div.innerText = text;
            stream.appendChild(div);
            stream.scrollTop = stream.scrollHeight;
        },
        renderCodeCard: function(title, content) {
            const stream = document.getElementById('console-output');
            const card = document.createElement('div');
            card.style.cssText = `border: 1px solid var(--accent); border-radius: 8px; margin: 15px 0; background: #080808; overflow: hidden;`;
            card.innerHTML = `
                <div style="background:rgba(0,240,255,0.1); padding:8px 15px; font-size:10px; display:flex; justify-content:space-between;">
                    <span>${title}</span>
                    <span style="cursor:pointer" onclick="navigator.clipboard.writeText(\`${content}\`)">[COPY]</span>
                </div>
                <div style="padding:15px; font-size:13px; color:#ccc; white-space:pre-wrap;">${content}</div>
            `;
            stream.appendChild(card);
            stream.scrollTop = stream.scrollHeight;
        }
    }
};
