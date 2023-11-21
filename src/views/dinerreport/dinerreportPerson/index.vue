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
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
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
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['dinerreport:dinerreportPerson:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :label="部门"
          prop="dept_name"
          width="150"
        ></el-table-column>
        <el-table-column
          v-for="(servetime, servetimeName) in servetimeMap"
          :key="servetimeName"
          :label="servetimeName"
        >
          <el-table-column
            v-for="(column, columnName) in servetime"
            :key="columnName"
            :prop="columnName"
            :label="column"
            width="120"
            :header-align="servetimeName === 'servetime1' || servetimeName === 'servetime2' ? 'center' : ''"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script setup name="DinerreportPerson" lang="ts">
import { listDinerreportPerson, getDinerreportPerson, delDinerreportPerson, addDinerreportPerson, updateDinerreportPerson } from '@/api/dinerreport/dinerreportPerson';
import { DinerreportPersonVO, DinerreportPersonQuery, DinerreportPersonForm } from '@/api/dinerreport/dinerreportPerson/types';
import {ElDatePicker} from "element-plus";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const dinerreportPersonList = ref<DinerreportPersonVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const dinerreportPersonFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DinerreportPersonForm = {
  id: undefined,
  customerName: undefined,
  deptName: undefined,
  jobName: undefined,
  servetimeName: undefined,
  unusenum: undefined,
  singleunusenum: undefined,
}
const data = reactive<PageData<DinerreportPersonForm, DinerreportPersonQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    customerName: undefined,
    deptName: undefined,
    jobName: undefined,
    servetimeName: undefined,
    unusenum: undefined,
    singleunusenum: undefined,
    params: {
    }
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

const props = defineProps(['deptNameColumnName']);

const tableData = ref([]);
const servetimeMap = ref({});

onMounted(async () => {
  // 模拟异步获取数据，实际情况中应该使用真实的 API 请求
  const simulatedApiResponse = await simulateApiCall();
  tableData.value = simulatedApiResponse.tableData;
  servetimeMap.value = simulatedApiResponse.servetimeMap;
});

// 模拟 API 调用
async function simulateApiCall() {
  // 模拟后端返回的数据
  const simulatedData = {
    tableData: [
      // 表格数据
    ],
    servetimeMap: {
      // 模拟的 servetimeMap 数据
      servetime1: {
        dinertotalnum: 'Dinertotalnum',
        usedinernum: 'Usedinernum',
        unusedinernum: 'Unusedinernum',
      },
      servetime2: {
        dinertotalnum: 'Dinertotalnum1',
        usedinernum: 'Usedinernum1',
        unusedinernum: 'Unusedinernum1',
      }
    },
  };

  // 模拟异步延时
  await new Promise(resolve => setTimeout(resolve, 1000));

  return simulatedData;
}
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
/** 查询未实际就餐统计列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDinerreportPerson(queryParams.value);
  dinerreportPersonList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  dinerreportPersonFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: DinerreportPersonVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加未实际就餐统计";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DinerreportPersonVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDinerreportPerson(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改未实际就餐统计";
}

/** 提交按钮 */
const submitForm = () => {
  dinerreportPersonFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDinerreportPerson(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDinerreportPerson(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DinerreportPersonVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除未实际就餐统计编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDinerreportPerson(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('dinerreport/dinerreportPerson/export', {
    ...queryParams.value
  }, `dinerreportPerson_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
