<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="菜品名称" prop="foodName">
            <el-input v-model="queryParams.foodName" placeholder="请输入菜品名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="菜品类型" prop="foodTypeid">
            <el-select v-model="queryParams.foodTypeid" placeholder="请选择菜品类型" clearable>
              <el-option
                v-for="dict in bc_mealfoodtype"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealfoods:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mealmanage:mealfoods:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['mealmanage:mealfoods:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealfoods:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealfoodsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="菜品名称" align="center" prop="foodName" />
        <el-table-column label="菜品价格" align="center" prop="foodPrice" />
        <el-table-column label="用餐时间段" align="center" prop="foodGrounding">
          <template #default="scope">
            <dict-tag :options="bc_mealservetime" :value="scope.row.foodGrounding"/>
          </template>
        </el-table-column>
        <el-table-column label="菜品循环日期" align="center" prop="foodServerday" />
        <el-table-column label="菜品类型" align="center" prop="foodTypeid">
          <template #default="scope">
            <dict-tag :options="bc_mealfoodtype" :value="scope.row.foodTypeid"/>
          </template>
        </el-table-column>
        <el-table-column label="自动上架" align="center" prop="autoGrounding">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.autoGrounding"/>
          </template>
        </el-table-column>
        <el-table-column label="限购份数" align="center" prop="limitNum" />
        <el-table-column label="预设库存" align="center" prop="stockNum" />
        <el-table-column label="首份减免" align="center" prop="firstReduce" />
        <el-table-column label="描述" align="center" prop="explain" />
        <el-table-column label="开放类型" align="center" prop="openType">
          <template #default="scope">
            <dict-tag :options="sys_open_range" :value="scope.row.openType"/>
          </template>
        </el-table-column>
        <el-table-column label="开放部门" align="center" prop="enDept">
          <template #default="scope">
            <dict-tag :options="bc_dinerdept" :value="scope.row.enDept"/>
          </template>
        </el-table-column>
        <el-table-column label="开放职务" align="center" prop="enJob">
          <template #default="scope">
            <dict-tag :options="bc_dinerjob" :value="scope.row.enJob"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealfoods:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealfoods:remove']"></el-button>
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
    <!-- 添加或修改菜品对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealfoodsFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="form.foodName" placeholder="请输入菜品名称" />
        </el-form-item>
        <el-form-item label="菜品价格" prop="foodPrice">
          <el-input v-model="form.foodPrice" placeholder="请输入菜品价格" />
        </el-form-item>
        <el-form-item label="用餐时间段" prop="foodGrounding">
          <el-select v-model="form.foodGrounding" placeholder="请选择菜品用餐时间段">
            <el-option
              v-for="dict in bc_mealservetime"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品循环日期">
          <el-checkbox-group v-model="form.foodServerday" size="small">
            <el-checkbox-button label="周一" key="1" name="type"></el-checkbox-button>
            <el-checkbox-button label="周二" key="2" name="type"></el-checkbox-button>
            <el-checkbox-button label="周三" key="3" name="type"></el-checkbox-button>
            <el-checkbox-button label="周四" key="4" name="type"></el-checkbox-button>
            <el-checkbox-button label="周五" key="5" name="type"></el-checkbox-button>
            <el-checkbox-button label="周六" key="6" name="type"></el-checkbox-button>
            <el-checkbox-button label="周日" key="7" name="type"></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜品类型" prop="foodTypeid">
          <el-select v-model="form.foodTypeid" placeholder="请选择菜品类型">
            <el-option
              v-for="dict in bc_mealfoodtype"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否自动上架" prop="autoGrounding">
          <el-select v-model="form.autoGrounding" placeholder="请选择是否自动上架">
            <el-option
              v-for="dict in sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限购份数" prop="limitNum">
          <el-input v-model="form.limitNum" placeholder="请输入限购份数" />
        </el-form-item>
        <el-form-item label="预设库存" prop="stockNum">
          <el-input v-model="form.stockNum" placeholder="请输入预设库存" />
        </el-form-item>
        <el-form-item label="第一份减免" prop="firstReduce">
          <el-input v-model="form.firstReduce" placeholder="请输入第一份减免" />
        </el-form-item>
        <el-form-item label="菜品描述" prop="explain">
          <el-input v-model="form.explain" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="开放类型" prop="openType">
          <el-select v-model="form.openType" placeholder="请选择开放类型">
            <el-option
              v-for="dict in sys_open_range"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放部门" prop="enDept">
          <el-select v-model="form.enDept" placeholder="请选择开放部门">
            <el-option
              v-for="dict in bc_dinerdept"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放职务" prop="enJob">
          <el-select v-model="form.enJob" placeholder="请选择开放职务">
            <el-option
              v-for="dict in bc_dinerjob"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品图片" prop="foodImg">
          <image-upload v-model="form.foodImg"/>
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

<script setup name="Mealfoods" lang="ts">
import { listMealfoods, getMealfoods, delMealfoods, addMealfoods, updateMealfoods } from '@/api/mealmanage/mealfoods';
import { MealfoodsVO, MealfoodsQuery, MealfoodsForm } from '@/api/mealmanage/mealfoods/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_open_range, bc_mealservetime, bc_dinerdept, bc_dinerjob, bc_mealfoodtype, sys_yes_no } = toRefs<any>(proxy?.useDict('sys_open_range', 'bc_mealservetime', 'bc_dinerdept', 'bc_dinerjob', 'bc_mealfoodtype', 'sys_yes_no'));

const mealfoodsList = ref<MealfoodsVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealfoodsFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealfoodsForm = {
  id: undefined,
  foodName: undefined,
  foodPrice: undefined,
  foodGrounding: undefined,
  foodServerday: undefined,
  foodTypeid: undefined,
  autoGrounding: undefined,
  limitNum: undefined,
  stockNum: undefined,
  firstReduce: undefined,
  explain: undefined,
  openType: undefined,
  enDept: undefined,
  enJob: undefined,
  foodImg: undefined,
}
const data = reactive<PageData<MealfoodsForm, MealfoodsQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    foodName: undefined,
    foodPrice: undefined,
    foodGrounding: undefined,
    foodServerday: undefined,
    foodTypeid: undefined,
    autoGrounding: undefined,
    limitNum: undefined,
    stockNum: undefined,
    firstReduce: undefined,
    explain: undefined,
    openType: undefined,
    enDept: undefined,
    enJob: undefined,
    foodImg: undefined,
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
    foodPrice: [
      { required: true, message: "菜品价格不能为空", trigger: "blur" }
    ],
    foodGrounding: [
      { required: true, message: "菜品用餐时间段，1-早餐，2-午餐，3-晚餐不能为空", trigger: "change" }
    ],
    foodServerday: [
      { required: true, message: "菜品菜品循环日期，1-7代表周一至周日不能为空", trigger: "blur" }
    ],
    foodTypeid: [
      { required: true, message: "菜品类型不能为空", trigger: "change" }
    ],
    autoGrounding: [
      { required: true, message: "是否自动上架，0-是，1-否不能为空", trigger: "change" }
    ],
    limitNum: [
      { required: true, message: "限购份数不能为空", trigger: "blur" }
    ],
    stockNum: [
      { required: true, message: "预设库存不能为空", trigger: "blur" }
    ],
    firstReduce: [
      { required: true, message: "第一份减免不能为空", trigger: "blur" }
    ],
    explain: [
      { required: true, message: "菜品描述不能为空", trigger: "blur" }
    ],
    openType: [
      { required: true, message: "开放类型，0-指定部门开放，1-全部开放不能为空", trigger: "change" }
    ],
    enDept: [
      { required: true, message: "开放部门不能为空", trigger: "change" }
    ],
    enJob: [
      { required: true, message: "开放职务不能为空", trigger: "change" }
    ],
    foodImg: [
      { required: true, message: "菜品图片不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询菜品列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealfoods(queryParams.value);
  mealfoodsList.value = res.rows;
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
  mealfoodsFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealfoodsVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加菜品";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealfoodsVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealfoods(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改菜品";
}

/** 提交按钮 */
const submitForm = () => {
  mealfoodsFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealfoods(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealfoods(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealfoodsVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除菜品编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealfoods(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealfoods/export', {
    ...queryParams.value
  }, `mealfoods_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
