<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="部门名称" prop="personName">
            <el-input v-model="queryParams.personName" placeholder="请输入部门名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="手机号" prop="personTel">
            <el-input v-model="queryParams.personTel" placeholder="请输入手机号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="部门" prop="personDinerdeptid">
            <el-input v-model="queryParams.personDinerdeptid" placeholder="请输入部门" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="职务" prop="personDinerjobid">
            <el-input v-model="queryParams.personDinerjobid" placeholder="请输入职务" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['dinermanage:dinernoreview:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['dinermanage:dinernoreview:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['dinermanage:dinernoreview:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['dinermanage:dinernoreview:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="dinernoreviewList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="部门名称" align="center" prop="personName" />
        <el-table-column label="手机号" align="center" prop="personTel" />
        <el-table-column label="部门" align="center" prop="personDinerdeptid" />
        <el-table-column label="职务" align="center" prop="personDinerjobid" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="sys_data_status" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['dinermanage:dinernoreview:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['dinermanage:dinernoreview:remove']"></el-button>
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
    <!-- 添加或修改免审核人员对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="dinernoreviewFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="部门名称" prop="personName">
          <el-input v-model="form.personName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="personTel">
          <el-input v-model="form.personTel" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="部门" prop="personDinerdeptid">
          <el-input v-model="form.personDinerdeptid" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="职务" prop="personDinerjobid">
          <el-input v-model="form.personDinerjobid" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
                v-for="dict in sys_data_status"
                :key="dict.value"
                :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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

<script setup name="Dinernoreview" lang="ts">
import { listDinernoreview, getDinernoreview, delDinernoreview, addDinernoreview, updateDinernoreview } from '@/api/dinermanage/dinernoreview';
import { DinernoreviewVO, DinernoreviewQuery, DinernoreviewForm } from '@/api/dinermanage/dinernoreview/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_data_status } = toRefs<any>(proxy?.useDict('sys_data_status'));

const dinernoreviewList = ref<DinernoreviewVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const dinernoreviewFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DinernoreviewForm = {
  id: undefined,
  personName: undefined,
  personTel: undefined,
  personDinerdeptid: undefined,
  personDinerjobid: undefined,
  status: undefined,
}
const data = reactive<PageData<DinernoreviewForm, DinernoreviewQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    personName: undefined,
    personTel: undefined,
    personDinerdeptid: undefined,
    personDinerjobid: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    personName: [
      { required: true, message: "部门名称不能为空", trigger: "blur" }
    ],
    personTel: [
      { required: true, message: "手机号不能为空", trigger: "blur" }
    ],
    personDinerdeptid: [
      { required: true, message: "部门不能为空", trigger: "blur" }
    ],
    personDinerjobid: [
      { required: true, message: "职务不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询免审核人员列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDinernoreview(queryParams.value);
  dinernoreviewList.value = res.rows;
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
  dinernoreviewFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DinernoreviewVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加免审核人员";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DinernoreviewVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDinernoreview(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改免审核人员";
}

/** 提交按钮 */
const submitForm = () => {
  dinernoreviewFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDinernoreview(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDinernoreview(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DinernoreviewVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除免审核人员编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDinernoreview(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('dinermanage/dinernoreview/export', {
    ...queryParams.value
  }, `dinernoreview_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
