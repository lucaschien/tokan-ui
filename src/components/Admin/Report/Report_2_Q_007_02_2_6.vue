<template>
  <!-- 2-Q-007-02-2.6杯漏調整後再檢表 -->
  <div class="Report_2_Q_007_02_2_6">
    <div class="flex-between">
      <div style="width: 33.3%; height: 55px;">
        <img class="logo" src="/img/full_logo.png">
      </div>
      <div style="width: 33.3%; display: flex; justify-content: center; align-items: center; font-size: 24px;">
        杯漏調整後再檢表
      </div>
      <div style="width: 33.3%"></div>
    </div>

    <table>
      <tbody>
        <tr>
          <td rowspan="2" width="50%">
            生產日期:
            <span style="display: inline-block">2024</span>年
            <span style="display: inline-block">12</span>月
            <span style="display: inline-block">31</span>日，星期
            <span style="display: inline-block; margin-right: 20px;">三</span>
            <br>
            <span class="span-check-box active"></span>早班
            <span class="span-check-box"></span>中班
            <span class="span-check-box"></span>晚班
          </td>
          <td>再檢單號:</td>
        </tr>
        <tr>
          <td>成型機機號:</td>
        </tr>
      </tbody>
    </table>

    <!-- 提示 -->
    <table>
      <tbody>
        <tr>
          <td>
            1.4小時/次杯漏檢驗發生漏水時，從成型機上連續拿40個紙杯到品檢室進行檢驗。<br>
            <span class="fc-blue">2.未調機狀態下，40杯杯漏確認即合格時，請組長執行破壞試驗覆測(連續8pcs)，合格後再恢復生產。</span><br>
            3.待再檢合格後才可恢復生產。<br>
            4.杯漏調整完成後，生產每1小時加做漏水測試。<br>
            5.連續2次1小時測漏正常後即可恢復4小時正常測漏。<br>
            6.未於兩次循環(40→24→24)內結案的話即立即停機調整。
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td align="center" rowspan="2">檢查時間</td>
          <td align="center" rowspan="2">檢查杯數</td>
          <td align="center" colspan="4">漏水部位</td>
          <td align="center" rowspan="2">漏水杯數</td>
          <td align="center" rowspan="2">檢查結果</td>
          <td align="center" rowspan="2">檢查人</td>
          <td align="center" rowspan="2">調機人</td>
          <td align="center" rowspan="2">備註/調機內容</td>
          <td align="center" rowspan="2" class="fc-blue">破壞試驗覆測<div style="font-size:12px;">(連續8pcs)</div></td>
        </tr>
        <tr>
          <td align="center">背封</td>
          <td align="center">交叉點</td>
          <td align="center">杯底黏合</td>
          <td align="center">膜破</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>
            <span class="span-check-box"></span>未漏<br>
            <span class="span-check-box"></span>漏水
          </td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td class="fc-blue">
            <span class="span-check-box"></span>合格
            <span class="span-check-box"></span>不合格<br>
            覆測人:
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 備註 -->
    <table>
      <tbody>
        <tr>
          <td>
            <span style="font-size: 18px;">備註:</span><br>
            1.有漏水時，漏水部位每個欄位皆需填寫。<br>
            2.停機請於備註/調機內容欄位註明。<br>
            3.每次調機時請將調機內容記錄於本表。<br>
            4.每次調機時請記錄測漏結果。
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex-between">
      <span>廠長:</span>
      <span>品管:</span>
      <span>品檢:</span>
      <span>2-Q-007-02-2.6</span>
    </div>

  </div>
</template>