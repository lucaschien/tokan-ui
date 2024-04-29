<template>
  <!-- 2-M-011-13-1.4 SF-170成型機生產報表 
       提醒: 11 號機器的成型機日報表使用 
  -->
  <div class="custom-tables-box Table2_M_011_13_1_4_SF_170">
    <p>2-M-011-13-1.4 SF-170成型機生產報表, 11 號機器的成型機日報表使用</p>

    <div class="mb-3 row">
      <label class="form-label col-4">原紙種類: </label>
      <div class="col-8">
        <input class="form-control" type="text" value="FSC" disabled>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">生產時間:</label>
      <div class="col-8 d-flex align-items-center">
        <div>
          <input class="form-control" type="text" placeholder="範例:00:00">
        </div>
        <div class="ps-3 pe-3">~</div>
        <div>
          <input class="form-control" type="text" placeholder="範例:00:00">
        </div>
      </div> 
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">成型速度:</label>
      <div class="col-8">
        <input class="form-control" type="number">
      </div>
    </div>


    <div class="mb-3 row">
      <label class="form-label col-4">杯內檢查機電腦:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample1" id="test1">
          <label class="form-check-label" for="test1">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample1" id="test2">
          <label class="form-check-label" for="test2">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">杯身兩側&杯底加熱器:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample2" id="test3">
          <label class="form-check-label" for="test3">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample2" id="test4">
          <label class="form-check-label" for="test4">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">杯口捲邊器作動:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample3" id="test5">
          <label class="form-check-label" for="test5">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample3" id="test6">
          <label class="form-check-label" for="test6">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">外觀確認:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample4" id="test7">
          <label class="form-check-label" for="test7">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample4" id="test8">
          <label class="form-check-label" for="test8">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">破壞測試確認:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample5" id="test9">
          <label class="form-check-label" for="test9">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample5" id="test10">
          <label class="form-check-label" for="test10">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">杯底紙裁切完整度檢查:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample6" id="test11">
          <label class="form-check-label" for="test11">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sample6" id="test12">
          <label class="form-check-label" for="test12">異常</label>
        </div>
      </div>
    </div>


    <div class="mb-3 row">
      <label class="form-label col-4">生產杯數(pcs):</label>
      <div class="col-8">
        <input class="form-control" type="number">
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">生產總杯數(pcs):</label>
      <div class="col-8">
        <input class="form-control" type="number">
      </div>
    </div>

    <button class="btn btn-primary w-100 mt-4" @click="popMsg('資料已送出')">送出</button>
  </div>
</template>

<script setup>

</script>