const renderAlert = (options) => {
  const body = document.body;
  const { message, callback, isConfirm=false, isWarnConfirm=false, closeCallback } = options;
  // 移除上次呼叫時產生的 dom 元素
  for(let i = 0 ; i < body.children.length ; i++) {
    if (body.children[i].classList.contains('pop-dialog')) {
      body.children[i].remove();
    }
  }
  
  const popDialog = document.createElement('div');
  popDialog.classList.add('pop-dialog');

  const dialog = document.createElement('div');
  dialog.classList.add('dialog');

  const section = document.createElement('section');
  section.innerHTML = message;

  const footer = document.createElement('footer');

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('btn');
  if (isWarnConfirm) {
    confirmButton.classList.add('btn-danger');
  } else {
    confirmButton.classList.add('btn-primary');
  }
  confirmButton.textContent = '確定';
  confirmButton.addEventListener('click', () => {
    if (callback) {
      callback();
    }
    popDialog.classList.remove('show');
  }, false);
  
  
  if (isConfirm) {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('btn');
    cancelButton.classList.add('btn-secondary');
    cancelButton.classList.add('mr-6');
    cancelButton.textContent = '取消';
    cancelButton.addEventListener('click', () => {
      if (closeCallback) {
        closeCallback();
      }
      popDialog.classList.remove('show');
    }, false);
    footer.appendChild(cancelButton);
  }
  footer.appendChild(confirmButton);
  dialog.appendChild(section);
  dialog.appendChild(footer);
  popDialog.appendChild(dialog);
  body.appendChild(popDialog);
  setTimeout(() => {
    popDialog.classList.add('show');
  }, 100);
}

const renderAlertTimer = (options) => {
  const body = document.body;
  const { timer, message, callback } = options;
  
  // 移除上次呼叫時產生的 dom 元素
  for(let i = 0 ; i < body.children.length ; i++) {
    if (body.children[i].classList.contains('pop-dialog')) {
      body.children[i].remove();
    }
  }
  
  const popDialog = document.createElement('div');
  popDialog.classList.add('pop-dialog');
  popDialog.classList.add('timer');
  const dialog = document.createElement('div');
  dialog.classList.add('dialog');

  const section = document.createElement('section');
  section.textContent = message;


  dialog.appendChild(section);
  popDialog.appendChild(dialog);
  body.appendChild(popDialog);
  setTimeout(() => {
    popDialog.classList.add('show');
    setTimeout(() => {
      if (callback) {
        callback();
      }
      popDialog.classList.remove('show');
    }, timer);
  }, 100);
}

// 顯示 Dialog 組件提示樣式
export const popMsg = (message, callback = () => {}) => {
  renderAlert({ 
    message: message, 
    callback: callback 
  });
};

// 顯示 Dialog 組件 Confirm 樣式
export const openConfirm = (message, callback = () => {}, closeCallback = () => {}) => {
  renderAlert({ 
    message: message, 
    isConfirm: true, 
    callback: callback, 
    closeCallback: closeCallback 
  }); 
};

// 顯示 Dialog 組件 警告 樣式
export const openWarnConfirm = (message, callback = () => {}, closeCallback = () => {}) => {
  renderAlert({ 
    message: message, 
    isConfirm: true, 
    isWarnConfirm: true,
    callback: callback, 
    closeCallback: closeCallback 
  }); 
};

// 顯示 Dialog 組件一段時間及關閉樣式
export const timerMsg = (message, callback = () => {}, timer = 2000) => {
  renderAlertTimer({
    timer: timer,
    message: message, 
    callback: callback 
  });
};

 