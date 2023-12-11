<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" style="padding-left: 20px">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>今日用餐情况</span>
            </div>
          </template>
          <div class="card-content">
            <div class="ant-col ant-col-6"><h2  class="item-title">用餐份数</h2><h2 class="item-data">{{ dinerNum }}</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">报餐份数</h2><h2 class="item-data">{{ orderNum }}</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">已退餐</h2><h2 class="item-data">{{ canceNum }}</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">退餐率</h2><h2 class="item-data">{{ cancelPerNum }}</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">人均餐费</h2><h2 class="item-data">{{ averageNum }}</h2></div>
            <div class="ant-col ant-col-6"><h2  class="item-title">评价数量</h2><h2 class="item-data">{{ commentNum }}</h2></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="16" style="padding-left: 20px; padding-top: 8px">
        <el-card>
          <h3>近十日用餐统计</h3>
          <LineChart />
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8" style="padding-left: 20px; padding-top: 8px">
        <el-card>
          <h3>昨日时段用餐统计</h3>
          <PieChart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index" lang="ts">
import { todayMealDetail } from '@/api/index';
import PieChart from './PieChart.vue';
import LineChart from './LineChart.vue';

let dinerNum = ref(0);
let orderNum = ref(0);
let canceNum = ref(0);
let cancelPerNum = ref(0);
let averageNum = ref(0);
let commentNum = ref(0);

onMounted(async () => {
  const res = await todayMealDetail();
  dinerNum.value = res.data.dinerNum;
  orderNum.value = res.data.orderNum;
  canceNum.value = res.data.canceNum;
  cancelPerNum.value = res.data.cancelPerNum;
  averageNum.value = res.data.averageNum;
  commentNum.value = res.data.commentNum;
});
</script>

<style scoped lang="scss">

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
