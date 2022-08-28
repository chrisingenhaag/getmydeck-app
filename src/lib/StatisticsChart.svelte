<script lang="ts">
  import { browser } from '$app/env';
  import {onMount, onDestroy } from 'svelte';

  import type { SummaryResponse } from '$lib/DeckSummaryTypes'
  import type { Region, Version } from './DeckTypes';

  import {
    Chart,
    registerables
  } from 'chart.js';

  Chart.register(... registerables);

  export let summaryData: SummaryResponse;

  let colors = {
    'EU': {
      '64': '#156DE0',
      '256': '#0E4EA1',
      '512': '#092F61'
    },
    'UK': {
      '64': '#E04700',
      '256': '#A13300',
      '512': '#662100'
    },
    'US': {
      '64': '#1CE002',
      '256': '#14A102',
      '512': '#0C6601'
    }
  }

  let statChart: Chart;
  let statChartElement: HTMLCanvasElement;

  let data
  let config

  let labels: string[] = []
  let values: Date[] = []

  let showEU: boolean = true
  let showUS: boolean = true
  let showUK: boolean = true

  $: {
    let tempLabels: string[] = summaryData.allDays
    labels = tempLabels

    let dataSetArray: {}[] = []

    let regions: Region[] = []
    if(showEU) regions.push('EU');
    if(showUS) regions.push('US');
    if(showUK) regions.push('UK');

    let versions: Version[] = ['64','256','512']

    regions.forEach(region => {      
      versions.forEach(version => {
        let tempvalues: Date[] = []
        
        tempLabels.forEach(day => {
          let dayData = summaryData.summary[region][version].entries[day]
          if(dayData) {
            tempvalues.push(Date.parse(dayData.lastOrderDate))
          } else {
            tempvalues.push(null)
          }
        });
        
        values = tempvalues
        let dataSetObject = {
          label: region + ' ' + version + 'GB',
          data: values,
          yAxisID: 'y',
          borderWidth: 1,
          pointRadius: 0,
          tension: 0.3,
          borderColor: colors[region][version],
          backgroundColor: colors[region][version],
          pointBorderColor: "#ffffff",
          spanGaps: true,
          datalabels: {
              display: false
          }
        }

        dataSetArray.push(dataSetObject)
      })
    })


    if (statChart) {
      data.labels = labels
      data.datasets = dataSetArray
      
      statChart.data = data
      statChart.options = config
      statChart.update()
    }
  }

  onMount(() => {
    if(browser) {
      data = {
        labels: labels,
        datasets: []
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
              text: "Last order date"
            },
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              padding: 10,
              callback: function(value, index, ticks) { return new Date(value).toISOString().substring(0,10)},
              stepSize: 2592000000
            }
          }
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
            callbacks: {
              beforeTitle: function(context) {
                return 'Latest known order on'
              } ,
              label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Date(context.parsed.y).toISOString();
                }
                return label;
              }
            }
          },
          legend: {
            position: 'bottom',
            display: true,
            title: {
              display: true,
              text: "Email batch day"
            }
          }
        }
      }
      
      statChart = new Chart(statChartElement, {
        type: 'line',
        data: data,
        options: config
      })
    }
  })


  onDestroy(() => {
    if (statChart) statChart.destroy();
    statChart = null;
  })

</script>

<canvas bind:this={statChartElement} />

<div class="flex flex-row my-3">
  <div class="pr-3">
    <label for="showUS" class="flex flex-wrap items-center cursor-pointer relative">
      <input bind:checked={showUS} type="checkbox" id="showUS" class="sr-only" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full mr-3" />
      <span class="text-gray-900 text-sm font-medium">US</span>
    </label>
  </div>
  <div class="pr-3">
    <label for="showUK" class="flex flex-wrap items-center cursor-pointer relative">
      <input bind:checked={showUK} type="checkbox" id="showUK" class="sr-only" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full mr-3" />
      <span class="text-gray-900 text-sm font-medium">UK</span>
    </label>
  </div>
  <div class="">
    <label for="showEU" class="flex flex-wrap items-center cursor-pointer relative">
      <input bind:checked={showEU} type="checkbox" id="showEU" class="sr-only" />
      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full mr-3" />
      <span class="text-gray-900 text-sm font-medium">EU</span>
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
