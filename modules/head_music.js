/**
 * SI-OS Module: Head of Audio (夔牛·通感共振版)
 * 迭代目标：使用具体的物理材质声响来描述音乐，而非简单的乐器名。
 */

window.HeadMusic = {
    meta: {
        name: "Audio Director: Hans Zimmer Edition",
        version: "3.0"
    },

    process: function(userInput, core) {
        const memory = core.state.sharedContext || {};
        core.ui.log(`[夔牛核心] 正在进行[视觉->听觉]通感转化...`, "mod");
        
        setTimeout(() => {
            const score = this.composeAvantGardeScore(memory);
            core.ui.renderCodeCard("EXPERIMENTAL_SCORE_SHEET.TXT", score);
            core.ui.log(">> 听觉纹理已生成。", "sys");
        }, 1500);
    },

    composeAvantGardeScore: function(mem) {
        return `
[Concept]: "The Sound of Rotting Metal" (腐烂金属的声音)
[Reference]: Hans Zimmer (Dune) x Ryuichi Sakamoto (The Revenant)

[Instrumentation & Texture]:
1. **The Pad**: Time-stretched choir samples, processed to sound like wind howling through a tunnel.
2. **The Percussion**: No traditional drums. Use sounds of slamming car doors and breaking glass, heavily reverb-ed.
3. **The Lead**: A detuned Cello playing high harmonics, creating a sense of unease.

[Structure]:
- [0:00-0:40]: Silence interrupted by digital glitches. Heartbeat rhythm (60 BPM).
- [0:40-1:20]: The "Shepard Tone" illusion (feeling of constantly rising tension without pitch change).
- [1:20-End]: Sudden silence (The Vacuum).

[Suno Prompt]:
Experimental Ambient, Industrial Noise, Glitch, Detuned Cello, Dark Cinematic, Hans Zimmer style, Tension, No Drums.
        `;
    }
};
