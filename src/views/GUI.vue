<template>
  <div class="GUI">
    <header>GUI</header>
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
        .form-control
        <input class="form-control" type="text">
        <textarea class="form-control mt-3"></textarea>
      </div>

      <div>
        .form-select
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div>
        .form-check-input: checkbox
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            checkbox
          </label>
        </div>
      </div>

      <div>
        .form-check-input: radio
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
        .form-switch
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>
      </div>

    </div>

    <div class="one-gui-box">
      <div class="title">vue Directive</div>
      <div>
        v-focus:
        <input class="form-control" type="text" v-focus>
      </div>
      <div >
        v-click-outside:
        <div class="card" v-click-outside="testForClickOutsideFn">
          是否點擊在此div外部: {{ testForClickOutside }}
        </div>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">alert.js</div>
      <div>
        <button class="btn btn-secondary me-1" @click="popMsg('popMsg')">popMsg</button>
        <button class="btn btn-secondary me-1" @click="openConfirm('openConfirm')">openConfirm</button>
        <button class="btn btn-secondary me-1" @click="timerMsg('timerMsg')">timerMsg</button>
        <button class="btn btn-secondary" @click="openWarnConfirm('openWarnConfirm')">openWarnConfirm</button>
      </div>
    </div>

    <div class="one-gui-box">
      <div class="title">ajax.js</div>
      <div>
        <button class="btn btn-secondary" @click="testAjax()">call ajax</button>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { ajax } from '@/common/ajax';

const popMsg = inject('popMsg');
const openConfirm = inject('openConfirm');
const timerMsg = inject('timerMsg');
const openWarnConfirm = inject('openWarnConfirm');

const testForClickOutside = ref(false)
const testForClickOutsideFn = (isOutSide) => {
  console.log('isOutSide: ', isOutSide)
  testForClickOutside.value = isOutSide
}

const testAjax = () => {
  console.log(ajax);
}

</script>
