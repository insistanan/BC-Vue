<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="公告名称" prop="noticeName">
            <el-input v-model="queryParams.noticeName" placeholder="请输入公告名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['systemshow:systemshownotice:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['systemshow:systemshownotice:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['systemshow:systemshownotice:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['systemshow:systemshownotice:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="systemshownoticeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="公告名称" align="center" prop="noticeName" />
        <el-table-column label="公告顺序" align="center" prop="noticeSort" />
        <el-table-column label="公告状态" align="center" prop="noticeStatus">
          <template #default="scope">
            <dict-tag :options="sys_data_status" :value="scope.row.noticeStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['systemshow:systemshownotice:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['systemshow:systemshownotice:remove']"></el-button>
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
    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="systemshownoticeFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公告名称" prop="noticeName">
          <el-input v-model="form.noticeName" placeholder="请输入公告名称" />
        </el-form-item>
        <el-form-item label="公告顺序" prop="noticeSort">
          <el-input v-model="form.noticeSort" placeholder="请输入公告顺序" />
        </el-form-item>
        <el-form-item label="公告状态" prop="noticeStatus">
          <el-select v-model="form.noticeStatus" placeholder="请选择公告状态">
            <el-option
              v-for="dict in sys_data_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容">
          <editor v-model="form.noticeContent" :min-height="192"/>
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

<script setup name="Systemshownotice" lang="ts">
import { listSystemshownotice, getSystemshownotice, delSystemshownotice, addSystemshownotice, updateSystemshownotice } from '@/api/systemshow/systemshownotice';
import { SystemshownoticeVO, SystemshownoticeQuery, SystemshownoticeForm } from '@/api/systemshow/systemshownotice/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_data_status } = toRefs<any>(proxy?.useDict('sys_data_status'));

const systemshownoticeList = ref<SystemshownoticeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const systemshownoticeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: SystemshownoticeForm = {
  id: undefined,
  noticeName: undefined,
  noticeSort: undefined,
  noticeStatus: undefined,
  noticeContent: undefined,
}
const data = reactive<PageData<SystemshownoticeForm, SystemshownoticeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    noticeName: undefined,
    noticeSort: undefined,
    noticeStatus: undefined,
    noticeContent: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    noticeName: [
      { required: true, message: "公告名称不能为空", trigger: "blur" }
    ],
    noticeSort: [
      { required: true, message: "公告顺序不能为空", trigger: "blur" }
    ],
    noticeStatus: [
      { required: true, message: "公告状态不能为空", trigger: "change" }
    ],
    noticeContent: [
      { required: true, message: "公告内容不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询公告列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSystemshownotice(queryParams.value);
  systemshownoticeList.value = res.rows;
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
  systemshownoticeFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: SystemshownoticeVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加公告";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: SystemshownoticeVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getSystemshownotice(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改公告";
}

/** 提交按钮 */
const submitForm = () => {
  systemshownoticeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateSystemshownotice(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSystemshownotice(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: SystemshownoticeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除公告编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delSystemshownotice(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('systemshow/systemshownotice/export', {
    ...queryParams.value
  }, `systemshownotice_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
