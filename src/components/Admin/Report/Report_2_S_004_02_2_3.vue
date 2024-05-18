<template>
  <!-- 2-S-004-02-2.3成型機清潔檢查表 -->
  <div class="Report_2_S_004_02_2_3">
    <div style="text-align: center; height: 55px;">
      <img class="logo" src="/img/full_logo.png">
    </div>
    <div style="text-align: center; font-size: 24px;">
      成型機清潔檢查表
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
          <td align="center" width="7.2%" rowspan="3">項目</td>
          <td align="center" :width="(5.8*3)+'%'" colspan="3">每日</td>
          <td align="center" :width="(5.8*11)+'%'" colspan="11">每週</td>
          <td align="center" :width="(5.8*1)+'%'">每兩週</td>
          <td align="center" :width="(5.8*1)+'%'">每兩週</td>
        </tr>
        <tr>
          <td align="center" :width="(5.8*3)+'%'" colspan="3">作業員</td>
          <td align="center" :width="(5.8*10)+'%'" colspan="10">作業員</td>
          <td align="center" :width="(5.8*2)+'%'" colspan="2" class="fc-blue border-red" style="border-width: 2px;">組長</td>
          <td align="center" width="5.8%">保修</td>
        </tr>
        <tr>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%">清潔</td>
          <td align="center" width="5.8%" class="fc-blue border-red" style="border-width: 2px;">清潔</td>
          <td align="center" width="5.8%" class="fc-blue border-red" style="border-width: 2px;">清潔</td>
          <td align="center" width="5.8%">清潔</td>
        </tr>
        <tr style="font-size: 14px;">
          <td align="center" style="font-size: 16px;">日期</td>
          <td align="center">杯底<br>預折器</td>
          <td align="center">杯底<br>旋壓器</td>
          <td align="center">杯底環</td>
          <td align="center">公模</td>
          <td align="center">杯底<br>預折器</td>
          <td align="center">杯底<br>旋壓器</td>
          <td align="center">杯口捲<br>邊模具</td>
          <td align="center">矽力康槽</td>
          <td align="center">母模</td>
          <td align="center">杯底沖刀</td>
          <td align="center">機台成品<br>出口籠架</td>
          <td align="center">捲邊<br>加熱器</td>
          <td align="center">成型機<br>檯面</td>
          <td align="center" class="fc-blue border-red" style="border-width: 2px;">矽力康<br>毛刷</td>
          <td align="center" class="fc-blue border-red" style="border-width: 2px;">輸杯管<br>輸杯管<br>Air噴頭</td>
          <td align="center">杯底環</td>
          
          <!-- <td align="center" v-for="item in 17">{{ item }}</td> -->
        </tr>
      </tbody>
    </table>

    <!-- 表身 -->
    <div class="oneSampleLRTableBox">
      <!-- for 日期 -->
      <table style="width: 7.2%">
        <tbody>
          <tr v-for="item in days" :key="'day'+item">
            <td align="center">{{ item }}號</td>
          </tr>
        </tbody>
      </table>
      <!-- for 每日 作業員 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in days" :key="'td1'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in days" :key="'td2'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in days" :key="'td3'+item">
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 公模 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week1'+item">
            <td align="center" :height="27 * 7" ></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 杯底預折器 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week2'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 杯底旋壓器 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week3'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 杯口捲邊模具 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week4'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 矽力康槽 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week5'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 母模 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week6'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 杯底沖刀 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week7'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 機台成品出口籠架 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week8'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 捲邊加熱器 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week9'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每週 作業員 成型機檯面 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week10'+item">
            <td align="center" :height="27 * 7"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
      <!-- for 每兩週	組長 矽力康毛刷 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week11'+item">
            <td align="center" :height="27 * 7" class="border-red" 
              style="border-width: 2px;"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay" class="border-red" style="border-width: 2px;"></td></tr>
        </tbody>
      </table>
      <!-- for 每兩週	組長 輸杯管輸杯管Air噴頭 -->
      <table style="width: 5.8%">
        <tbody>
          <tr v-for="item in weeks" :key="'week12'+item">
            <td align="center" :height="27 * 7" class="border-red" 
            style="border-width: 2px;"></td>
          </tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay" class="border-red" style="border-width: 2px;"></td></tr>
        </tbody>
      </table>
      <!-- for 每兩週	保修 杯底環 -->
      <table style="width: 5.8%">
        <tbody>
          <tr><td align="center" :height="27 * 14"></td></tr>
          <tr><td align="center" :height="27 * 14"></td></tr>
          <tr v-if="lastWeekDay"><td align="center" :height="27 * lastWeekDay"></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 備註 -->
    <table>
      <tbody>
        <tr>
          <td height="100" valign="top">
            <span style="font-size: 13px;">備註</span><br>
            <span>* 完成後操作人員於負責欄位內<i class="fc-red">簽名</i></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex-between">
      <span>副廠長:</span>
      <span>品管:</span>
      <span>品檢:</span>
      <span>2-S-004-02-2.3</span>
    </div>
	
  </div>
</template>

<script setup>
import moment from 'moment'

const today =  moment('2025-02-05') //TODO... 這個日期之後還要重搜尋條件帶過來
const days = today.daysInMonth()
const weeks = Math.floor(days/7);
const lastWeekDay = days - (weeks * 7)

console.log('kkkk', today, days, weeks, lastWeekDay)


</script>