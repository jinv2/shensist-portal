/**
 * SI-OS Module: Head of Audio (夔牛·听觉核心)
 * 职责：统筹声景工程。
 * 下辖六臂之三：
 * 5. [乐理臂] Composition (旋律/和声/编曲)
 * 6. [音效臂] Foley & SFX (拟音/环境/特效)
 */

window.HeadMusic = {
    meta: {
        name: "Audio Director (KuiNiu)",
        version: "2.0 Pro"
    },

    process: function(userInput, core) {
        const memory = core.state.sharedContext || {};
        const mood = memory.mood || "Cinematic";

        core.ui.log(`[夔牛核心] 同步情绪频率: [${mood}]`, "mod");

        // --- 唤醒 臂5：乐理臂 ---
        core.ui.log(`[臂5·乐理] 正在量化编曲结构 (Suno Protocol)...`, "mod");
        
        setTimeout(() => {
            const musicStructure = this.composeMusic(mood);
            core.ui.renderCodeCard("MUSIC_COMPOSITION_SHEET.TXT", musicStructure);

            // --- 唤醒 臂6：音效臂 ---
            setTimeout(() => {
                core.ui.log(`[臂6·音效] 正在采样环境拟音 (Foley Layer)...`, "mod");
                const foleyList = this.generateFoley(mood);
                core.ui.renderCodeCard("FOLEY_SFX_LIST.XML", foleyList);
                
                core.ui.log(">> 声景工程蓝图已交付。", "sys");
            }, 1000);

        }, 1500);
    },

    // 臂5逻辑：Suno 结构
    composeMusic: function(mood) {
        return `
[Genre]: ${mood}, Hybrid Orchestral, Glitch Texture
[BPM]: Variable (Starts 80, drops to 140)
[Instrumentation]: 
- Lead: Distorted Cello & Analog Synths
- Rhythm: Industrial Metallic Percussion
[Structure]:
- 0:00 Intro: Low hum, distant sirens.
- 0:45 Build: Arpeggiator enters, tension rising.
- 1:30 Drop: Heavy bass impact, chaotic glitch beats.
- 3:00 Outro: Resolving to a single piano note.
        `;
    },

    // 臂6逻辑：音效列表
    generateFoley: function(mood) {
        return `
<SFX_CUE_LIST>
  <Cue id="01" type="Ambience">Heavy rain on metal roof, distant thunder.</Cue>
  <Cue id="02" type="Foley">Wet footsteps on concrete, leather jacket squeaks.</Cue>
  <Cue id="03" type="UI_Sound">Holographic interface startup (high pitch chirp).</Cue>
  <Cue id="04" type="Weapon">Plasma charge up (rising frequency) + Discharge (bass thud).</Cue>
  <Cue id="05" type="Texture">Digital interference static noise (underlying layer).</Cue>
</SFX_CUE_LIST>
        `;
    }
};
