<template>
  <div>
    <el-upload
      class="image-upload"
      :action="uploadImgUrl"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :headers="headers"

    >
      <el-button type="primary">上传图片</el-button>
    </el-upload>

    <el-image
      v-if="imageUrl"
      style="max-width: 100%; margin-top: 20px;"
      :src="imageUrl"
      fit="contain"
    ></el-image>

    <el-button v-if="imageUrl" @click="handleDeleteImage" type="danger" style="margin-top: 20px;">
      删除图片
    </el-button>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElUpload, ElImage, ElButton, ElMessageBox } from 'element-plus';
import {globalHeaders} from "@/utils/request";

const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadImgUrl = ref(baseUrl + "/resource/oss/upload");
const imageUrl = ref<string | null>(null);
const headers = ref(globalHeaders());
const handleBeforeUpload = (file: File) => {
  // 可以在这里添加上传前的逻辑，如果返回 false 将取消上传
  return true;
};

const handleUploadSuccess = (response: any, file: File) => {
  // 上传成功后的回调，response 为服务端返回的数据
  if (response.code === 200) {
    imageUrl.value = response.data.url;
  } else {
    // 上传失败时的处理
    ElMessageBox.alert('上传失败', '错误提示', { type: 'error' });
  }
};

const handleDeleteImage = () => {
  // 删除图片的逻辑，这里只是简单地清空 imageUrl
  imageUrl.value = null;
};
</script>

<style scoped>
.image-upload {
  margin-bottom: 20px;
}
</style>
