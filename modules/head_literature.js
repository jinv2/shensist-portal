/**
 * SI-OS Module: Head of Literature (文曲星·文学核心)
 * 职责：影视工业级剧本开发。
 * 六臂职能：1. 剧本结构 (Structure)  2. 人物侧写 (Character)
 */

window.HeadLiterature = {
    meta: {
        name: "Narrative Engine Pro",
        version: "2.0 Industry Standard"
    },

    process: function(userInput, core) {
        // 1. 启动反馈
        core.ui.log(`[文曲核心] 正在解析 Logline: "${userInput}"`, "mod");
        core.ui.log(`[臂1·骨架] 正在调用《救猫咪》节拍表模型...`, "mod");
        
        // 模拟深度思考时间
        setTimeout(() => {
            // 2. 生成专业剧本大纲
            const beatSheet = this.generateBeatSheet(userInput);
            core.ui.renderCodeCard("SCREENPLAY_BEAT_SHEET.MD", beatSheet);
            
            // 3. 紧接着生成人物小传
            core.ui.log(`[臂2·血肉] 正在建立人物弧光矩阵...`, "mod");
            setTimeout(() => {
                const characters = this.generateCharacterProfile(userInput);
                core.ui.renderCodeCard("CHARACTER_BIBLE.JSON", characters);
                
                // 4. 写入共享记忆，供影视和音乐头使用
                core.state.sharedContext = {
                    theme: userInput,
                    structure: "Three-Act Structure",
                    mood: "Drama / Thriller" // 简化的情绪判断
                };
                core.ui.log(">> 文学地基已夯实。视觉头与听觉头已准备就绪。", "sys");
            }, 1000);

        }, 1500);
    },

    // --- 臂1：剧本结构生成器 (The Structure Arm) ---
    generateBeatSheet: function(input) {
        return `
# PROJECT: ${input}
## FORMAT: Feature Film / Pilot
## STRUCTURE: Save The Cat (布莱克·斯奈德节拍表)

### ACT I: The Setup (铺垫)
1. [Opening Image]: 展示主角在"旧世界"的现状，暗示核心缺陷。
2. [Theme Stated]: 配角无意中说出本片主题（关于"${input}"的真谛）。
3. [Catalyst (激励事件)]: 打破平衡的突发事件。
4. [Debate]: 主角抗拒改变，试图维持现状。

### ACT II: The Confrontation (对抗)
5. [Break into Two]: 主角主动选择进入"新世界"。
6. [B Story]: 开启副线（通常是爱情线或导师线）。
7. [Fun and Games]: 核心看点展示（预告片时刻）。
8. [Midpoint]: 伪胜利或伪失败，风险升级。
9. [Bad Guys Close In]: 反派（或核心冲突）开始反扑。
10. [All is Lost (一无所有)]: 主角失去一切，看似彻底失败。
11. [Dark Night of the Soul]: 主角在绝望中通过灵魂拷问获得顿悟。

### ACT III: The Resolution (结局)
12. [Finale]: 主角利用顿悟，用新方法解决终极危机。
13. [Final Image]: 与开场画面呼应，但展示主角的蜕变。
`;
    },

    // --- 臂2：人物小传生成器 (The Character Arm) ---
    generateCharacterProfile: function(input) {
        return `
{
  "PROTAGONIST (主角)": {
    "Archetype": "The Reluctant Hero (不情愿的英雄)",
    "Want (表层欲望)": "解决眼前的危机 (${input})",
    "Need (深层需求)": "战胜内心的恐惧/与自我和解",
    "Ghost (创伤阴影)": "过去发生的一件未解之事",
    "MBTI": "INTJ / ISTP"
  },
  "ANTAGONIST (反派)": {
    "Role": "Shadow Self (主角的阴暗面镜像)",
    "Motivation": "为了某种扭曲的正义或极致的贪婪",
    "Power": "控制着主角最缺乏的资源"
  },
  "RELATIONSHIP_ARC": {
    "Start": "冲突/误解",
    "Middle": "被迫合作/相互试探",
    "End": "牺牲/救赎"
  }
}
`;
    }
};
