<template>
  <div class="AdminReplacementProductFormDetail">
    <RouterLink class="active"
      :to="{ name: 'AdminReplacementProductForm' }">回列表</RouterLink>
    <div class="p-4 mt-3 card">
      <table class="table">
        <tbody>
          <tr>
            <th width="200">開單日期</th>
            <td>input</td>
          </tr>
          <tr>
            <th>包裝機編號</th>
            <td>select</td>
          </tr>
          <tr>
            <th>更換包裝機編號</th>
            <td>select</td>
          </tr>
          <tr>
            <th>原線上產品</th>
            <td>
              <div>產品編號 select</div>
              <div>包裝數 select</div>
            </td>
          </tr>
          <tr>
            <th>更換產品</th>
            <td>
              <div>產品編號 select</div>
              <div>包裝數 select</div>
            </td>
          </tr>
          <tr>
            <th>生產餘數領用確認</th>
            <td>
              <div>更換產品前次紙杯餘料____pcs，需於本次生產進行重包，數量確認:____pcs</div>
              <div>更換產品前次包裝膜餘料___捲，需於本次生產使用</div>
            </td>
          </tr>
          <tr>
            <th>產品更換清空項目</th>
            <td>
              <div>□原線上產品的紙杯是否清空</div>
              <div>□原線上產品的包裝膜是否清空</div>
              <div>□原線上產品的紙箱、隔板是否清空</div>
              <div>確認人 input</div>
            </td>
          </tr>
          <tr>
            <th>產品更換後檢查項目</th>
            <td>
              <div>□包裝規格書是否正確</div>
              <div>□系統產品編號、成型機生產機台是否正確</div>
              <div>□備料紙箱放置位置是否正確</div>
              <div>□首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書</div>
              <div>□首件檢查，確認標籤確認符合規格書</div>
              <div>確認人 input</div>
            </td>
          </tr>
          <tr>
            <th>預計更換時間</th>
            <td>input</td>
          </tr>
          <tr>
            <th>實際更換時間</th>
            <td>input</td>
          </tr>
          <tr>
            <th>組長確認</th>
            <td>input</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isCreate = !route.query.id;

console.log('isCreate >>> ', isCreate)



/*
orderDate; // 開單日期
changeProvisionNo; // 包裝機編號(不在excel中)
changeMethod; // 更換包裝機編號(在excel中)

// 原線上產品
originalProductNo; // 原線上產品-產品編號
originalPackageQty; // 原線上產品-包裝數

// 更換產品
changeProductNo; // 更換產品-產品編號
changePackageQty; // 更換產品-包裝數

// 生產餘數領用確認
paperCupRemaining; // 更換產品前次紙杯餘料(pcs)
repackageQty; // 數量確認(pcs)
filmRemaining; // 更換產品前次包裝膜餘料(捲)

// 產品更換清空項目
cupClear; // 原線上產品的紙杯是否清空
filmClear; // 原線上產品的包裝膜是否清空
accessoryClear; // 原線上產品的紙箱、隔板是否清空
clearChecker; // 產品更換清空項目-確認人

// 產品更換後檢查項目
specConfirm; // 包裝規格書是否正確
systemConfirm; // 系統產品編號、成型機生產機台是否正確
positionConfirm; // 備料紙箱放置位置是否正確
firstItemConfirm; // 首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書
labelConfirm; // 首件檢查，確認標籤確認符合規格書
lastConfirmChecker; // 產品更換後檢查項目-確認人

planChangeTime; // 預計更換時間
actualChangeTime; // 實際更換時間
managerConfirm; // 組長確認
*/

</script>