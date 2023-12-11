<template>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script lang="ts">
import { tenDayMealDetail } from '@/api/index';
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  setup() {
    const chartRef = ref<HTMLElement | null>(null);
    let myChart: echarts.ECharts | null = null;

    onMounted(async () => {
      const res = await tenDayMealDetail();
      const linedate = res.data.linedate;
      const lineNum = res.data.lineNum;
      if (chartRef.value) {
        myChart = echarts.init(chartRef.value);
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: linedate
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          series: [{
            data: lineNum,
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          }]
        });
      }

      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart);
      myChart?.dispose();
    });

    const resizeChart = () => {
      myChart?.resize();
    };

    return { chartRef };
  },
});
</script>

<style scoped>
/* 你可以在这里添加 CSS 样式 */
</style>
