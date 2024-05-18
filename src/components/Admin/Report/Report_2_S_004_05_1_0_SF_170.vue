<template>
  <!-- 2-S-004-05-1.0 SF-170成型機清潔檢查表 -->
  <div class="Report_2_S_004_05_1_0_SF_170">
    <div style="text-align: center; height: 55px;">
      <img class="logo" src="/img/full_logo.png">
    </div>
    <div style="text-align: center; font-size: 24px;">
      SF-170成型機清潔檢查表
    </div>
    <table>
      <tbody>
        <tr>
          <td class="flex-between" style="font-size: 20px;">
            <div style="width: 60%;">
              <span style="display: inline-block; width: 40%;">機台編號:</span>
              <span style="display: inline-block;">號成型機</span>
            </div>
            <div>
              <span style="display: inline-block; margin-right: 50px;">年</span>
              <span style="display: inline-block;">月</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 標頭 -->
    <table>
      <tbody>
        <tr>
          <td align="center" width="7.6%" rowspan="3">項目</td>
          <td align="center" :width="(6.6*4)+'%'" colspan="4">每日</td>
          <td align="center" :width="(6.6*10)+'%'" colspan="10">每週</td>
        </tr>
        <tr>
          <td align="center" :width="(6.6*3)+'%'" colspan="3">清潔</td>
          <td align="center" width="6.6%" >清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
          <td align="center" width="6.6%" rowspan="2">清潔</td>
        </tr>
        <tr>
          <td align="center" width="6.6%">12:50</td>
          <td align="center" width="6.6%">16:30</td>
          <td align="center" width="6.6%">20:00</td>
          <td align="center" width="6.6%">12:50</td>
        </tr>
        <tr style="font-size: 14px;">
          <td align="center" style="font-size: 16px;">日期</td>
          <td align="center">杯底預折器</td>
          <td align="center">杯底預折器</td>
          <td align="center">杯底預折器</td>
          <td align="center">杯底預折器</td>
          <td align="center">杯底旋壓器</td>
          <td align="center">公模</td>
          <td align="center">杯底預折器</td>
          <td align="center">杯底旋壓器</td>
          <td align="center">杯口捲邊<br>模具</td>
          <td align="center">矽力康槽</td>
          <td align="center">母模</td>
          <td align="center">機台成品<br>出口籠架</td>
          <td align="center">成型機檯面</td>
          <td align="center">塑膠輸杯管</td>
        </tr>
      </tbody>
    </table>

    <!-- 表身 -->
    <div class="oneSampleLRTableBox">
      <!-- for 日期 -->
      <table style="width: 7.6%">
        <tbody>
          <tr v-for="item in days" :key="'day'+item">
            <td align="center">{{ item }}號</td>
          </tr>
        </tbody>
      </table>
      <!-- for 每日 作業員 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in days" :key="'td1'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in days" :key="'td2'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in days" :key="'td3'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in days" :key="'td4'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <!-- for 每週 杯底旋壓器 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week1'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 公模 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week2'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 杯底預折器 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week3'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 杯底旋壓器 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week4'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 杯口捲邊模具 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week5'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 矽力康槽 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week6'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 母模 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week7'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 機台成品出口籠架 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week8'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 成型機檯面 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week9'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 塑膠輸杯管 -->
      <table style="width: 6.6%">
        <tbody>
          <tr v-for="item in weeks" :key="'week10'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 備註 -->
    <table>
      <tbody>
        <tr>
          <td height="150" valign="top">
            <span style="font-size: 13px;">備註</span><br>
            <span>* 完成後操作人員於負責欄位內<i class="fc-red">簽名</i></span><br>
            <div style="font-size: 14px;">
              1. 每日清潔：早班12:50、16:30、20:00；執行人員：成型機人員。<br>
              2. 每週清潔：每週一早上07:30開始；執行人員：成型機人員。
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex-between">
      <span>生管:</span>
      <span>品管:</span>
      <span>品檢:</span>
      <span>2-S-004-05-1.0</span>
    </div>

  </div>
</template>

<script setup>
import moment from 'moment'

const today =  moment('2025-01-05') //TODO... 這個日期之後還要重搜尋條件帶過來
const days = today.daysInMonth()
const weeks = Math.floor(days/7);
const lastWeekDay = days - (weeks * 7)

console.log('kkkk', today, days, weeks, lastWeekDay)


</script>