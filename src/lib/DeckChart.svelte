<script lang="ts">
  import { browser } from '$app/env';
  import {onMount, onDestroy } from 'svelte';

  import type { HistoricDeckbotData } from '$lib/DeckTypes'

  import {
    Chart,
    registerables
  } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';

  Chart.register(... registerables, ChartDataLabels);

  export let historicData: HistoricDeckbotData[];

  let chart: Chart;
  let lineChart: HTMLCanvasElement;

  let data
  let config

  let percentages: [] = []
  let increases: [] = []
  let labels: string[] = []

  let showAllData = false
  let showFullYScale = false

  $: {
    const datacopy: HistoricDeckbotData[] = []

    let tempPercentages: [] = []
    let tempIncreases: [] = []
    let tempLabels: string[] = []

    const tempArray = historicData.slice(0, showAllData ? historicData.length - 1 : 7)
    tempArray.forEach((val) => datacopy.push(Object.assign({}, val)))

    datacopy.reverse().forEach((item) => {
      const monthDay = item.date.split('-')
      
      tempLabels.push(monthDay[1] + '-' + monthDay[2])
      if(item.elapsedTimePercentage) {
        tempPercentages.push(item.elapsedTimePercentage)
      } else {
        tempPercentages.push(null)
      }
      if(item.increasedPercentage) {
        tempIncreases.push(item.increasedPercentage)
      } else {
        tempIncreases.push(null)
      }

    });
    
    labels = tempLabels;
    increases = tempIncreases;
    percentages = tempPercentages;

    if (chart) {
      data.labels = labels;
      data.datasets[0].data = percentages;
      data.datasets[0].datalabels.display = !showAllData;
      data.datasets[1].data = increases;
      
      config.scales.y.suggestedMax =  showFullYScale ? 100 : undefined;
      config.scales.y1.suggestedMax = Math.max(...increases)*2;

      chart.data = data;
      chart.options = config;
      chart.update();
    }
  }

  onMount(() => {
    if(browser) {
      data = {
        labels: labels,
        datasets: [
          {
            label: 'Percentage',
            data: percentages,
            yAxisID: 'y',
            borderWidth: 2,
            borderColor: "#7cd6fd",
            backgroundColor: "#7cd6fd",
            pointRadius: 4,
            pointBorderColor: "#ffffff",
            tension: 0.3,
            spanGaps: true,
            fill: {
              target: 'origin',
              above: 'rgba(124, 214, 253, 0.2)'
            },
            datalabels: {
              display: !showAllData,
              color: '#000000',
              anchor: 'end',
              align: 'end',
              clamp: true,
              visibility: 'auto'
            }
          },
          {
            label: 'Increase',
            data: increases,
            yAxisID: 'y1',
            borderWidth: 2,
            borderColor: "#F5DE41",
            backgroundColor: "#F5DE41",
            pointRadius: 4,
            pointBorderColor: "#ffffff",
            tension: 0.3,
            spanGaps: true,
            datalabels: {
              display: false
            }
          }
        ]
      }
      config = {
        borderRadius: '30',
        responsive: true,
        aspectRatio: 1.3,
        cutout: '95%',
        spacing: 2,
        scales: {
          y: {
            title: {
              display: true,
              text: "Overall Percentage (%)"
            },
            type: 'linear',
            display: true,
            position: 'left',
            suggestedMax: showFullYScale ? 100 : undefined,
            ticks: {
              padding: 10
            }
          },
          y1: {
            title: {
              display: true,
              text: "Percent point increase"
            },
            type: 'linear',
            display: true,
            position: 'right',
            suggestedMax: Math.max(...increases)*2,
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              padding: 10
            }
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        layout: {
          padding: {
            top: 24,
            bottom: 8,
          }
        },
        plugins: {
          filler: {
            propagate: false,
          },
          tooltip: {
            enabled: true,
            position: 'nearest',
          },
          legend: {
            position: 'bottom',
            display: true,
            title: {
              display: true,
              text: "Date (Month-Day)"
            },
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 14
              }
            }
          }
        }
      }
      
      chart = new Chart(lineChart, {
        type: 'line',
        data: data,
        options: config
      })
    }
  });


  onDestroy(() => {
    if (chart) chart.destroy();
    chart = null;
  });

</script>
  
<canvas bind:this={lineChart} />

<div class="flex flex-row mt-3">
  <div class="basis-1/2">
    <label for="showAllData" class="flex flex-wrap items-center cursor-pointer relative">
      <input bind:checked={showAllData} type="checkbox" id="showAllData" class="sr-only" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full mr-3" />
      <span class="text-gray-900 text-sm font-medium">Show all data</span>
    </label>
  </div>
  <div class="basis-1/2">
    <label for="showFullYScale" class="flex flex-wrap items-center cursor-pointer relative">
      <input bind:checked={showFullYScale} type="checkbox" id="showFullYScale" class="sr-only" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full mr-3" />
      <span class="text-gray-900 text-sm font-medium">Full % scale</span>
    </label>
  </div>
</div>

<style>
  .toggle-bg:after {
    content: '';
    @apply absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm;
  }
  input:checked + .toggle-bg:after {
    transform: translateX(100%);
    @apply border-white;
  }
  input:checked + .toggle-bg {
    @apply bg-blue-600 border-blue-600;
  }
</style>
