<template>
  <!-- 2-Q-007-01-2.6生產品質檢驗表 -->
  <div class="Report_2_Q_007_01_2_6">
    <div class="flex-between">
      <div style="width: 33.3%; height: 55px;">
        <img class="logo" src="/img/full_logo.png">
      </div>
      <div style="width: 33.3%; display: flex; justify-content: center; align-items: center; font-size: 24px;">
        生產品質檢驗表
      </div>
      <div style="width: 33.3%"></div>
    </div>

    <table>
      <tbody>
        <tr>
          <td class="noBorder">
            <div class="flex-between">
              <div>
                生產日期:
                <span style="display: inline-block">2024</span>年
                <span style="display: inline-block">12</span>月
                <span style="display: inline-block">31</span>日，星期
                <span style="display: inline-block; margin-right: 20px;">三</span>
                <span class="span-check-box active"></span>早班
                <span class="span-check-box"></span>午班
                <span class="span-check-box"></span>晚班
              </div>
              <div style="min-width: 200px;">操作者:</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td class="noBorder">
            漏水檢查 檢查數：24個 每4小時測漏一次，特殊品項每兩小時測漏一次。
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td rowspan="2" align="center" width="100">機號</td>
          <td rowspan="2" align="center">檢查時間</td>
          <td rowspan="2" align="center">檢查結果</td>
          <td colspan="4" align="center">漏水部位</td>
          <td rowspan="2" align="center">漏水杯數量</td>
          <td rowspan="2" align="center">再檢單號</td>
        </tr>
        <tr>
          <td align="center">背封</td>
          <td align="center">交叉點</td>
          <td align="center">杯底黏合</td>
          <td align="center">膜破</td>
        </tr>

        <!-- 單一台機器 -->
        <tr>
          <td rowspan="4" align="center">1號機</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>

      </tbody>
    </table>
    <div>尺寸、外觀檢查 檢查數：16個</div>

    <table>
      <tbody>
        <tr>
          <td rowspan="2" align="center" width="100">機號</td>
          <td rowspan="2" align="center">檢查時間</td>
          <td colspan="3" align="center">尺寸</td>
          <td rowspan="2" align="center">外觀</td>
        </tr>
        <tr>
          <td align="center">杯高</td>
          <td align="center">杯口徑</td>
          <td align="center">捲邊寬度</td>
        </tr>

        <!-- 單一台機器 -->
        <tr>
          <td rowspan="4" align="center">1號機</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

      </tbody>
    </table>
    <div>包裝袋檢查 檢查數：3個</div>

    <table>
      <tbody>
        <tr>
          <td align="center" width="100">機號</td>
          <td align="center">檢查時間</td>
          <td align="center">印字正常</td>
          <td align="center">印刷外觀正常</td>
          <td align="center">包裝背封良好</td>
          <td align="center">包裝上封口良好</td>
          <td align="center">包裝下封口良好</td>
          <td align="center">包裝袋寬幅正常</td>
        </tr>

        <!-- 單一台機器 -->
        <tr>
          <td rowspan="4" align="center">1號機</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="flex-between">
      <span>廠長 :</span>
      <span>品管 :</span>
      <span>品檢:</span>
      <span>2-Q-007-01-2.6</span>
    </div>
    
  </div>
</template>