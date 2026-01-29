/**
 * SI-OS Module: Head of Literature (文曲·最终完整版 v4.0)
 * 职责：输出文学系的3项核心资产 (Concept -> Structure -> Character)
 */

window.HeadLiterature = {
    meta: {
        name: "Narrative Engine: Philosopher Mode",
        version: "4.0 Full Matrix"
    },

    process: function(userInput, core) {
        // 1. 获取风格 (SORA2 甲板传入)
        const currentStyle = core.state.sharedContext.masterStyle || "High Concept / Philosophical";

        core.ui.log(`[文曲核心] 启动... 风格锚点: ${currentStyle}`, "mod");
        
        // === 输出 1: [HEAD] 核心概念 (立即生成) ===
        const coreConcept = this.generateLogline(userInput, currentStyle);
        core.ui.renderCodeCard("1_LOGLINE_CORE.MD", coreConcept);

        // 模拟思考延迟
        setTimeout(() => {
            // === 输出 2: [ARM 1] 剧本结构 (骨架) ===
            core.ui.log(`[文学臂·壹] 构建叙事骨架...`, "mod");
            const beatSheet = this.generateDeepBeatSheet(userInput, currentStyle);
            core.ui.renderCodeCard("2_BEAT_SHEET.MD", beatSheet);
            
            setTimeout(() => {
                // === 输出 3: [ARM 2] 人物小传 (血肉) ===
                core.ui.log(`[文学臂·贰] 注入人物灵魂...`, "mod");
                const characters = this.generatePsychoProfile(userInput);
                core.ui.renderCodeCard("3_CHARACTER_BIBLE.JSON", characters);
                
                // 写入共享记忆，供后续 Visual 和 Music 模块使用
                core.state.sharedContext = {
                    theme: userInput,
                    masterStyle: currentStyle,
                    visualTags: ["Chiaroscuro", "Cinematic", "Atmospheric", currentStyle], // 传递风格tag
                    mood: "Complex & Evolving",
                    summary: userInput
                };
                core.ui.log(">> [文曲] 任务完成。文学资产 (3/3) 已交付。", "sys");
            }, 800); // 间隔 0.8秒

        }, 800); // 间隔 0.8秒
    },

    // --- [1] 生成核心概念 (Logline) ---
    generateLogline: function(input, style) {
        return `
# PROJECT: ${input.substring(0, 15).toUpperCase()}...
## STRATEGY: High Concept Pitch
## STYLE: ${style}

> **LOGLINE**: 
> "In a world where ${input} defies the laws of reality, a fractured soul must confront the paradox of existence before the silence consumes everything."

**CORE THEMES**:
- The fragility of memory vs. the permanence of data.
- Entropy as a form of art.
- ${style} aesthetics applied to human suffering.

**TARGET AUDIENCE**: 
- A24 / HBO Prestige Drama viewers.
`;
    },

    // --- [2] 生成剧本结构 (Beat Sheet) ---
    generateDeepBeatSheet: function(input, style) {
        return `
## NARRATIVE STRUCTURE: Save The Cat (Deconstructed)
## TONE: ${style} / Elevating Horror

### [ACT I: The Stasis]
1. **The Ghost**: 主角在一个看似完美的${style}风格世界中，感觉到一种难以名状的违和感。
   > *Visual*: A glitch in the morning coffee steam.
2. **The Catalyst**: "${input}" 作为一个不可思议的事件发生了，打破了物理法则。

### [ACT II: The Antithesis]
3. **Fun & Games**: 主角探索这个新世界的规则。视觉风格从写实转为超现实 (${style} distortion)。
4. **Midpoint**: 巨大的转折。主角发现自己追求的目标（寻找${input}）其实是一个陷阱。
5. **Dark Night of the Soul**: 彻底的绝望。不是被打败，而是被"虚无"吞噬。

### [ACT III: The Synthesis]
6. **The Third Way**: 主角接受了混乱。不再试图修复世界，而是让自己进化。
7. **Final Image**: 与开场呼应，但充满了新的、令人不安的生机。
`;
    },

    // --- [3] 生成人物小传 (Character Bible) ---
    generatePsychoProfile: function(input) {
        return `
{
  "PROTAGONIST (主角)": {
    "Archetype": "The Tragic Visionary",
    "Core Wound": "被系统性地剥夺了爱的能力",
    "The Lie": "只要我足够理性，就不会受伤",
    "The Truth": "混乱才是生命的本质",
    "MBTI": "INFJ-T"
  },
  "ANTAGONIST (反派)": {
    "Concept": "Not a person, but an Ideology",
    "Manifestation": "The relentless drive for Efficiency",
    "Seduction": "它承诺消除所有痛苦，代价是消除自由意志"
  },
  "RELATIONSHIP_DYNAMIC": {
    "Type": "Mirror Image (镜像关系)",
    "Evolution": "Enemy -> Teacher -> Part of Self"
  }
}
`;
    }
};
