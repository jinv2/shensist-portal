/**
 * SI-OS Module: Head of Visual (巨灵·大师光影版 v1.6)
 * 迭代目标：读取共享记忆中的[大师风格]，生成定制化视觉指令
 */

window.HeadVisual = {
    meta: {
        name: "Visual Director: Cinema Mode",
        version: "3.1 Style Aware"
    },

    process: function(userInput, core) {
        const memory = core.state.sharedContext || {};
        
        // 获取风格，如果为空则使用默认高级风格
        const currentStyle = memory.masterStyle || "Cinematic Realism / Roger Deakins";
        
        core.ui.log(`[巨灵核心] 正在调取视觉数据库...`, "mod");
        core.ui.log(`[光影罗盘] 校准至风格: ${currentStyle}`, "mod");
        
        setTimeout(() => {
            const shotList = this.generateCinematicPrompts(memory, currentStyle);
            core.ui.renderCodeCard("CINEMATOGRAPHY_MASTER_PROMPTS.TXT", shotList);
            core.ui.log(">> 视觉方案已根据[大师风格]完成渲染。", "sys");
        }, 1500);
    },

    generateCinematicPrompts: function(mem, style) {
        // 从记忆中提取视觉关键词，如果没生成则用默认的
        const visualTags = mem.visualTags ? mem.visualTags.join(", ") : "Cinematic, Detailed";
        const context = mem.summary || "A scene from the story";

        return `
/imagine prompt: 
[MASTER STYLE]: ${style}  <-- 核心：风格参数已注入
[SCENE]: ${context}
[ATMOSPHERE]: ${visualTags}
[COMPOSITION]: Wide shot, negative space, framing inspired by ${style}.
[LIGHTING]: Volumetric lighting, high contrast, matching the mood of ${mem.mood || "Drama"}.
[TECH]: ARRI Alexa 65, Panavision 70mm lens, 8k resolution, photorealistic.
--ar 2.39:1 --stylize 1000 --v 6.0

/imagine prompt:
[MASTER STYLE]: ${style}
[FOCUS]: Extreme close-up on protagonist's eyes, reflecting the environment.
[DETAILS]: Micro-details, skin texture, emotional depth.
[COLOR]: Color grading based on ${style}'s signature palette.
--ar 16:9 --style raw --v 6.0
        `;
    }
};
