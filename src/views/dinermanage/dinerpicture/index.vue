<template>
  <div class="p-2">

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['dinermanage:dinerperson:query']">获取加入食堂二维码</el-button>
          </el-col>
        </el-row>
      </template>

      <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改用餐人员信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>

    </el-dialog>
  </div>
</template>

<script setup name="Dinerperson" lang="ts">
import { listDinerperson, getDinerperson, delDinerperson, addDinerperson, updateDinerperson } from '@/api/dinermanage/dinerperson';
import { DinerpersonVO, DinerpersonQuery, DinerpersonForm } from '@/api/dinermanage/dinerperson/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_data_status } = toRefs<any>(proxy?.useDict('sys_data_status'));

const dinerpersonList = ref<DinerpersonVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const dinerpersonFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DinerpersonForm = {
  id: undefined,
  personCode: undefined,
  personName: undefined,
  personTel: undefined,
  personCardno: undefined,
  personDinerdeptid: undefined,
  personDinerjobid: undefined,
  personHeadimg: undefined,
  status: undefined,
}
const data = reactive<PageData<DinerpersonForm, DinerpersonQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    personCode: undefined,
    personName: undefined,
    personTel: undefined,
    personCardno: undefined,
    personDinerdeptid: undefined,
    personDinerjobid: undefined,
    personHeadimg: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "id不能为空", trigger: "blur" }
    ],
    personCode: [
      { required: true, message: "工号不能为空", trigger: "blur" }
    ],
    personName: [
      { required: true, message: "昵称不能为空", trigger: "blur" }
    ],
    personTel: [
      { required: true, message: "手机号不能为空", trigger: "blur" }
    ],
    personCardno: [
      { required: true, message: "职工卡号不能为空", trigger: "blur" }
    ],
    personDinerdeptid: [
      { required: true, message: "部门不能为空", trigger: "blur" }
    ],
    personDinerjobid: [
      { required: true, message: "职务不能为空", trigger: "blur" }
    ],
    personHeadimg: [
      { required: true, message: "头像不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用餐人员信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDinerperson(queryParams.value);
  dinerpersonList.value = res.rows;
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
  dinerpersonFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DinerpersonVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用餐人员信息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DinerpersonVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDinerperson(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用餐人员信息";
}

/** 提交按钮 */
const submitForm = () => {
  dinerpersonFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDinerperson(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDinerperson(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DinerpersonVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用餐人员信息编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDinerperson(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('dinermanage/dinerperson/export', {
    ...queryParams.value
  }, `dinerperson_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
