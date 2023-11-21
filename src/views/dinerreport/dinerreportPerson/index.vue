<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="" prop="querydate">
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                value-format="YYYY-MM-DD"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="handleDateChange"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['dinerreport:dinerreportServetime:export']">导出</el-button>
          </el-col>
        </el-row>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          label="姓名"
          prop="customer_name"
          width="150"
        ></el-table-column>
        <el-table-column
          label="部门"
          prop="dept_name"
          width="150"
        ></el-table-column>
        <el-table-column
          label="职务"
          prop="job_name"
          width="150"
        ></el-table-column>
        <el-table-column
          label="未实际就餐数"
          prop="unusenum"
          width="150"
        ></el-table-column>
        <el-table-column
          v-for="(servetime, servetimeName) in servetimeNameMap"
          :key="servetimeName"
          :label="servetimeName"
          header-align="center"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup name="DinerreportServetime" lang="ts">
import { getreport } from '@/api/dinerreport/dinerreportServetime';
import { DinerreportServetimeVO, DinerreportServetimeQuery, DinerreportServetimeForm } from '@/api/dinerreport/dinerreportServetime/types';
import { ElDatePicker } from 'element-plus';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const dinerreportServetimeList = ref<DinerreportServetimeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const dinerreportServetimeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DinerreportServetimeForm = {
  id: undefined,
  deptName: undefined,
  servetimeName: undefined,
  dinertotalnum: undefined,
  usedinernum: undefined,
  unusedinernum: undefined,
}
const data = reactive<PageData<DinerreportServetimeForm, DinerreportServetimeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    begindate: null,
    enddate: null,
    params: {
    }
  },
  rules: {

  }
});

const { queryParams, form, rules } = toRefs(data);

const props = defineProps(['deptNameColumnName']);

const tableData = ref([]);
const servetimeNameMap = ref({});

const pickerOptions = ref({
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker: ElDatePicker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近一个月',
      onClick(picker: ElDatePicker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近三个月',
      onClick(picker: ElDatePicker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      },
    },
  ],
});

const value1 = ref('');
const value2 = ref('');


/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  dinerreportServetimeFormRef.value?.resetFields();
}

const handleDateChange = () => {
  queryParams.value.begindate = value2.value[0];
  queryParams.value.enddate = value2.value[1];
}

const report = async () => {
  loading.value = true;
  const simulatedApiResponse = await getreport(queryParams.value);
  tableData.value = JSON.parse(simulatedApiResponse.tableData);
  servetimeNameMap.value = JSON.parse(simulatedApiResponse.servetimeNameMap);
  loading.value = false;
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  report();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('dinerreport/dinerreportServetime/export', {
    ...queryParams.value
  }, `dinerreportServetime_${new Date().getTime()}.xlsx`)
}

</script>
