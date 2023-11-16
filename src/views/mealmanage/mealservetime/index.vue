<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="108px">
          <el-form-item label="时段名称" prop="servetimeName">
            <el-input v-model="queryParams.servetimeName" placeholder="请输入时段名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用餐时段状态" prop="servetimeStatus">
            <el-select v-model="queryParams.servetimeStatus" placeholder="请选择用餐时段状态" clearable>
              <el-option
                v-for="dict in sys_open_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealservetime:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mealmanage:mealservetime:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['mealmanage:mealservetime:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealservetime:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealservetimeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="时段名称" align="center" prop="servetimeName" />
        <el-table-column label="时段可报份数" align="center" prop="servetimeNum" />
        <el-table-column label="状态" align="center" prop="servetimeStatus">
          <template #default="scope">
            <dict-tag :options="sys_open_status" :value="scope.row.servetimeStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" prop="servetimeBegin" />
        <el-table-column label="结束时间" align="center" prop="servetimeEnd" />
        <el-table-column label="报餐提醒状态" align="center" prop="servetimeRemindstatus">
          <template #default="scope">
            <dict-tag :options="sys_open_status" :value="scope.row.servetimeRemindstatus"/>
          </template>
        </el-table-column>
        <el-table-column label="报餐提醒时间" align="center" prop="servetimeRemind" />
        <el-table-column label="报餐截止天数" align="center" prop="servetimeRepotrendday" />
        <el-table-column label="报餐截止时间" align="center" prop="servetimeRepotrendtime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealservetime:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealservetime:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改用餐时段对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealservetimeFormRef" :model="form" :rules="rules" label-width="108px" label-position="left">
        <el-form-item label="时段名称" prop="servetimeName">
          <el-input v-model="form.servetimeName" placeholder="请输入时段名称" />
        </el-form-item>
        <el-form-item label="时段可报份数" prop="servetimeNum">
          <el-input v-model="form.servetimeNum" type="number" placeholder="请输入时段可报份数" />
        </el-form-item>
        <el-form-item label="状态" prop="servetimeStatus">
          <el-radio-group v-model="form.servetimeStatus">
            <el-radio
              v-for="dict in sys_open_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间" prop="servetimeBegin">
          <el-col :span="5">
            <el-input v-model="form.servetimeBegin"/>
          </el-col>
          <el-col class="line" :span="2">时</el-col>
          <el-col :span="5">
            <el-input v-model="form.servetimeBegin"/>
          </el-col>
          <el-col class="line" :span="2">分</el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="servetimeEnd">
          <el-col :span="5">
            <el-input v-model="form.servetimeEnd"/>
          </el-col>
          <el-col class="line" :span="2">时</el-col>
          <el-col :span="5">
            <el-input v-model="form.servetimeEnd"/>
          </el-col>
          <el-col class="line" :span="2">分</el-col>
        </el-form-item>
        <el-form-item label="报餐提醒状态" prop="servetimeRemindstatus">
          <el-radio-group v-model="form.servetimeRemindstatus">
            <el-radio
              v-for="dict in sys_open_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报餐提醒时间" prop="servetimeRemind">
          <el-col :span="5">
            <el-input v-model="form.servetimeRemind"/>
          </el-col>
          <el-col class="line" :span="2">时</el-col>
          <el-col :span="5">
            <el-input v-model="form.servetimeRemind"/>
          </el-col>
        </el-form-item>
        <el-form-item label="报餐截止天数" prop="servetimeRepotrendday">
          <el-input v-model="form.servetimeRepotrendday" type="number" placeholder="请输入报餐截止天数" />
        </el-form-item>
        <el-form-item label="报餐截止时间" prop="servetimeRepotrendtime">
          <el-col :span="5">
            <el-input v-model="form.servetimeRepotrendtime"/>
          </el-col>
          <el-col class="line" :span="2">时</el-col>
          <el-col :span="5">
            <el-input v-model="form.servetimeRepotrendtime"/>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Mealservetime" lang="ts">
import { listMealservetime, getMealservetime, delMealservetime, addMealservetime, updateMealservetime } from '@/api/mealmanage/mealservetime';
import { MealservetimeVO, MealservetimeQuery, MealservetimeForm } from '@/api/mealmanage/mealservetime/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_open_status } = toRefs<any>(proxy?.useDict('sys_open_status'));

const mealservetimeList = ref<MealservetimeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealservetimeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealservetimeForm = {
  id: undefined,
  servetimeName: undefined,
  servetimeNum: undefined,
  servetimeStatus: undefined,
  servetimeBegin: undefined,
  servetimeEnd: undefined,
  servetimeRemindstatus: undefined,
  servetimeRemind: undefined,
  servetimeRepotrendday: undefined,
  servetimeRepotrendtime: undefined,
}
const data = reactive<PageData<MealservetimeForm, MealservetimeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    servetimeName: undefined,
    servetimeNum: undefined,
    servetimeStatus: undefined,
    servetimeBegin: undefined,
    servetimeEnd: undefined,
    servetimeRemindstatus: undefined,
    servetimeRemind: undefined,
    servetimeRepotrendday: undefined,
    servetimeRepotrendtime: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    servetimeName: [
      { required: true, message: "时段名称不能为空", trigger: "blur" }
    ],
    servetimeNum: [
      { required: true, message: "时段可报份数不能为空", trigger: "blur" }
    ],
    servetimeStatus: [
      { required: true, message: "状态，0-开启，1关闭不能为空", trigger: "change" }
    ],
    servetimeBegin: [
      { required: true, message: "开始时间不能为空", trigger: "blur" }
    ],
    servetimeEnd: [
      { required: true, message: "结束时间不能为空", trigger: "blur" }
    ],
    servetimeRemindstatus: [
      { required: true, message: "报餐提醒状态，0-开启，1关闭不能为空", trigger: "change" }
    ],
    servetimeRemind: [
      { required: true, message: "报餐提醒时间不能为空", trigger: "blur" }
    ],
    servetimeRepotrendday: [
      { required: true, message: "报餐截止天数不能为空", trigger: "blur" }
    ],
    servetimeRepotrendtime: [
      { required: true, message: "报餐截止时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用餐时段列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealservetime(queryParams.value);
  mealservetimeList.value = res.rows;
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
  mealservetimeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealservetimeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用餐时段";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealservetimeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealservetime(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用餐时段";
}

/** 提交按钮 */
const submitForm = () => {
  mealservetimeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealservetime(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealservetime(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealservetimeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用餐时段编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealservetime(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealservetime/export', {
    ...queryParams.value
  }, `mealservetime_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
