/**
 * SI-OS Module: Head of Visual (巨灵·最终完整版 v4.0)
 * 职责：输出视觉系的3项核心资产 (Moodboard -> Shot List -> Art Bible)
 */

window.HeadVisual = {
    meta: {
        name: "Visual Director: Cinema Mode",
        version: "4.0 Full Matrix"
    },

    process: function(userInput, core) {
        // 读取由文曲头写入的记忆
        const mem = core.state.sharedContext || {};
        const style = mem.masterStyle || "Cinematic Realism";
        const mood = mem.mood || "Dynamic";
        const context = mem.summary || userInput;

        core.ui.log(`[巨灵核心] 启动... 读取风格记忆: ${style}`, "mod");

        // === 输出 4: [HEAD] 视觉情绪板 (Head) ===
        const moodboard = this.generateMoodboard(style, mood);
        core.ui.renderCodeCard("4_VISUAL_MOODBOARD.TXT", moodboard);

        // 模拟思考延迟
        setTimeout(() => {
            // === 输出 5: [ARM 3] 摄影分镜 (Cinematography) ===
            core.ui.log(`[视觉臂·叁] 拆解分镜脚本...`, "mod");
            const shotList = this.generateCinematicPrompts(mem, style);
            core.ui.renderCodeCard("5_CINEMATOGRAPHY_MJ.CMD", shotList);

            setTimeout(() => {
                // === 输出 6: [ARM 4] 美术设定 (Art Direction) ===
                core.ui.log(`[视觉臂·肆] 定义美术规范...`, "mod");
                const artBible = this.generateArtBible(style, context);
                core.ui.renderCodeCard("6_ART_DIRECTION_BIBLE.TXT", artBible);
                
                core.ui.log(">> [巨灵] 任务完成。视觉资产 (3/3) 已交付。", "sys");
            }, 800); // 间隔 0.8秒

        }, 800); // 间隔 0.8秒
    },

    // --- [4] 生成视觉情绪板 ---
    generateMoodboard: function(style, mood) {
        return `
=== PROJECT MOODBOARD ===
[MASTER STYLE]: ${style}
[EMOTIONAL CORE]: ${mood}

[COLOR PALETTE]:
- Primary: Void Black (#000000) & Neon Cyan (#00F0FF)
- Secondary: Rust Orange (#CC4400) for contrast
- Highlight: Anamorphic Flare White

[TEXTURES & MATERIALS]:
- Wet Asphalt (Rain-slicked streets)
- Brushed Chrome (Cybernetics)
- Holographic Noise (Glitch effects)
- Organic Decay (Rotting flesh/plants)

[LIGHTING REFERENCES]:
- Roger Deakins (Blade Runner 2049) - Silhouette & Volume
- Wong Kar-wai (Fallen Angels) - Step-printing blur
`;
    },

    // --- [5] 生成摄影分镜 (Midjourney/Sora Prompts) ---
    generateCinematicPrompts: function(mem, style) {
        const visualTags = mem.visualTags ? mem.visualTags.join(", ") : "Cinematic, Detailed";
        const context = mem.summary || "A scene from the story";

        return `
/imagine prompt: 
[SHOT 01 - ESTABLISHING]: 
[SUBJECT]: Wide angle drone shot of ${context}.
[STYLE]: ${style}, massive scale, isolationist composition.
[LIGHTING]: Bioluminescent fog meeting harsh industrial floodlights.
[TECH]: IMAX 70mm, f/8, deep depth of field.
--ar 2.39:1 --stylize 750 --v 6.0

/imagine prompt:
[SHOT 02 - MEDIUM]:
[SUBJECT]: Over-the-shoulder view of protagonist interacting with a retro-tech interface.
[DETAILS]: Dirty lens, chromatic aberration, ${visualTags}.
[COLOR]: Teal and Orange grading, high contrast.
--ar 16:9 --style raw --v 6.0

/imagine prompt:
[SHOT 03 - CLOSE UP]:
[SUBJECT]: Extreme macro shot of an eye reflecting a burning neon sign.
[EMOTION]: The realization of the "Truth" mentioned in the script.
[TECH]: 100mm Macro lens, bokeh background, wet skin texture.
--ar 2.39:1 --ji 6
        `;
    },

    // --- [6] 生成美术设定书 (Art Bible) ---
    generateArtBible: function(style, context) {
        return `
### ART DIRECTION BIBLE
## STYLE GUIDE: ${style}

**1. SET DESIGN (置景):**
- **Architecture**: Brutalist concrete mixed with exposed wiring.
- **Key Location**: The "Liminal Space" where the protagonist wakes up.
- **Atmosphere**: Claustrophobic, high humidity, smell of ozone.

**2. PROPS (道具):**
- **Hero Prop**: A data-drive that looks like a religious artifact.
- **Tech Level**: Retro-futurism (CRT screens, heavy switches, tactile keyboards). No sleek touchscreens.

**3. COSTUME (服装):**
- **Protagonist**: Tactical streetwear, worn-out, layers of synthetic fabric.
- **Antagonist**: Pristine, seamless white suit (symbolizing the "System").
`;
    }
};
