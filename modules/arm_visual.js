/**
 * SI-OS Module: Visual Director (V1.2)
 * 职责：读取共享记忆，生成画面
 */
window.ArmVisual = {
    process: function(userInput, core) {
        // 1. 读取记忆
        const memory = core.state.sharedContext;
        let context = userInput;

        // 如果是一键模式，使用记忆
        if (userInput === "AUTO_GENERATE" && memory.theme) {
            core.ui.log(`[视觉臂] 检测到共享记忆: [${memory.theme}]`, "mod");
            context = memory.summary + " " + memory.visualTags.join(", ");
        }

        core.ui.log(`[视觉臂] 正在编译 Midjourney 指令...`, "mod");

        setTimeout(() => {
            const prompt = this.compilePrompt(context, memory);
            core.ui.renderCodeCard("MIDJOURNEY_PROMPT.CMD", prompt);
        }, 1000);
    },

    compilePrompt: function(context, memory) {
        // 使用记忆中的 tags
        const tags = memory.visualTags ? memory.visualTags.join(", ") : "Cyberpunk";
        return `/imagine prompt: 
[SUBJECT]: Cinematic shot of ${context || "future concept"}.
[ENVIRONMENT]: ${tags}, high tech low life, atmospheric fog.
[LIGHTING]: Volumetric lighting, bioluminescent accents.
[CAMERA]: ARRI Alexa 65, anamorphic lens, 8k resolution.
--v 6.0 --ar 16:9 --stylize 700`;
    }
};
