<template>
  <div class="AdminFormingMachineMonitoringItemList">
    <div class="table-box">
      <!-- searh -->
      <div class="search-box">
        <label class="form-label">機器類型</label> 
        <select class="form-select" v-model="moldingMachineType"
          @change="listData = []; listIsempty = false; sendSearch();">
          <option value="">請選擇</option>
          <option value="FORMING">成型機</option>
          <option value="FORMING_SF170">成型機-SF-170</option>
        </select>
        <button class="btn btn-primary" :disabled="!moldingMachineType"
          @click="sendSearch()">查詢</button>
        <button class="btn btn-outline-primary ms-1" @click="isOpenCreatedModal = !isOpenCreatedModal">
          <i class="fa fa-plus me-1" aria-hidden="true"></i>新增
        </button>
      </div>

      <!-- table -->
      <table class="table" v-if="moldingMachineType">
        <thead class="table-light">
          <tr>
            <th width="50%">監控項目</th>
            <th >機器類型</th>
            <th width="140">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listData" :key="item.id">
            <td>
              <template v-if="!modifyItem || modifyItem.id !== item.id">{{ item.itemName }}</template>
              <input class="form-control" type="text" v-model="modifyItem.itemName" v-if="modifyItem && modifyItem.id === item.id">
            </td>
            <td>{{ moldingMachineMap[item.moldingMachineType] }}</td>
            <td>
              <template v-if="!modifyItem || modifyItem.id !== item.id">
                <button class="btn btn-outline-secondary" @click="modifyItem = item">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button class="btn btn-outline-secondary ms-3" @click="deleteItem(item)">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </template>
              <template v-if="modifyItem && modifyItem.id === item.id">
                <button class="btn btn-outline-secondary" @click="saveModify()">
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                </button>
              </template>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="3">查無資料</td></tr>
        </tbody>
      </table>

    </div>

    <!-- 新增 modal -->
    <div class="create-modal" v-if="isOpenCreatedModal">
      <div>
        <h4>新增監控項目</h4>
        <label class="form-label mt-3">機器類型</label> 
        <select class="form-select mb-3" 
          v-model="createModal.moldingMachineType">
          <option value="">請選擇</option>
          <option value="FORMING">成型機</option>
          <option value="FORMING_SF170">成型機-SF-170</option>
        </select>
        <label class="form-label">監控項目名稱</label> 
        <input class="form-control" type="text" 
          v-model="createModal.name">

        <div class="text-center mt-4">
          <button class="btn btn-outline-primary"
            @click="closeCreateModal()">取消</button>
          <button class="btn btn-primary ms-2"
            @click="sendCreate()">新增</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { api, formatPath } from '@/common/api';
import { ajax } from '@/common/ajax';

const popMsg = inject('popMsg');
const openConfirm = inject('openConfirm');
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const listData = ref([]);
const listIsempty = ref(false);
const moldingMachineType = ref('');

const moldingMachineMap = {
  FORMING: '成型機',
  FORMING_SF170: '成型機-SF-170',
};

async function sendSearch () {
  if (!moldingMachineType.value) return;

  modifyItem.value = null;
  const path = VITE_API_DOMAIN + formatPath(api.Admin.searchMonitoringItems, moldingMachineType.value);
  listIsempty.value = false;
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    listData.value = result.data;
    listIsempty.value = (result.data.length) ? false : true;
  } else {
    popMsg(result.errorCode)
  }
}

const isOpenCreatedModal = ref(false);
const createModal = ref({
  id: null,
  moldingMachineType: '',
  name: ''
});

function closeCreateModal() {
  isOpenCreatedModal.value = false;
  createModal.value.moldingMachineType = '';
  createModal.value.name = '';
}

async function sendCreate() {
  const path = VITE_API_DOMAIN + api.Admin.createMonitoring;
  const result = await ajax.post(path, createModal.value);
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('新增成功');
    closeCreateModal();
    sendSearch();
  } else {
    popMsg(result.errorCode)
  }
}

function deleteItem(item) {
  openConfirm('確定刪除?', async () => {
    const path = VITE_API_DOMAIN + formatPath(api.Admin.deleteMonitoringItem, item.id);
    const result = await ajax.delete(path);
    if (ajax.checkErrorCode(result.errorCode)) {
      popMsg('刪除成功');
      sendSearch();
    } else {
      popMsg(result.errorCode)
    }
  });
}

const modifyItem = ref(null);

async function saveModify () {
  const path = VITE_API_DOMAIN + api.Admin.createMonitoring;
  const param = JSON.parse(JSON.stringify(modifyItem.value));
  param.name = param.itemName;
  delete param.itemName;
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('修改成功');
    sendSearch();
  } else {
    popMsg(result.errorCode)
  }
}


onMounted(() => {

});
</script>