<template>
  <div id="chart-spark1">
    <apexchart
      type="area"
      height="50"
      style="min-width: 100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        },
      ],
      chartOptions: {
        chart: {
          type: "line",
          height: 35,
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#fff"],
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return "";
              },
            },
          },
          marker: {
            show: false,
          },
        },
      },
    };
  },
};
</script>

<style>
</style>