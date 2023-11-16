<template>
  <div class="p-2">
    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mealmanage:mealkeyword:add']">添加关键词</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mealkeywordList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="关键词" align="center" prop="keywordName" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['mealmanage:mealkeyword:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['mealmanage:mealkeyword:remove']"></el-button>
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
    <!-- 添加或修改关键词对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="mealkeywordFormRef" :model="form" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="关键词" prop="keywordName">
          <el-input v-model="form.keywordName" placeholder="请输入关键词" />
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

<script setup name="Mealkeyword" lang="ts">
import { listMealkeyword, getMealkeyword, delMealkeyword, addMealkeyword, updateMealkeyword } from '@/api/mealmanage/mealkeyword';
import { MealkeywordVO, MealkeywordQuery, MealkeywordForm } from '@/api/mealmanage/mealkeyword/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const mealkeywordList = ref<MealkeywordVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealkeywordFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealkeywordForm = {
  id: undefined,
  keywordName: undefined,
}
const data = reactive<PageData<MealkeywordForm, MealkeywordQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    keywordName: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    keywordName: [
      { required: true, message: "关键词不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询关键词列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMealkeyword(queryParams.value);
  mealkeywordList.value = res.rows;
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
  mealkeywordFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MealkeywordVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加关键词";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MealkeywordVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMealkeyword(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改关键词";
}

/** 提交按钮 */
const submitForm = () => {
  mealkeywordFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealkeyword(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealkeyword(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MealkeywordVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除关键词编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMealkeyword(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('mealmanage/mealkeyword/export', {
    ...queryParams.value
  }, `mealkeyword_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
