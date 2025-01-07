async function getJsonData() {
    try {
        const response = await fetch("https://264040.github.io/app_gj/js/jsons.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data, 1111); // 输出 JSON 数据

        // 动态生成选项卡
        function generateTabs(e) {
            const tabsContainer = document.getElementById('tabs');
            // 遍历 ipaData 创建选项卡
            Object.keys(data).forEach(key => {
                const tabBtn = document.createElement('div');
                tabBtn.classList.add('tab-btn');
                tabBtn.textContent = data[key].name;
                tabBtn.id = key + '-tab';
                tabBtn.onclick = () => showTab(key);
                tabsContainer.appendChild(tabBtn);
            });

            // 默认显示第一个选项卡
            const firstTab = Object.keys(data)[0];
            showTab(firstTab);
        }

        // 渲染音标按钮
        function renderIpaButtons(type) {
            const container = document.getElementById('ipa-container');
            container.innerHTML = ''; // 清空现有内容

            data[type].symbols.forEach(item => {
                const button = document.createElement('div');
                button.classList.add('ipa-btn');
                button.textContent = item.symbol;
                button.onclick = () => {
                    playSound(item.audio);
                    showDiagram(item.diagram);
                };
                container.appendChild(button);
            });
        }
        // ——————————————————————————————————————————————————————————————————————————
        // 显示图解
        function showDiagram(imagePath) {
            const diagramContainer = document.getElementById('diagram-container');
            diagramContainer.innerHTML = ''; // 清空图解容器

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = "音标图解";

            diagramContainer.appendChild(img);
        }

        // ————————————————————————————————————————————————————————————————————————————
        // 播放音标发音
        function playSound(file) {
            let audio = new Audio(file);
            audio.play();
        }

        // 切换选项卡
        function showTab(tabName) {
            // 隐藏所有选项卡内容
            let tabBtns = document.querySelectorAll('.tab-btn');
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });

            // 激活当前选项卡按钮
            let activeBtn = document.getElementById(tabName + '-tab');
            activeBtn.classList.add('active');

            // 渲染对应的音标按钮
            renderIpaButtons(tabName);
        }



        // 初始化页面
        generateTabs();
    } catch (error) {
        console.error('000', error);
    }
}

getJsonData();