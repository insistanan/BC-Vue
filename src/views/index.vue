<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" style="padding-left: 20px">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>用餐情况</span>
            </div>
          </template>
          <div class="card-content">
            <div class="ant-col ant-col-6"><h2  class="item-title">用餐份数</h2><h2 class="item-data">0</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">报餐份数</h2><h2 class="item-data">0</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">退餐率</h2><h2 class="item-data">0</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">人均餐费</h2><h2 class="item-data">0</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">已退餐</h2><h2 class="item-data">0</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">评价数量</h2><h2 class="item-data">0</h2></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="16" style="padding-left: 20px">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>近十日报餐营收</span>
            </div>
          </template>
          <div class="chart-container">
            <div ref="chart" class="chart" id="chart"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index" lang="ts">
import axios from 'axios';
import * as echarts from 'echarts';

const reportMealsCount = ref(0) // Replace 0 with the actual value
const consumedMealsCount = ref(0) // Replace 0 with the actual value
const returnMealRate = ref(0) // Replace 0 with the actual value
const averageMealCost = ref(0) // Replace 0 with the actual value

const data = {
  chartData: [
    { time: '2022-01-01', amount: 200 },
    { time: '2022-01-02', amount: 220 },
    { time: '2022-01-03', amount: 250 },
    { time: '2022-01-04', amount: 180 },
    { time: '2022-01-05', amount: 210 },
    { time: '2022-01-06', amount: 190 },
    { time: '2022-01-07', amount: 230 },
    { time: '2022-01-08', amount: 240 },
    { time: '2022-01-09', amount: 260 },
    { time: '2022-01-10', amount: 280 },
  ], // 存储曲线折现图的数据
};

onMounted(() => {
  // 在mounted生命周期钩子中，初始化ECharts图表
  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption({
    xAxis: {
      type: 'category',
      data: data.chartData.map((item) => item.time),
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      type: 'line',
      data: data.chartData.map((item) => item.amount),
    }],
  });
})

const goTarget = (url:string) => {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.chart-container {
  margin-top: 3px;
  height: 320px;
}

.chart {
  width: 100%;
  height: 100%;
}
.card-content {
  display: flex;
  flex-wrap: wrap;
  .ant-col {
    flex: 0 0 16.66667%; /* 设置每个用餐份数的宽度为16.66667% */
    box-sizing: border-box;
    padding: 0 10px; /* 设置用餐份数之间的间距 */
  }
  .item-title {
    margin-top: 10px;
    font-size: 16px; /* 调整用餐份数标题的字体大小 */
  }
  .item-data {
    margin-top: 5px;
    font-size: 20px; /* 调整用餐份数数据的字体大小 */
  }
}
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
