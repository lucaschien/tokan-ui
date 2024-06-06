<template>
  <div class="AdminProductManagementDetail">
    <RouterLink class="active"
      :to="{ 
        name: 'AdminProductManagement', 
        query: {
          pageNo: route.query.pageNo,
          name: route.query.name
        }
      }">回列表</RouterLink>
    <div class="p-4 mt-3 card">
      <table class="table">
        <tbody>
          <tr v-if="dataModel.id">
            <th width="200">產品序號</th>
            <td>
              <input class="form-control" type="text" disabled v-model="dataModel.sequence"/>
            </td>
          </tr>
          <tr>
            <th>材質</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.material"/>
            </td>
          </tr>
          <tr>
            <th>型號</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.model"/>
            </td>
          </tr>
          <tr>
            <th>產品規格</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.specification"/>
            </td>
          </tr>
          <tr>
            <th>產品名稱</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.name"/>
            </td>
          </tr>
          <tr>
            <th>箱</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.boxCount"/>
            </td>
          </tr>
          <tr>
            <th>包</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.packCount"/>
            </td>
          </tr>
          <tr>
            <th>個</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.itemCount"/>
            </td>
          </tr>
          <tr>
            <th>原產地標籤</th>
            <td>
              <input class="form-control" type="text" v-model="dataModel.originLabel"/>
            </td>
          </tr>
          <tr>
            <th>備註</th>
            <td>
              <textarea class="form-control" v-model="dataModel.remarks"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary"
        @click="updateProduct()">儲存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/common/api';
import { ajax } from '@/common/ajax';

const route = useRoute();
const router = useRouter();
const popMsg = inject('popMsg');
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const dataModel = ref({
  sequence: '', // 序號
  id: '', // 產品編號
  name: '', // 產品名稱
  material: '', // 材質
  model: '', // 型號
  specification: '', // 產品規格
  boxCount: 0, // 箱
  packCount: 0, // 包
  itemCount: 0, // 個
  originLabel: '', // 原產地標籤
  remarks: "" // 備註
});

async function updateProduct() {
  const path = VITE_API_DOMAIN + api.Admin.updateProduct;
  const result = await ajax.post(path, dataModel.value);
  if (ajax.checkErrorCode(result.errorCode)) {
    const msg = (dataModel.value.id) ? '修改成功' : '新增成功';
    popMsg(msg);
    router.push({ 
      name: 'AdminProductManagement', 
      query: {
        pageNo: route.query.pageNo,
        name: route.query.name
      }
    });
  } else {
    popMsg(result.errorCode)
  }
}

// 有 sequence 代表是修改
if (route.query.sequence) {
  dataModel.value = JSON.parse(route.query.item);
}
</script>