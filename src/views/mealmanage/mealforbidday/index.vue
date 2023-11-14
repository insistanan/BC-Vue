<template>
  <div class="p-2">
    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealforbidday:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mealmanage:mealforbidday:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['mealmanage:mealforbidday:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealforbidday:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealforbiddayList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="禁止用餐日期" align="center" prop="forbidDate" >
          <template #default="scope">
            <span>{{ parseTime(scope.row.forbidDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" prop="forbidType" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealforbidday:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealforbidday:remove']"></el-button>
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
    <!-- 添加或修改禁止用餐日期对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealforbiddayFormRef" :model="form" :rules="rules" label-width="125px">
        <el-form-item label="禁止用餐日期" prop="forbidDate" label-width="125px">
          <el-date-picker clearable
            v-model="form.forbidDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择禁止用餐日期">
          </el-date-picker>
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

<script setup name="Mealforbidday" lang="ts">
import { listMealforbidday, getMealforbidday, delMealforbidday, addMealforbidday, updateMealforbidday } from '@/api/mealmanage/mealforbidday';
import { MealforbiddayVO, MealforbiddayQuery, MealforbiddayForm } from '@/api/mealmanage/mealforbidday/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const mealforbiddayList = ref<MealforbiddayVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealforbiddayFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealforbiddayForm = {
  forbidDate: undefined,
}
const data = reactive<PageData<MealforbiddayForm, MealforbiddayQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    params: {
    }
  },
  rules: {
    forbidDate: [
      { required: true, message: "禁止用餐日期不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询禁止用餐日期列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealforbidday(queryParams.value);
  mealforbiddayList.value = res.rows;
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
  mealforbiddayFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealforbiddayVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加禁止用餐日期";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealforbiddayVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealforbidday(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改禁止用餐日期";
}

/** 提交按钮 */
const submitForm = () => {
  mealforbiddayFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealforbidday(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealforbidday(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealforbiddayVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除禁止用餐日期编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealforbidday(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealforbidday/export', {
    ...queryParams.value
  }, `mealforbidday_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
