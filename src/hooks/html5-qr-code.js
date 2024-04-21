import { Html5Qrcode } from 'html5-qrcode'

export const useHtml5QrCode = (domId) => {
  const html5QrCode = new Html5Qrcode(domId)

  // 啟動相機  開啟掃描功能
  // 傳入 qrCodeSuccessCallback 掃描成功後要做的事
  const start = (qrCodeSuccessCallback) => {
    // 相機brcode顯示設定
    const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } }

    // 套件啟動相機function
    html5QrCode.start(
      // 使用預設前或後鏡頭 （environment 為使用預設）
      { facingMode: 'environment' },
      // 相機brcode顯示設定
      brConfig,
      // 掃描成功後的 Callback
      qrCodeSuccessCallback,
      // Error的 Callback
      qrCodeErrorCallback
    )
  }

  // 關閉相機
  const handleStop = () => {
    try {
      // 套件關閉相機function
      html5QrCode
        .stop()
        .then(() => {
          // 清除
          html5QrCode.clear()
        })
        .catch((error) => {
          console.log('danger', error.message)
        })
    } catch (error) {
      console.log('danger', error)
    }
  }

  // Error的 Callback
  const qrCodeErrorCallback = (error) => {
    // lib 有 bug 暫時處理 ， 待日後更新
    console.log('qrCodeErrorCallback error', error)
  }

  return {
    start,
    handleStop
  }
}