<template>
  <!-- 2-Q-007-11-1.0紙杯破壞試驗檢查表 -->
  <div class="Report_2_Q_007_11_1_0">
    <div class="flex-between">
      <div style="width: 33.3%; height: 55px;">
        <img class="logo" src="/img/full_logo.png">
      </div>
      <div style="width: 33.3%; display: flex; justify-content: center; align-items: center; font-size: 24px;">
        紙杯破壞試驗檢查表
      </div>
      <div style="width: 33.3%; text-align: right;">
        檢測頻率<br>
        次/2小時
      </div>
    </div>

    <table>
      <tbody>
        <tr>
          <td align="center" rowspan="8" width="7%">成型機號</td>
        </tr>
        <tr>
          <td align="center" colspan="4" width="31%">生產日期</td>
          <td align="center" colspan="4" width="31%">生產日期</td>
          <td align="center" colspan="4" width="31%">生產日期</td>
        </tr>
        <tr>
          <td align="center" colspan="4">&nbsp;</td>
          <td align="center" colspan="4">&nbsp;</td>
          <td align="center" colspan="4">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="4">A班</td>
          <td align="center" colspan="4">B班</td>
          <td align="center" colspan="4">C班</td>
        </tr>
        <tr>
          <td align="center" colspan="4">組長</td>
          <td align="center" colspan="4">組長</td>
          <td align="center" colspan="4">組長</td>
        </tr>
        <tr>
          <td align="center" colspan="4">&nbsp;</td>
          <td align="center" colspan="4">&nbsp;</td>
          <td align="center" colspan="4">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="4">檢查時間</td>
          <td align="center" colspan="4">檢查時間</td>
          <td align="center" colspan="4">檢查時間</td>
        </tr>
        <tr>
          <td align="center" width="7.75%">09:00</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
          <td align="center" width="7.75%">&nbsp;</td>
        </tr>

        <!-- 單一台機器重複 row -->
        <tr v-for="item in 8" :key="item">
          <td align="center" width="7%">#{{ item }}</td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
          <td width="7.75%">
            <span class="span-check-box"></span>正常<br>
            <span class="span-check-box"></span>異常
          </td>
        </tr>

        <!-- 異常調機措施 -->
        <tr>
          <td align="center" width="7%">異常調機措施</td>
          <td colspan="4" width="31%" style="height: 90px;"></td>
          <td colspan="4" width="31%" style="height: 90px;"></td>
          <td colspan="4" width="31%" style="height: 90px;"></td>
        </tr>

      </tbody>
    </table>

    <div class="flex-between">
      <span>廠長:</span>
      <span>生管:</span>
      <span>品管:</span>
      <span>組長:</span>
      <span>2-Q-007-11-1.0</span>
    </div>

  </div>
</template>