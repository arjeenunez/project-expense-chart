const fetchData = async () => {
    const response = await fetch('./data.json');
    return response.json();
};

const createBarElement = (day, amount, height, isHighest) => {
    const barContainer = document.createElement('div');
    const dayLabel = document.createElement('span');
    const amountLabel = document.createElement('span');

    barContainer.classList.add('chart-bar');
    if (isHighest) barContainer.classList.add('bar-highest');

    dayLabel.classList.add('bar-text');
    dayLabel.textContent = day;

    amountLabel.classList.add('bar-amount');
    amountLabel.textContent = `$${amount}`;

    barContainer.style.height = `${height}%`;
    barContainer.append(dayLabel, amountLabel);

    return barContainer;
};

const renderChart = data => {
    const chartContainer = document.querySelector('.chart-chart');
    const highestAmount = Math.max(...data.map(item => +item.amount));

    data.forEach(({ day, amount }) => {
        const height = (+amount / highestAmount) * 100;
        const isHighest = +amount === highestAmount;
        const barElement = createBarElement(day, amount, height, isHighest);
        chartContainer.append(barElement);
    });
};

const initializeChart = async () => {
    const data = await fetchData();
    renderChart(data);
};

window.addEventListener('load', initializeChart);
