document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("theme-selector");
    const sky = document.querySelector(".sky");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");
    const flavorInput = document.getElementById("flavor");
    const colorInput = document.getElementById("color");
    const addJellyBeanButton = document.getElementById("addJellyBean");
    const applyTestButton = document.getElementById("applyTest");
    const testResult = document.getElementById("testResult");
    const statisticsTable = document.getElementById("statisticsTable");
    const coverageChartCanvas = document.getElementById("coverageChart");
    const clearAllButton = document.getElementById("clearAll");
    
    let jellyBeans = [];
    let coverageChart;

    // ✅ Load the saved theme from local storage
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        document.body.classList.add(savedTheme + "-theme");
        if (themeSelector) themeSelector.value = savedTheme;
    }

    // ✅ Theme Selection
    if (themeSelector) {
        themeSelector.addEventListener("change", function () {
            document.body.classList.remove("white-theme", "dark-theme", "blue-theme", "green-theme", "purple-theme");
            document.body.classList.add(this.value + "-theme");
            localStorage.setItem("selectedTheme", this.value);
        });
    }

    // ✅ Day-Night Transition
    if (sky && sun && moon) {
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
    }

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

    // ✅ Jelly Bean Logic
    if (addJellyBeanButton && applyTestButton && clearAllButton) {
        addJellyBeanButton.addEventListener("click", () => {
            const flavor = flavorInput.value.trim();
            const color = colorInput.value.trim();
            if (!flavor || !color) {
                alert("Please enter both flavor and color!");
                return;
            }
            jellyBeans.push({ flavor, color });
            updateStatisticsTable();
            updatePieChart();
            flavorInput.value = "";
            colorInput.value = "";
        });

        clearAllButton.addEventListener("click", () => {
            jellyBeans = [];
            updateStatisticsTable();
            updatePieChart();
        });

        applyTestButton.addEventListener("click", () => {
            const totalJellyBeans = jellyBeans.length;
            const uniqueColors = [...new Set(jellyBeans.map((jb) => jb.color))].length;
            testResult.textContent = `Total Jelly Beans: ${totalJellyBeans}, Unique Colors: ${uniqueColors}`;
        });
    }

    function updateStatisticsTable() {
        let rows = jellyBeans
            .map(
                (jb, index) =>
                    `<tr>
                        <td>${jb.flavor}</td>
                        <td>${jb.color}</td>
                        <td><button onclick="deleteJellyBean(${index})">Delete</button></td>
                    </tr>`
            )
            .join("");
        statisticsTable.innerHTML = rows;
    }

    window.deleteJellyBean = function (index) {
        jellyBeans.splice(index, 1);
        updateStatisticsTable();
        updatePieChart();
    };

    function updatePieChart() {
        if (!coverageChartCanvas || typeof Chart === "undefined") return;

        const colorCounts = {};
        jellyBeans.forEach((jb) => {
            colorCounts[jb.color] = (colorCounts[jb.color] || 0) + 1;
        });
        const colors = Object.keys(colorCounts);
        const counts = Object.values(colorCounts);

        if (coverageChart) {
            coverageChart.destroy();
        }

        coverageChart = new Chart(coverageChartCanvas, {
            type: "pie",
            data: {
                labels: colors,
                datasets: [
                    {
                        data: counts,
                        backgroundColor: colors
                    }
                ]
            }
        });
    }
});
