/**
 * SI-OS Module: Head of Visual (巨灵·大师光影版)
 * 迭代目标：引入电影摄影机参数、艺术流派与光影质感。
 */

window.HeadVisual = {
    meta: {
        name: "Visual Director: Cinema Mode",
        version: "3.0 Roger Deakins Edition"
    },

    process: function(userInput, core) {
        const memory = core.state.sharedContext || {};
        core.ui.log(`[巨灵核心] 调取电影摄影数据库...`, "mod");
        
        setTimeout(() => {
            const shotList = this.generateCinematicPrompts(memory);
            core.ui.renderCodeCard("CINEMATOGRAPHY_MASTER_PROMPTS.TXT", shotList);
            core.ui.log(">> 视觉方案已从[描述]升级为[艺术指导]。", "sys");
        }, 1500);
    },

    generateCinematicPrompts: function(mem) {
        // 这里的提示词必须极度专业，带有艺术参考
        return `
/imagine prompt: 
[COMPOSITION]: Ultra-wide shot, extreme negative space, isolationist composition inspired by Edward Hopper.
[SUBJECT]: The protagonist standing on the edge of a brutalist megastructure.
[LIGHTING]: Chiaroscuro lighting (Rembrandt style), harsh shadows, soft volumetric god-rays cutting through smog.
[COLOR]: Teal and Orange grading, desaturated, high contrast.
[TEXTURE]: Dirty lens, film grain (Kodak Portra 400), chromatic aberration, anamorphic lens flares.
[RENDER]: Unreal Engine 5, Octane Render, 8k, hyper-realistic.
--ar 2.39:1 --stylize 1000 --v 6.0

/imagine prompt:
[COMPOSITION]: Dutch angle, claustrophobic close-up.
[SUBJECT]: Cybernetic eye dilating, reflecting neon kanji signs.
[STYLE]: Ghost in the Shell (1995) anime aesthetic mixed with Blade Runner live action.
[TECH]: Macro lens 100mm, f/1.2 depth of field, bokeh background.
--ar 16:9 --nji 6
        `;
    }
};
