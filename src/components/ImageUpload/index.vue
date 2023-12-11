<template>
  <el-upload
    class="avatar-uploader"
    action="http://localhost:80/prod-api/resource/oss/upload"
    :show-file-list="false"
    :headers="headers"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {globalHeaders} from "@/utils/request";
import type { UploadProps } from 'element-plus'
import { propTypes } from '@/utils/propTypes';


const imageUrl = ref('')
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadImgUrl = ref(baseUrl + "/resource/oss/upload"); // 上传的图片服务器地址
const headers = ref(globalHeaders());
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: [String],
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: propTypes.array.def(["png", "jpg", "jpeg"])
});

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  emit("update:modelValue", response.data.url);
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type.indexOf("image/") == -1) {
    ElMessage.error('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

onBeforeMount(() => {
  imageUrl.value = props.modelValue
})
onUpdated( () => {
  imageUrl.value = props.modelValue
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
