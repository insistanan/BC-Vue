<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="id" v-if="false">
            <el-input v-model="datavalue.id" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="开餐模式">
            <el-radio-group v-model="datavalue.serverMode">
              <el-radio label="1">自选开餐</el-radio>
              <el-radio label="2">每日开餐</el-radio>
              <el-radio label="3">周日不开餐</el-radio>
              <el-radio label="4">周一到周五开餐</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="datavalue.serverMode === '1'"  :inline="true" label="自选开餐日期" label-width="100px">
            <el-checkbox-group v-model="datavalue.serverDay" class="checkbox-group">
              <el-checkbox label="1">周一</el-checkbox>
              <el-checkbox label="2">周二</el-checkbox>
              <el-checkbox label="3">周三</el-checkbox>
              <el-checkbox label="4">周四</el-checkbox>
              <el-checkbox label="5">周五</el-checkbox>
              <el-checkbox label="6">周六</el-checkbox>
              <el-checkbox label="7">周日</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-form-item label="可提前报餐天数：" prop="earlyDay" label-width="125px">
              <el-input v-model="datavalue.earlyDay" type="number" style="width: 240px" />
              <el-button type="primary" plain  @click="updateservermode" v-hasPermi="['mealmanage:mealservermode:add']">更新开餐模式信息</el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script setup name="Mealservermode" lang="ts">

import { listMealservermode, getMealservermode, delMealservermode, addMealservermode, updateMealservermode } from '@/api/mealmanage/mealservermode';
import { MealservermodeVO, MealservermodeQuery, MealservermodeForm } from '@/api/mealmanage/mealservermode/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const mealservermodeList = ref<MealservermodeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const mealservermodeFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MealservermodeForm = {
  serverMode: undefined,
  serverDay: undefined,
  earlyDay: undefined,
}
const data = reactive<PageData<MealservermodeForm, MealservermodeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    params: {
    }
  },
  rules: {

  }
});

let datavalue = reactive({
  id: "",
  serverMode: "",
  serverDay: [],
  earlyDay: 0,
})


const { queryParams, form, rules } = toRefs(data);

/** 查询开餐模式信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await getMealservermode("1");
  if (res.data) {
    datavalue.id = res.data.id;
    datavalue.serverMode = res.data.serverMode;
    datavalue.serverDay = res.data.serverDay.split(",");
    datavalue.earlyDay = res.data.earlyDay;
  }
  loading.value = false;
}


/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  mealservermodeFormRef.value?.resetFields();
}

const updateservermode = async () => {
  const updateData = {
    id: datavalue.id,
    serverMode: datavalue.serverMode,
    serverDay: datavalue.serverDay.join(","),
    earlyDay: datavalue.earlyDay
  };

  const res = await updateMealservermode(updateData);

  if (res && res.msg === "操作成功") {
    proxy?.$modal.msgSuccess("修改成功");
  } else {
    proxy?.$modal.msgError("修改失败");
  }
}

const updateEarlyDay = () => {
  proxy?.$modal.msgSuccess("修改成功");
}

/** 提交按钮 */
const submitForm = () => {
  mealservermodeFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMealservermode(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMealservermode(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

onMounted(() => {
  getList();
});
</script>
<style>
/* 这些样式确保每个表单项都在自己的行中显示 */
.el-form-item {
  display: block; /* 使每个表单项都单独占一行 */
  margin-bottom: 20px; /* 添加一些底部间距以便更好的视觉分隔 */
}

/* 针对自选开餐日期的复选框组的样式 */
.checkbox-group {
  display: flex; /* 使用弹性盒模型来布局复选框 */
  flex-wrap: wrap; /* 允许复选框换行 */
  gap: 4px; /* 在复选框之间添加一些间隙 */
}

/* 可提前报餐天数的输入框和按钮的样式 */
.el-input {
  margin-right: 10px; /* 在输入框和按钮之间添加一些间隙 */
}

/* 按钮的样式 */
.el-button {
  margin-top: 5px; /* 对于小屏幕，当按钮换行时添加一些顶部间距 */
}

/* 响应式调整：在较小屏幕上确保内容不会太拥挤 */
@media (max-width: 600px) {
  .checkbox-group {
    flex-direction: column; /* 在小屏幕上，复选框垂直排列 */
  }
}

</style>
