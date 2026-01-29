/**
 * SI-OS Module: Head of Audio (夔牛·最终完整版 v4.0)
 * 职责：输出听觉系的3项核心资产 (Concept -> Score -> Foley)
 */

window.HeadMusic = {
    meta: {
        name: "Audio Director: Hans Zimmer Edition",
        version: "4.0 Full Matrix"
    },

    process: function(userInput, core) {
        // 读取记忆
        const mem = core.state.sharedContext || {};
        const style = mem.masterStyle || "Cinematic";
        const mood = mem.mood || "Atmospheric";

        core.ui.log(`[夔牛核心] 启动... 正在进行[视觉->听觉]通感转化...`, "mod");

        // === 输出 7: [HEAD] 听觉概念 (Sonic Concept) ===
        const concept = this.generateSonicConcept(style, mood);
        core.ui.renderCodeCard("7_SONIC_CONCEPT.TXT", concept);

        // 模拟思考延迟
        setTimeout(() => {
            // === 输出 8: [ARM 5] 编曲结构 (Composition) ===
            core.ui.log(`[听觉臂·伍] 量化乐理结构...`, "mod");
            const score = this.composeScore(mem, style);
            core.ui.renderCodeCard("8_MUSICAL_SCORE.TXT", score);

            setTimeout(() => {
                // === 输出 9: [ARM 6] 音效拟音 (Foley/SFX) ===
                core.ui.log(`[听觉臂·陆] 采样环境物理音...`, "mod");
                const foley = this.generateFoley(style);
                core.ui.renderCodeCard("9_FOLEY_SFX_LIST.XML", foley);
                
                core.ui.log(">>> [夔牛] 任务完成。听觉资产 (3/3) 已交付。", "sys");
                core.ui.log("==========================================", "sys");
                core.ui.log("★ 全流程闭环完成。9项核心资产已生成完毕。", "sys");
            }, 800); // 间隔 0.8秒

        }, 800); // 间隔 0.8秒
    },

    // --- [7] 生成听觉概念 (Sonic Concept) ---
    generateSonicConcept: function(style, mood) {
        return `
=== SONIC PHILOSOPHY ===
[MASTER STYLE]: ${style}
[EMOTIONAL KEY]: ${mood}

[ACOUSTIC TEXTURE]:
- "The Sound of Rotting Metal" vs "Glass Fragility"
- Frequency Range: Heavy emphasis on Sub-Bass (20-60Hz) for physical impact.
- Spatial Audio: Wide stereo image, immersive reverb tails (Cathedral setting).

[REFERENCE TRACKS]:
- Hans Zimmer (Dune) - For texture and scale.
- Ryuichi Sakamoto (The Revenant) - For isolation and detail.
- Hildur Guðnadóttir (Chernobyl) - For industrial sampling.
`;
    },

    // --- [8] 生成编曲结构 (Musical Score & Prompts) ---
    composeScore: function(mem, style) {
        return `
[COMPOSITION STRUCTURE]
BPM: Variable (Starts 60, ramps to 120, drops to 0)
Scale: D Minor (The saddest key) -> Modulating to F Major (False hope)

1. **The Pad**: Time-stretched choir samples, processed to sound like wind howling.
2. **The Lead**: A detuned Cello playing high harmonics (sul ponticello).
3. **The Pulse**: No traditional drums. Use sounds of heartbeats and distant machinery.

[SUNO / UDIO PROMPT]:
${style}, ${mem.mood}, Experimental Ambient, Industrial Noise, Glitch, Detuned Cello, Dark Cinematic, Hans Zimmer style, Tension, No Drums, High Fidelity, 8k audio.
`;
    },

    // --- [9] 生成音效拟音表 (Foley List) ---
    generateFoley: function(style) {
        return `
<SFX_CUE_LIST>
  <Cue id="AMB_01">Heavy rain hitting a corrugated metal roof (High frequency).</Cue>
  <Cue id="AMB_02">Distant city hum / Traffic drone (Low frequency bed).</Cue>
  
  <Cue id="FX_01">Neon light buzzing (50Hz hum) with intermittent crackle.</Cue>
  <Cue id="FX_02">Wet footsteps on concrete (Gritty texture).</Cue>
  <Cue id="FX_03">Fabric rustle: Synthetic tactical gear movement.</Cue>
  
  <Cue id="ABS_01">"The Glitch": Digital interference sound when the protagonist realizes the truth.</Cue>
</SFX_CUE_LIST>
`;
    }
};
