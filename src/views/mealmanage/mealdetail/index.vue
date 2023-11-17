<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
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
          <el-form-item label="部门。部门id" prop="deptId">
            <el-select v-model="queryParams.deptId" placeholder="请选择部门。部门id" clearable>
              <el-option
                v-for="dict in bc_dinerdept"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职务。职务id" prop="jobId">
            <el-select v-model="queryParams.jobId" placeholder="请选择职务。职务id" clearable>
              <el-option
                v-for="dict in bc_dinerjob"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用餐类型" prop="foodTypeid">
            <el-select v-model="queryParams.foodTypeid" placeholder="请选择用餐类型" clearable>
              <el-option
                v-for="dict in bc_mealfoodtype"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单明细" prop="orderId">
            <el-input v-model="queryParams.orderId" placeholder="请输入订单明细" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="金额" prop="sumPrice">
            <el-input v-model="queryParams.sumPrice" placeholder="请输入金额" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="订餐人姓名" prop="customerName">
            <el-input v-model="queryParams.customerName" placeholder="请输入订餐人姓名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="订餐人联系电话" prop="customerPhone">
            <el-input v-model="queryParams.customerPhone" placeholder="请输入订餐人联系电话" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用餐日期" prop="dinnerTime">
            <el-date-picker clearable
              v-model="queryParams.dinnerTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择用餐日期"
            />
          </el-form-item>
          <el-form-item label="报餐时间" prop="bcTime">
            <el-date-picker clearable
              v-model="queryParams.bcTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择报餐时间"
            />
          </el-form-item>
          <el-form-item label="核销时间" prop="verificationTime">
            <el-input v-model="queryParams.verificationTime" placeholder="请输入核销时间" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealdetail:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mealmanage:mealdetail:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['mealmanage:mealdetail:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mealmanage:mealdetail:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealdetailList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="true" />
        <el-table-column label="用餐时段" align="center" prop="foodGrounding">
          <template #default="scope">
            <dict-tag :options="bc_mealservetime" :value="scope.row.foodGrounding"/>
          </template>
        </el-table-column>
        <el-table-column label="部门。部门id" align="center" prop="deptId">
          <template #default="scope">
            <dict-tag :options="bc_dinerdept" :value="scope.row.deptId"/>
          </template>
        </el-table-column>
        <el-table-column label="职务。职务id" align="center" prop="jobId">
          <template #default="scope">
            <dict-tag :options="bc_dinerjob" :value="scope.row.jobId"/>
          </template>
        </el-table-column>
        <el-table-column label="用餐类型" align="center" prop="foodTypeid">
          <template #default="scope">
            <dict-tag :options="bc_mealfoodtype" :value="scope.row.foodTypeid"/>
          </template>
        </el-table-column>
        <el-table-column label="订单明细" align="center" prop="orderId" />
        <el-table-column label="金额" align="center" prop="sumPrice" />
        <el-table-column label="订餐人姓名" align="center" prop="customerName" />
        <el-table-column label="订餐人联系电话" align="center" prop="customerPhone" />
        <el-table-column label="用餐日期" align="center" prop="dinnerTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.dinnerTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用餐状态(0待用餐，1已用餐，2退款，3其他)" align="center" prop="dinnerStatus" />
        <el-table-column label="验证方式" align="center" prop="authType" />
        <el-table-column label="报餐时间" align="center" prop="bcTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.bcTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="核销时间" align="center" prop="verificationTime" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealdetail:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealdetail:remove']"></el-button>
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
    <!-- 添加或修改报餐明细对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealdetailFormRef" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="部门。部门id" prop="deptId">
          <el-select v-model="form.deptId" placeholder="请选择部门。部门id">
            <el-option
                v-for="dict in bc_dinerdept"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务。职务id" prop="jobId">
          <el-select v-model="form.jobId" placeholder="请选择职务。职务id">
            <el-option
                v-for="dict in bc_dinerjob"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用餐类型" prop="foodTypeid">
          <el-select v-model="form.foodTypeid" placeholder="请选择用餐类型">
            <el-option
                v-for="dict in bc_mealfoodtype"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单明细" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单明细" />
        </el-form-item>
        <el-form-item label="金额" prop="sumPrice">
          <el-input v-model="form.sumPrice" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="订餐人姓名" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入订餐人姓名" />
        </el-form-item>
        <el-form-item label="订餐人联系电话" prop="customerPhone">
          <el-input v-model="form.customerPhone" placeholder="请输入订餐人联系电话" />
        </el-form-item>
        <el-form-item label="用餐日期" prop="dinnerTime">
          <el-date-picker clearable
            v-model="form.dinnerTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择用餐日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报餐时间" prop="bcTime">
          <el-date-picker clearable
            v-model="form.bcTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择报餐时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="核销时间" prop="verificationTime">
          <el-input v-model="form.verificationTime" placeholder="请输入核销时间" />
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

<script setup name="Mealdetail" lang="ts">
import { listMealdetail, getMealdetail, delMealdetail, addMealdetail, updateMealdetail } from '@/api/mealmanage/mealdetail';
import { MealdetailVO, MealdetailQuery, MealdetailForm } from '@/api/mealmanage/mealdetail/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { bc_mealservetime, bc_dinerdept, bc_dinerjob, bc_mealfoodtype } = toRefs<any>(proxy?.useDict('bc_mealservetime', 'bc_dinerdept', 'bc_dinerjob', 'bc_mealfoodtype'));

const mealdetailList = ref<MealdetailVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealdetailFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealdetailForm = {
  id: undefined,
  foodGrounding: undefined,
  deptId: undefined,
  jobId: undefined,
  foodTypeid: undefined,
  orderId: undefined,
  sumPrice: undefined,
  customerName: undefined,
  customerPhone: undefined,
  dinnerTime: undefined,
  dinnerStatus: undefined,
  authType: undefined,
  bcTime: undefined,
  verificationTime: undefined,
  status: undefined,
}
const data = reactive<PageData<MealdetailForm, MealdetailQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    foodGrounding: undefined,
    deptId: undefined,
    jobId: undefined,
    foodTypeid: undefined,
    orderId: undefined,
    sumPrice: undefined,
    customerName: undefined,
    customerPhone: undefined,
    dinnerTime: undefined,
    dinnerStatus: undefined,
    authType: undefined,
    bcTime: undefined,
    verificationTime: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    foodGrounding: [
      { required: true, message: "用餐时段不能为空", trigger: "change" }
    ],
    deptId: [
      { required: true, message: "部门。部门id不能为空", trigger: "change" }
    ],
    jobId: [
      { required: true, message: "职务。职务id不能为空", trigger: "change" }
    ],
    foodTypeid: [
      { required: true, message: "用餐类型不能为空", trigger: "change" }
    ],
    orderId: [
      { required: true, message: "订单明细不能为空", trigger: "blur" }
    ],
    sumPrice: [
      { required: true, message: "金额不能为空", trigger: "blur" }
    ],
    customerName: [
      { required: true, message: "订餐人姓名不能为空", trigger: "blur" }
    ],
    customerPhone: [
      { required: true, message: "订餐人联系电话不能为空", trigger: "blur" }
    ],
    dinnerTime: [
      { required: true, message: "用餐日期不能为空", trigger: "blur" }
    ],
    dinnerStatus: [
      { required: true, message: "用餐状态(0待用餐，1已用餐，2退款，3其他)不能为空", trigger: "change" }
    ],
    authType: [
      { required: true, message: "验证方式不能为空", trigger: "change" }
    ],
    bcTime: [
      { required: true, message: "报餐时间不能为空", trigger: "blur" }
    ],
    verificationTime: [
      { required: true, message: "核销时间不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询报餐明细列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealdetail(queryParams.value);
  mealdetailList.value = res.rows;
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
  mealdetailFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealdetailVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加报餐明细";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealdetailVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealdetail(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改报餐明细";
}

/** 提交按钮 */
const submitForm = () => {
  mealdetailFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealdetail(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealdetail(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealdetailVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除报餐明细编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealdetail(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealdetail/export', {
    ...queryParams.value
  }, `mealdetail_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
