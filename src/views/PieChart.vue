<template>
  <div ref="chart" style="width: 400px; height: 400px;"></div>
</template>

<script lang="ts">
import { yestodayGroudingMealDetail } from '@/api/index';
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'PieChart',
  setup() {
    const chart = ref<HTMLDivElement | null>(null);
    let myChart: echarts.ECharts | null = null;

    onMounted(async () => {
      const res = await yestodayGroudingMealDetail();
      const pieData = res.data;
      if (chart.value) {
        myChart = echarts.init(chart.value);
        const option = {
          series: [{
            type: 'pie',
            radius: ['0%', '58%'], // 调整饼图大小
            data: pieData,
            label: {
              normal: {
                show: true,
                position: 'outside', // 将标签放置在外侧
                formatter: '{b}: {c}'  // 显示标签和值
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 3,  // 调整引导线长度
                length2: 3  // 第二段引导线长度
              }
            }
          }],
          legend: {
            orient: 'horizontal', // 横向排列
            left: 'center',       // 在底部中间显示
            bottom: 'bottom',     // 定位在底部
            data: ['早餐', '午餐', '晚餐', '夜宵']
          }
        };

        myChart.setOption(option);
      }
    });

    return {
      chart
    };
  }
});
</script>
