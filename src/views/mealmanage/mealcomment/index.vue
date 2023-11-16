<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="120px" label-position="left">
          <el-form-item label="姓名" prop="personName">
            <el-input v-model="queryParams.personName" placeholder="请输入姓名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="部门" prop="personDinerdeptid">
            <el-input v-model="queryParams.personDinerdeptid" placeholder="请输入部门" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="职务" prop="personDinerjobid">
            <el-input v-model="queryParams.personDinerjobid" placeholder="请输入职务" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="菜品上架时间段" prop="foodGrounding">
            <el-input v-model="queryParams.foodGrounding" placeholder="请输入菜品上架时间段" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealcomment:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealcommentList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="菜品上架时间段" align="center" prop="foodGrounding" />
        <el-table-column label="部门" align="center" prop="personDinerdeptid" />
        <el-table-column label="职务" align="center" prop="personDinerjobid" />
        <el-table-column label="姓名" align="center" prop="personName" />
        <el-table-column label="评论时间" align="center" prop="commentTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.commentTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="星级" align="center" prop="score" />
        <el-table-column label="评论" align="center" prop="comment" />
      </el-table>

      <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script setup name="Mealcomment" lang="ts">
import { listMealcomment, getMealcomment, delMealcomment, addMealcomment, updateMealcomment } from '@/api/mealmanage/mealcomment';
import { MealcommentVO, MealcommentQuery, MealcommentForm } from '@/api/mealmanage/mealcomment/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const mealcommentList = ref<MealcommentVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealcommentFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealcommentForm = {
  id: undefined,
  comment: undefined,
  score: undefined,
  foodGrounding: undefined,
  personName: undefined,
  personDinerdeptid: undefined,
  personDinerjobid: undefined,
  commentTime: undefined,
}
const data = reactive<PageData<MealcommentForm, MealcommentQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    comment: undefined,
    score: undefined,
    foodGrounding: undefined,
    personName: undefined,
    personDinerdeptid: undefined,
    personDinerjobid: undefined,
    commentTime: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    comment: [
      { required: true, message: "评论不能为空", trigger: "blur" }
    ],
    score: [
      { required: true, message: "星级不能为空", trigger: "blur" }
    ],
    foodGrounding: [
      { required: true, message: "菜品上架时间段，1-早餐，2-午餐，3-晚餐不能为空", trigger: "blur" }
    ],
    personName: [
      { required: true, message: "姓名不能为空", trigger: "blur" }
    ],
    personDinerdeptid: [
      { required: true, message: "部门不能为空", trigger: "blur" }
    ],
    personDinerjobid: [
      { required: true, message: "职务不能为空", trigger: "blur" }
    ],
    commentTime: [
      { required: true, message: "评论时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询评论列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealcomment(queryParams.value);
  mealcommentList.value = res.rows;
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
  mealcommentFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealcommentVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加评论";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealcommentVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealcomment(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改评论";
}

/** 提交按钮 */
const submitForm = () => {
  mealcommentFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealcomment(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealcomment(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealcommentVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除评论编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealcomment(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealcomment/export', {
    ...queryParams.value
  }, `mealcomment_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
