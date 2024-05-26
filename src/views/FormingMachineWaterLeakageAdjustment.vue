<template>
  <div class="FormingMachineWaterLeakageAdjustment p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ nowFormingMachineInfo.name }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
      <RouterBackBtn 
        :btn-text="'選擇其它功能'"
        :router-name="'FormingMachineFnEnter'"
        :router-query="{ 'machineId': nowMachineId }"
      />
    </div>

    <h4 class="text-center mt-4 mb-4">漏水調機</h4>

    <div class="custom-tables-box">
      <div class="fs-6 mb-4">
        1.4小時/次杯漏檢驗發生漏水時，從成型機上連續拿40個紙杯到品檢室進行檢驗。<br>										
        2.未調機狀態下，40杯杯漏確認即合格時，請組長執行破壞試驗覆測(連續8pcs)，合格後再恢復生產。<br>
        3.待再檢合格後才可恢復生產。<br>	
        4.杯漏調整完成後，生產每1小時加做漏水測試。<br>	
        5.連續2次1小時測漏正常後即可恢復4小時正常測漏。<br>	
        6.未於兩次循環(40→24→24)內結案的話即立即停機調整。
      </div>
      <hr>

      <div class="mb-3 row">
        <label class="form-label col-4">檢查時間</label>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="輸入範例 08:30"/>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">檢查杯數</label>
        <div class="col-8">

          <div class="form-check col-2">
            <input class="form-check-input" type="radio" name="cupType" id="cup24" value="cup24"
              v-model="dataModel.cupType"
              @change="changeCups()"/>
            <label class="form-check-label" for="cup24">24</label>
          </div>
          <div class="form-check col-2">
            <input class="form-check-input" type="radio" name="cupType" id="cup40" value="cup40"
              v-model="dataModel.cupType"
              @change="changeCups()"/>
            <label class="form-check-label" for="cup40">40</label>
          </div>
          <div class="form-check col-2">
            <input class="form-check-input" type="radio" name="cupType" id="cupOther" value="cupOther" 
              v-model="dataModel.cupType"
              @change="changeCups()"/>
            <label class="form-check-label" for="cupOther">其他</label>
          </div>
          <input class="form-control mt-2" v-if="dataModel.cupType === 'cupOther'"
            type="number" min="0" placeholder="請輸入psc數" v-model="dataModel.cupNum"/>          
        </div>
      </div>
      <hr>
      <div class="mb-3">
        <label class="form-label">漏水部位</label>
        <div class="mb-3 row">
          <label class="form-label col-4 ps-5">背封</label>
          <div class="col-8">
            <input class="form-control" type="text">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4 ps-5">交叉點</label>
          <div class="col-8">
            <input class="form-control" type="text">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4 ps-5">杯底黏合</label>
          <div class="col-8">
            <input class="form-control" type="text">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4 ps-5">膜破</label>
          <div class="col-8">
            <input class="form-control" type="text">
          </div>
        </div>
      </div>
      <hr>
      <div class="mb-3 row">
        <label class="form-label col-4">漏水杯數</label>
        <div class="col-8">
          <input class="form-control" type="number" min="0"/>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">檢查結果</label>
        <div class="col-8">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sample1" id="test1">
            <label class="form-check-label" for="test1">未漏</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sample1" id="test2">
            <label class="form-check-label" for="test2">漏水</label>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">檢查人</label>
        <div class="col-8">
          <input class="form-control" type="text"  />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">調機人</label>
        <div class="col-8">
          <input class="form-control" type="text"  />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">備註/調機內容</label>
        <div class="col-8">
          <textarea class="form-control" row="2"></textarea>
        </div>
      </div>
      <hr>

      <div class="mb-3 row">
        <label class="form-label col-4">破壞試驗覆測(連續8pcs)</label>
        <div class="col-8">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sample2" id="test3">
            <label class="form-check-label" for="test3">合格</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sample2" id="test4">
            <label class="form-check-label" for="test4">不合格</label>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">覆測人</label>
        <div class="col-8">
          <input class="form-control" type="text"  />
        </div>
      </div>
      <hr>

      <div class="fz-6 pt-4">
        備註:<br>
        1.有漏水時，漏水部位每個欄位皆需填寫。<br>
        2.停機請於備註/調機內容欄位註明。<br>
        3.每次調機時請將調機內容記錄於本表。<br>
        4.每次調機時請記錄測漏結果。
      </div>

    </div>

    <button class="btn btn-primary w-100 mt-4" 
      @click="popMsg('資料已送出')">送出</button>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const dataModel = ref({
  cupType: '',
  cupNum: null
})
function changeCups() {
  dataModel.value.cupNum = null;
  if (dataModel.value.cupType === 'cup24') {
    dataModel.value.cupNum = 24;
  }
  if (dataModel.value.cupType === 'cup40') {
    dataModel.value.cupNum = 40;
  }
}


onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

</script>