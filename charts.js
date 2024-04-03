function renderChart(p) {
    let pokemon = pokemons[p];
    let hp = pokemon['stats'][0]['base_stat'];
    let attack = pokemon['stats'][1]['base_stat'];
    let defense = pokemon['stats'][2]['base_stat'];
    let spAttack = pokemon['stats'][3]['base_stat'];
    let spDefense = pokemon['stats'][4]['base_stat'];
    let speed = pokemon['stats'][5]['base_stat'];
    const ctx = document.getElementById('myChart');
    Chart.defaults.font.size = 16;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [`HP ${hp}`, `Attack ${attack}`, `Defense ${defense}`, `Sp. Attack ${spAttack}`, `Sp.Defense ${spDefense}`, `Speed ${speed}`],
            datasets: [{
                data: [`${hp}`, `${attack}`, `${defense}`, `${spAttack}`, `${spDefense}`, `${speed}`],
                backgroundColor: [
                    'rgba(0, 0, 0)',
                    'rgba(255, 0, 0, 0.75)',
                    'rgba(71, 149, 30, 0.75)',
                    'rgba(133, 30, 149, 0.75)',
                    'rgba(230, 210, 23, 0.75)',
                    'rgba(0, 64, 255, 0.75)'
                ],
                borderWidth: 2,
            }]
        },
        options: {
            events: [],
            scales: {
                x: {
                    min: 0,
                    max: 200,
                    ticks: {
                        display: false,
                        font: {
                            family: 'Courier New',
                            size: 15,
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false,
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        color: 'black',
                        font: {
                            family: 'Courier New',
                            size: 15,
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false,
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',

        },
    });
}