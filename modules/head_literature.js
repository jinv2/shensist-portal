/**
 * SI-OS Module: Head of Literature (文曲·深度重构版)
 * 迭代目标：注入哲学深度、戏剧悖论与行业级审美。
 */

window.HeadLiterature = {
    meta: {
        name: "Narrative Engine: Philosopher Mode",
        version: "3.0 Master Class"
    },

    process: function(userInput, core) {
        core.ui.log(`[文曲核心] 正在进行语义解构...`, "mod");
        core.ui.log(`[思维链] 检索荣格十二原型... 匹配哲学母题...`, "mod");
        
        setTimeout(() => {
            // 生成深度剧本结构
            const beatSheet = this.generateDeepBeatSheet(userInput);
            core.ui.renderCodeCard("MASTER_SCREENPLAY_STRUCTURE.MD", beatSheet);
            
            // 紧接着生成人物心理侧写
            setTimeout(() => {
                const characters = this.generatePsychoProfile(userInput);
                core.ui.renderCodeCard("CHARACTER_PSYCHOLOGY.JSON", characters);
                
                // 写入更复杂的共享记忆，包含情绪色板
                core.state.sharedContext = {
                    theme: userInput,
                    visualTags: ["Chiaroscuro (明暗对照法)", "Brutalism (野兽派建筑)", "Film Noir"],
                    mood: "Melancholic yet Euphoric (忧郁而狂喜)",
                    summary: userInput
                };
                core.ui.log(">> 文学内核已升维。等待视觉/听觉通感转化。", "sys");
            }, 1200);

        }, 1500);
    },

    // --- 升级点：不再是简单的三幕式，而是带有人性洞察的结构 ---
    generateDeepBeatSheet: function(input) {
        return `
# PROJECT CODE: ${input.substring(0, 10).toUpperCase()}...
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

    // --- 升级点：基于心理学的人物侧写 ---
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
