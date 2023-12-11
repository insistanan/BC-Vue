<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="" prop="searchTime">
            <el-date-picker clearable
                            v-model="queryParams.searchTime"
                            type="date"
                            value-format="YYYY-MM-DD"
                            :default-value="new Date()"
            />
          </el-form-item>
          <el-form-item label="菜品类型" prop="foodtypeName">
            <el-select v-model="queryParams.foodtypeName" placeholder="请选择菜品类型" clearable>
              <el-option
                v-for="dict in bc_mealfoodtype"
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
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealdailymenu:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealdailymenuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="菜品图片" align="center" prop="foodImg" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.foodImg" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="菜品名称" align="center" prop="foodName" />
        <el-table-column label="菜品价格" align="center" prop="foodPrice" />
        <el-table-column label="预设库存" align="center" prop="stockNum" />
      </el-table>

      <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改每日菜谱对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealdailymenuFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="form.foodName" placeholder="请输入菜品名称" />
        </el-form-item>
        <el-form-item label="菜品类型" prop="foodtypeName">
          <el-select v-model="form.foodtypeName" placeholder="请选择菜品类型">
            <el-option
                v-for="dict in bc_mealfoodtype"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品价格" prop="foodPrice">
          <el-input v-model="form.foodPrice" placeholder="请输入菜品价格" />
        </el-form-item>
        <el-form-item label="预设库存" prop="stockNum">
          <el-input v-model="form.stockNum" placeholder="请输入预设库存" />
        </el-form-item>
        <el-form-item label="菜品图片" prop="foodImg">
          <el-input v-model="form.foodImg" placeholder="请输入菜品图片" />
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
        <el-form-item label="查询时间" prop="searchTime">
          <el-date-picker clearable
            v-model="form.searchTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择查询时间">
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

<script setup name="Mealdailymenu" lang="ts">
import { listMealdailymenu, getMealdailymenu, delMealdailymenu, addMealdailymenu, updateMealdailymenu } from '@/api/mealmanage/mealdailymenu';
import { MealdailymenuVO, MealdailymenuQuery, MealdailymenuForm } from '@/api/mealmanage/mealdailymenu/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { bc_mealservetime, bc_mealfoodtype } = toRefs<any>(proxy?.useDict('bc_mealservetime', 'bc_mealfoodtype'));

const mealdailymenuList = ref<MealdailymenuVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealdailymenuFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealdailymenuForm = {
  id: undefined,
  foodName: undefined,
  foodtypeName: undefined,
  foodPrice: undefined,
  stockNum: undefined,
  foodImg: undefined,
  foodGrounding: undefined,
  searchTime: undefined,
}
const data = reactive<PageData<MealdailymenuForm, MealdailymenuQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    foodName: undefined,
    foodtypeName: undefined,
    foodPrice: undefined,
    stockNum: undefined,
    foodImg: undefined,
    foodGrounding: undefined,
    searchTime: new Date(),
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    foodName: [
      { required: true, message: "菜品名称不能为空", trigger: "blur" }
    ],
    foodtypeName: [
      { required: true, message: "菜品类型不能为空", trigger: "change" }
    ],
    foodPrice: [
      { required: true, message: "菜品价格不能为空", trigger: "blur" }
    ],
    stockNum: [
      { required: true, message: "预设库存不能为空", trigger: "blur" }
    ],
    foodImg: [
      { required: true, message: "菜品图片不能为空", trigger: "blur" }
    ],
    foodGrounding: [
      { required: true, message: "用餐时段不能为空", trigger: "change" }
    ],
    searchTime: [
      { required: true, message: "查询时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询每日菜谱列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealdailymenu(queryParams.value);
  mealdailymenuList.value = res.rows;
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
  mealdailymenuFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealdailymenuVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加每日菜谱";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealdailymenuVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealdailymenu(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改每日菜谱";
}

/** 提交按钮 */
const submitForm = () => {
  mealdailymenuFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealdailymenu(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealdailymenu(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealdailymenuVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除每日菜谱编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealdailymenu(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealdailymenu/export', {
    ...queryParams.value
  }, `mealdailymenu_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
