document.addEventListener("DOMContentLoaded", function () {
    const sky = document.querySelector(".sky");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    setTimeout(() => {
        sky.style.background = "linear-gradient(to top, #FFA500, #87CEEB)";
        sun.style.bottom = "250px";
    }, 3000);

    setTimeout(() => {
        sky.style.background = "black";
        sun.style.bottom = "-150px";
        sun.style.opacity = "0";
        createStars();
    }, 8000);

    setTimeout(() => {
        moon.style.top = "50px";
        moon.style.opacity = "1";
        moveMoon();
    }, 12000);

    function createStars() {
        for (let i = 0; i < 120; i++) {
            setTimeout(() => {
                const star = document.createElement("div");
                star.classList.add("star");
                star.style.left = Math.random() * window.innerWidth + "px";
                star.style.top = Math.random() * window.innerHeight + "px";
                document.querySelector(".sky").appendChild(star);
                star.style.opacity = "1";
            }, i * 80);
        }
    }

    function moveMoon() {
        let positions = [
            { top: "50px", left: "30%" },
            { top: "100px", left: "70%" },
            { top: "150px", left: "50%" },
            { top: "250px", left: "20%" },
            { top: "350px", left: "80%" }
        ];
        let index = 0;

        setInterval(() => {
            if (index >= positions.length) index = 0;
            moon.style.top = positions[index].top;
            moon.style.left = positions[index].left;
            index++;
        }, 7000);
    }

    // Jelly Bean Logic
    let jellyBeans = [];
    const flavorInput = document.getElementById('flavor');
    const colorInput = document.getElementById('color');
    const addJellyBeanButton = document.getElementById('addJellyBean');
    const applyTestButton = document.getElementById('applyTest');
    const testResult = document.getElementById('testResult');
    const statisticsTable = document.getElementById('statisticsTable');
    const coverageChartCanvas = document.getElementById('coverageChart');
    const clearAllButton = document.getElementById('clearAll');
    let coverageChart;

    addJellyBeanButton.addEventListener('click', () => {
        const flavor = flavorInput.value.trim();
        const color = colorInput.value.trim();
        if (!flavor || !color) {
            alert('Please enter both flavor and color!');
            return;
        }
        jellyBeans.push({ flavor, color });
        updateStatisticsTable();
        updatePieChart();
        flavorInput.value = '';
        colorInput.value = '';
    });

    clearAllButton.addEventListener('click', () => {
        jellyBeans = [];
        updateStatisticsTable();
        updatePieChart();
    });

    applyTestButton.addEventListener('click', () => {
        const totalJellyBeans = jellyBeans.length;
        const uniqueColors = [...new Set(jellyBeans.map(jb => jb.color))].length;
        testResult.textContent = `Total Jelly Beans: ${totalJellyBeans}, Unique Colors: ${uniqueColors}`;
    });

    function updateStatisticsTable() {
        statisticsTable.innerHTML = '';
        jellyBeans.forEach((jb, index) => {
            const row = `<tr>
                <td class='border px-4 py-2'>${jb.flavor}</td>
                <td class='border px-4 py-2'>${jb.color}</td>
                <td class='border px-4 py-2'>
                    <button onclick='deleteJellyBean(${index})' class='bg-red-500 text-white px-2 py-1 rounded text-sm'>Delete</button>
                </td>
            </tr>`;
            statisticsTable.innerHTML += row;
        });
    }

    window.deleteJellyBean = function(index) {
        jellyBeans.splice(index, 1);
        updateStatisticsTable();
        updatePieChart();
    };

    function updatePieChart() {
        const colorCounts = {};
        jellyBeans.forEach(jb => {
            colorCounts[jb.color] = (colorCounts[jb.color] || 0) + 1;
        });
        const colors = Object.keys(colorCounts);
        const counts = Object.values(colorCounts);
        if (coverageChart) {
            coverageChart.destroy();
        }
        coverageChart = new Chart(coverageChartCanvas, {
            type: 'pie',
            data: {
                labels: colors,
                datasets: [{
                    data: counts,
                    backgroundColor: colors,
                }]
            }
        });
    }

    // Theme Selector Initialization
    const themeSelector = document.getElementById('theme-selector');
    const savedTheme = localStorage.getItem('selectedTheme') || 'white';
    themeSelector.value = savedTheme;
    changeTheme(savedTheme);
});

function changeTheme(theme) {
    const themes = {
        white: "bg-white text-gray-900",
        dark: "bg-gray-900 text-white",
        blue: "bg-blue-500 text-white",
        green: "bg-green-500 text-white",
        purple: "bg-purple-500 text-white"
    };
    document.body.className = themes[theme] || themes.white;
    localStorage.setItem('selectedTheme', theme);
}