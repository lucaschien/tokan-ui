export const clickOutside = (app) => {
  app.directive('clickOutside', {
    mounted (el, binding) {
      setTimeout(() => {
        // 在該 DOM 元素上定義一個函式 (注意: 此時只是定義還沒事件註冊)
        el.event = function (event) {
          // 提醒: el.contains 會往下節點找
          let isOutSide = (!(el === event.target || el.contains(event.target)))
          /* 重點: 執行在屬性值中提供的回呼函式, 注意一定要用 vnode.context 才會指到對應的 vue 封包過後的節點物件 */
          binding.value(isOutSide)
        };
        document.body.addEventListener('click', el.event) // 這邊做事件註冊, 但是是註冊在 body 上
      }, 0)
    },
    unmounted (el) {
      document.body.removeEventListener('click', el.event) // 移除事件註冊
    }
  });
}