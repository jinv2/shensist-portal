/**
 * SI-OS Module: Narrative Arm (V1.2)
 * 职责：构建世界观，并写入共享记忆池
 */
window.ArmLiterature = {
    process: function(userInput, core) {
        core.ui.log(`[文学臂] 分析指令: "${userInput}"`, "mod");
        core.ui.log(`[文学臂] 正在写入共享记忆池 (Shared Memory)...`, "mod");

        setTimeout(() => {
            // 1. 生成设定
            const setting = this.generateSetting(userInput);
            
            // 2. 【关键】写入共享记忆
            core.state.sharedContext = {
                theme: "Cyberpunk / Glitch Art",
                visualTags: ["Neon", "Ruins", "Rain", "Chrome", "Hologram"],
                mood: "Melancholic but High-Energy",
                summary: userInput // 记住用户最初的话
            };

            // 3. 输出卡片
            core.ui.renderCodeCard("NARRATIVE_BLUEPRINT.TXT", setting);
            
            // 4. 提示下一步
            core.ui.log(">> 记忆已同步。视觉臂与声波臂可直接调用。", "sys");

        }, 1000);
    },

    generateSetting: function(input) {
        return `[TITLE]: ${input || "Untitled Project"}
[CORE]: Human consciousness uploaded to cloud, struggling for autonomy.
[CONFLICT]: The Grand Algorithm vs. The Glitch Rebels.
[SETTING]: 2049 Shanghai, underwater districts.
[KEYWORDS]: Neon, Rust, Data-Moshing, Bio-Digital.`;
    }
};
