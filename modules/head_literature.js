/**
 * SI-OS Module: Head of Literature (文曲·深度重构版 v1.6)
 * 迭代目标：保留哲学深度，同时支持大师风格 (Master Style) 的透传
 */

window.HeadLiterature = {
    meta: {
        name: "Narrative Engine: Philosopher Mode",
        version: "3.1 Style Aware"
    },

    process: function(userInput, core) {
        // 1. 获取核心层可能已经识别到的风格 (比如 "王家卫")
        // 如果用户没说风格，默认使用 "Philosophical / Avant-Garde" (哲学/先锋派)
        const currentStyle = core.state.sharedContext.masterStyle || "Philosophical / Avant-Garde";

        core.ui.log(`[文曲核心] 正在进行语义解构...`, "mod");
        core.ui.log(`[风格锚点] 已锁定: ${currentStyle}`, "mod");
        core.ui.log(`[思维链] 检索荣格十二原型... 匹配哲学母题...`, "mod");
        
        setTimeout(() => {
            // 生成深度剧本结构 (传入风格参数)
            const beatSheet = this.generateDeepBeatSheet(userInput, currentStyle);
            core.ui.renderCodeCard("MASTER_SCREENPLAY_STRUCTURE.MD", beatSheet);
            
            // 紧接着生成人物心理侧写
            setTimeout(() => {
                const characters = this.generatePsychoProfile(userInput);
                core.ui.renderCodeCard("CHARACTER_PSYCHOLOGY.JSON", characters);
                
                // 【核心修改点】写入共享记忆
                core.state.sharedContext = {
                    theme: userInput,
                    // 关键：将确定的风格写入记忆，供视觉头和音乐头读取
                    masterStyle: currentStyle, 
                    visualTags: ["Chiaroscuro (明暗对照法)", "Brutalism (野兽派建筑)", "Film Noir"],
                    mood: "Melancholic yet Euphoric (忧郁而狂喜)",
                    summary: userInput
                };
                core.ui.log(">> 文学内核已升维。风格参数已同步至 [巨灵] 与 [夔牛]。", "sys");
            }, 1200);

        }, 1500);
    },

    // --- 升级点：在大纲头部显示风格 ---
    generateDeepBeatSheet: function(input, style) {
        return `
# PROJECT CODE: ${input.substring(0, 10).toUpperCase()}...
## MASTER STYLE: ${style}  <-- 风格已注入剧本DNA
## THEME: The Paradox of Existence (存在的悖论)
## TONE: Elevating Horror / Speculative Fiction

### [ACT I: The Lie We Live] (我们生活的谎言)
1. **The Stasis (停滞)**: 主角处于一种"完美的痛苦"中。表面平衡，实则腐烂。
   > *Visual Metaphor*: A bird trapped in a cage made of light.
2. **The Inciting Incident (裂痕)**: 不是简单的事件，而是一个"无法忽视的疑问"打破了现实的各种维度。
   > *Key Line*: "The algorithm stopped counting."

### [ACT II: The Descent] (下坠与解构)
3. **The Antithesis (反题)**: 主角进入一个与旧世界逻辑完全相反的领域。物理法则失效，道德标准重组。
4. **The False Victory (伪胜利)**: 主角以为掌握了新世界的规则，但这只是深渊的诱饵。
5. **All Is Lost (灵魂暗夜)**: 不仅仅是失败，而是"信仰崩塌"。主角意识到自己追求的目标本身就是错误的。
   > *Philosophical Core*: Camus's Absurdity - 面对无意义世界的沉默。

### [ACT III: The Synthesis] (融合与升华)
6. **The Third Way (第三条路)**: 主角不再战胜反派，而是"理解"或"成为"反派，从而超越二元对立。
7. **The New Normal (新常态)**: 世界没有变好，但主角观看世界的眼睛变了。
   > *Closing Image*: A single flower blooming in a circuit board.
`;
    },

    // --- 升级点：基于心理学的人物侧写 (保持不变) ---
    generatePsychoProfile: function(input) {
        return `
{
  "PROTAGONIST (主角)": {
    "Archetype": "The Tragic Visionary (悲剧的远见者)",
    "Core Wound (核心创伤)": "被系统性地剥夺了爱的能力",
    "The Lie (深信的谎言)": "只要我足够理性，就不会受伤",
    "The Truth (真相)": "混乱才是生命的本质",
    "MBTI": "INFJ-T (倡导者/动荡)"
  },
  "ANTAGONIST (反派)": {
    "Concept": "Not a person, but an Ideology (非人，而是一种意识形态)",
    "Manifestation": "The relentless drive for Efficiency (对效率的无情追求)",
    "Seduction": "它承诺消除所有痛苦，代价是消除自由意志"
  },
  "AESTHETIC_MOODBOARD": {
    "Texture": "Rust, Glitch, Velvet, Concrete",
    "Color Psychology": "Cobalt Blue (Melancholy) pierced by Neon Pink (Artificial Hope)"
  }
}
`;
    }
};
