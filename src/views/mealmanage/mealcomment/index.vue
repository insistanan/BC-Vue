<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="姓名" prop="personName">
            <el-input v-model="queryParams.personName" placeholder="请输入姓名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="部门" prop="personDinerdeptid">
            <el-select v-model="queryParams.personDinerdeptid" placeholder="请选择部门" clearable>
              <el-option
                v-for="dict in bc_dinerdept"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职务" prop="personDinerjobid">
            <el-select v-model="queryParams.personDinerjobid" placeholder="请选择职务" clearable>
              <el-option
                v-for="dict in bc_dinerjob"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用餐时段" prop="foodGrounding">
            <el-select v-model="queryParams.foodGrounding" placeholder="请选择用餐时段" clearable>
              <el-option
                v-for="dict in bc_mealservetime"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealcomment:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mealmanage:mealcomment:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['mealmanage:mealcomment:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealcomment:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealcommentList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="用餐时段" align="center" prop="foodGrounding">
          <template #default="scope">
            <dict-tag :options="bc_mealservetime" :value="scope.row.foodGrounding"/>
          </template>
        </el-table-column>
        <el-table-column label="部门" align="center" prop="personDinerdeptid">
          <template #default="scope">
            <dict-tag :options="bc_dinerdept" :value="scope.row.personDinerdeptid"/>
          </template>
        </el-table-column>
        <el-table-column label="职务" align="center" prop="personDinerjobid">
          <template #default="scope">
            <dict-tag :options="bc_dinerjob" :value="scope.row.personDinerjobid"/>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center" prop="personName" />
        <el-table-column label="用餐时间" align="center" prop="commentTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.commentTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="星级" align="center" prop="score" />
        <el-table-column label="评论" align="center" prop="comment" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealcomment:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealcomment:remove']"></el-button>
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
    <!-- 添加或修改评论对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealcommentFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="评论" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="星级" prop="score">
          <el-input v-model="form.score" placeholder="请输入星级" />
        </el-form-item>
        <el-form-item label="用餐时段" prop="foodGrounding">
          <el-select v-model="form.foodGrounding" placeholder="请选择用餐时段">
            <el-option
              v-for="dict in bc_mealservetime"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="personName">
          <el-input v-model="form.personName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="部门" prop="personDinerdeptid">
          <el-select v-model="form.personDinerdeptid" placeholder="请选择部门">
            <el-option
              v-for="dict in bc_dinerdept"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" prop="personDinerjobid">
          <el-select v-model="form.personDinerjobid" placeholder="请选择职务">
            <el-option
              v-for="dict in bc_dinerjob"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评论时间" prop="commentTime">
          <el-date-picker clearable
                          v-model="form.commentTime"
                          type="datetime"
                          value-format="YYYY-MM-DD HH:mm:ss"
                          placeholder="请选择评论时间">
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

<script setup name="Mealcomment" lang="ts">
import { listMealcomment, getMealcomment, delMealcomment, addMealcomment, updateMealcomment } from '@/api/mealmanage/mealcomment';
import { MealcommentVO, MealcommentQuery, MealcommentForm } from '@/api/mealmanage/mealcomment/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { bc_mealservetime, bc_dinerdept, bc_dinerjob } = toRefs<any>(proxy?.useDict('bc_mealservetime', 'bc_dinerdept', 'bc_dinerjob'));

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
      { required: true, message: "用餐时段不能为空", trigger: "change" }
    ],
    personName: [
      { required: true, message: "姓名不能为空", trigger: "blur" }
    ],
    personDinerdeptid: [
      { required: true, message: "部门不能为空", trigger: "change" }
    ],
    personDinerjobid: [
      { required: true, message: "职务不能为空", trigger: "change" }
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
