/**
 * SI-OS Module: Head of Visual (巨灵·视觉核心)
 * 职责：统筹视觉工业。
 * 下辖六臂之二：
 * 3. [摄影臂] Cinematography (运镜/焦段/构图)
 * 4. [美术臂] Art Direction (色调/材质/光影)
 */

window.HeadVisual = {
    meta: {
        name: "Visual Director (JuLing)",
        version: "2.0 Pro"
    },

    process: function(userInput, core) {
        // 读取共享记忆
        const memory = core.state.sharedContext || {};
        const context = memory.summary || userInput;
        
        core.ui.log(`[巨灵核心] 读取剧本记忆: "${context.substring(0, 20)}..."`, "mod");
        
        // --- 唤醒 臂3：摄影臂 ---
        core.ui.log(`[臂3·摄影] 正在拆解分镜脚本 (Shot List)...`, "mod");
        
        setTimeout(() => {
            // 生成摄影指令
            const shotList = this.generateShotList(context, memory);
            core.ui.renderCodeCard("CINEMATOGRAPHY_SHOT_LIST.CSV", shotList);

            // --- 唤醒 臂4：美术臂 ---
            setTimeout(() => {
                core.ui.log(`[臂4·美术] 正在定义美学规范 (Art Bible)...`, "mod");
                const artStyle = this.generateArtBible(context, memory);
                core.ui.renderCodeCard("ART_DIRECTION_BIBLE.TXT", artStyle);
                
                core.ui.log(">> 视觉工业蓝图已交付。", "sys");
            }, 1000);

        }, 1500);
    },

    // 臂3逻辑：生成Midjourney/Sora的分镜代码
    generateShotList: function(ctx, mem) {
        return `
/imagine prompt: [ESTABLISHING SHOT] Wide angle, drone view of ${ctx}. Massive scale, sense of isolation. --ar 16:9
/imagine prompt: [MEDIUM SHOT] Over-the-shoulder view, focus on protagonist interactions. Depth of field f/2.8. --ar 2.39:1
/imagine prompt: [CLOSE UP] Extreme detail on mechanical eyes, displaying emotions of ${mem.mood || "conflict"}. Macro lens 100mm. --ar 16:9
/imagine prompt: [ACTION CAM] Dutch angle, motion blur, chaotic energy, handheld camera movement. --stylize 750
        `;
    },

    // 臂4逻辑：生成风格定义
    generateArtBible: function(ctx, mem) {
        return `
=== PROJECT ART BIBLE ===
[Color Palette]: Neon Cyan (#00F0FF), Void Black (#050505), Rust Orange (#FF4500)
[Texture]: Wet asphalt, brushed chrome, holographic transparency.
[Lighting Reference]: Blade Runner 2049 (Roger Deakins style), high contrast chiaroscuro.
[Atmosphere]: Dense volumetric fog, acid rain, bioluminescent pollution.
[Style Keywords]: ${mem.visualTags ? mem.visualTags.join(", ") : "Cyberpunk, Noir"}
        `;
    }
};
