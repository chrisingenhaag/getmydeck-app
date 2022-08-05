<script lang="ts">
  import type { HistoricDeckbotData } from '$lib/DeckTypes'

  import { Line } from 'svelte-chartjs'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  export let historicData: HistoricDeckbotData[];

  let data
  let config

  let showAllData = false
  let showFullYScale = false

  $: {
    const datacopy: HistoricDeckbotData[] = []

    let percentages: number[] = []
    let increases: number[] = []
    let labels: string[] = []

    const tempArray = historicData.slice(0, showAllData ? historicData.length - 1 : 7)
    tempArray.forEach((val) => datacopy.push(Object.assign({}, val)))

    datacopy.reverse().forEach((item) => {
      const monthDay = item.date.split('-')
      
      labels.push(monthDay[1] + '-' + monthDay[2])
      percentages.push(item.elapsedTimePercentage)
      increases.push(item.increasedPercentage)

    });
    
    data = {
      labels: labels,
      datasets: [
        {
          label: 'Percentage',
          data: percentages,
          yAxisID: 'y',
          borderColor: "#7cd6fd",
          backgroundColor: "#7cd6fd",
          tension: 0.4
        },
        {
          label: 'Increase',
          data: increases,
          yAxisID: 'y1',
          borderColor: "#F5DE41",
          backgroundColor: "#F5DE41",
          tension: 0.4
        }
      ]
    }

    config = {
      borderRadius: '30',
      responsive: true,
      cutout: '95%',
      spacing: 2,
      scales: {
        y: {
          title: {
            display: true,
            text: "Overall Percentage per batch (%)"
          },
          type: 'linear',
          display: true,
          position: 'left',
          suggestedMax: showFullYScale ? 100 : undefined
        },
        y1: {
          title: {
            display: true,
            text: "Increase per batch (%)"
          },
          type: 'linear',
          display: true,
          position: 'right',
          suggestedMax: Math.max(...increases)*2,
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
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
    };


    if (showFullYScale) {
    
    } else {
    
    }
  }
</script>

{#if data}
  
  <Line {data} options={config} />

  <div class="flex flex-row mt-3">
    <div class="basis-1/2">
      <label for="showAllData" class="flex items-center cursor-pointer relative">
        <input bind:checked={showAllData} type="checkbox" id="showAllData" class="sr-only" />
        <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
        <span class="ml-3 text-gray-900 text-sm font-medium">Show all data</span>
      </label>
    </div>
    <div class="basis-1/2">
      <label for="showFullYScale" class="flex items-center cursor-pointer relative">
        <input bind:checked={showFullYScale} type="checkbox" id="showFullYScale" class="sr-only" />
        <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
        <span class="ml-3 text-gray-900 text-sm font-medium">Full % scale</span>
      </label>
    </div>
  </div>
{/if}

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
