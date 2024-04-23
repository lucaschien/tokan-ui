<template>
  <div class="GUI">
    <header>GUI</header>

    <div class="one-gui-box">
      <h1 class="title">環境變數</h1>
      <div>{{ VITE_BACKEND_HOST }}</div>
    </div>
        
    <div class="one-gui-box">
      <h1 class="title">h1 ~ h6</h1>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <h5>H5</h5>
      <h6>H6</h6>
    </div>

    <div class="one-gui-box">
      <h1 class="title">button</h1>
      <div>
        <button class="m-1 btn btn-primary">Primary</button>
        <button class="m-1 btn btn-secondary">Secondary</button>
        <button class="m-1 btn btn-success">Success</button>
        <button class="m-1 btn btn-danger">Danger</button>
        <button class="m-1 btn btn-warning">Warning</button>
        <button class="m-1 btn btn-info">Info</button>
        <button class="m-1 btn btn-light">Light</button>
        <button class="m-1 btn btn-dark">Dark</button>
        <button class="m-1 btn btn-link">Link</button>
      </div>
    </div>

    <div class="one-gui-box">
      <h1 class="title">table</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="one-gui-box">
      <h1 class="title">bootstrap 5 的 form </h1>
      <div>
        .form-label
        <label class="form-label">label</label>
      </div>

      <div>
        <label class="form-label">.form-control</label>
        <input class="form-control" type="text">
        <textarea class="form-control mt-3"></textarea>
      </div>

      <div>
        <label class="form-label">.form-select</label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div>
        <label class="form-label">.form-check-input: checkbox</label>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            checkbox
          </label>
        </div>
      </div>

      <div>
        <label class="form-label">.form-check-input: radio</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            radio1
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
          <label class="form-check-label" for="flexRadioDefault2">
            radio2
          </label>
        </div>
      </div>

      <div>
        <label class="form-label">.form-check .form-switch</label>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>
      </div>

    </div>

    <div class="one-gui-box">
      <h1 class="title">font-awesome-4.7.0</h1>
      <div>
        <i class="fa fa-address-book me-3" aria-hidden="true"></i>
        <i class="fa fa-check-square me-3" aria-hidden="true"></i>
        <i class="fa fa-check-circle me-3" aria-hidden="true"></i>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">vue Directive</div>
      <div>v-focus:
        <input class="form-control" type="text" v-focus>
      </div>
      <div>v-click-outside:
        <div class="card p-2" v-click-outside="testForClickOutsideFn">
          是否點擊在此div外部: {{ testForClickOutside }}
        </div>
      </div>
      <div>v-bs-tooltip:
        <div>
          <button class="btn btn-primary"
            v-bs-tooltip 
            data-bs-placement="bottom"
            title="哈哈哈"
          >
            Tooltip 設定預設向下
          </button>
          <span class="ms-4" v-bs-tooltip title="嘿嘿嘿" >Tooltip 無預設方向</span>
          <span class="m-2" v-for="item in testBSTooltip" :key="item"
            v-bs-tooltip :title="item">{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">alert.js</div>
      <div>
        <button class="btn btn-secondary m-1" @click="popMsg('popMsg')">popMsg</button>
        <button class="btn btn-secondary m-1" @click="openConfirm('openConfirm')">openConfirm</button>
        <button class="btn btn-secondary m-1" @click="timerMsg('timerMsg')">timerMsg</button>
        <button class="btn btn-secondary m-1" @click="openWarnConfirm('openWarnConfirm')">openWarnConfirm</button>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">ajax.js</div>
      <div>
        <button class="btn btn-secondary" @click="testAjax()">call ajax</button>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">html5-qrcode</div>
      <div>
        <input class="form-control w-100 mb-2" v-model="barcodeValue">
        <button class="btn btn-primary me-3" 
          @click="scanBarcode()">開始掃描</button>
        <!-- barcode 相機初始化位置 -->
        <div class="barcode-reader-box" v-show="openScanView">
          <div id="barcode-reader"></div>
          <button class="btn btn-primary mt-4 w-100" 
            @click="handleStop()">停止掃描</button>
        </div>
      </div>
    </div>

    

  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { ajax } from '@/common/ajax';
import { useHtml5QrCode } from '@/hooks/html5-qr-code'

// 測試環境變數
const VITE_BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

// 測試 alert.js
const popMsg = inject('popMsg');
const openConfirm = inject('openConfirm');
const timerMsg = inject('timerMsg');
const openWarnConfirm = inject('openWarnConfirm');

// 測試 direactive: ClickOutside.js
const testForClickOutside = ref(false)
const testForClickOutsideFn = (isOutSide) => {
  console.log('isOutSide: ', isOutSide)
  testForClickOutside.value = isOutSide
}

// 測試 direactive: BSTooltip.js
const testBSTooltip = ['aaaa', 'bbbb']

// 測試 ajax
const testAjax = async () => {
  const result = await ajax.get('https://jsonplaceholder.typicode.com/posts');
  console.log('result::', result);
}

// 測試 html5-qr-code 套件
let html5QrCode
const barcodeValue = ref('')
const openScanView = ref(false)
// 開始掃描
const scanBarcode = () => {
  openScanView.value = true;
  html5QrCode.start(barcodeSuccessCallback)
}
// 停止相機
const handleStop = () => {
  openScanView.value = false;
  html5QrCode.handleStop()
}
// 掃描成功後的回呼函式
const barcodeSuccessCallback = (decodedText) => {
  openScanView.value = false;
  // 傳入 searchProductName 去做後續處理
  barcodeValue.value = decodedText
    // 停止相機
  handleStop()
}
onMounted(() => {
  html5QrCode = useHtml5QrCode('barcode-reader')
})


</script>
