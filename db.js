// 📦 TianSuan 应用数据库
// 只有 onHome: true 的应用才会出现在 index.html 下方

const appDatabase = [
    // 1. Todo 应用 (设为 true，让它上首页)
    {
        name: "Todo Agent",
        icon: "✅",
        desc: "Minimalist task manager.",
        url: "https://neumorphism-todo.shensist.top",
        onHome: true  // <--- 这个开关决定它是否上首页
    },
    
    // 2. 示例：未来的音乐应用 (设为 false，只在仓库显示)
    {
        name: "AI Music",
        icon: "🎵",
        desc: "Generate infinite melodies.",
        url: "#",
        onHome: false // <--- 设为 false，首页就不会拥挤
    },

    // 3. 示例：未来的日历 (设为 false)
    {
        name: "AI Calendar",
        icon: "📅",
        desc: "Smart scheduling.",
        url: "#",
        onHome: false
    }
];
