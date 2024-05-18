export const api = {
  app: {
    login: '/tokan/api/v1/auth/token',
  },
  moldingMachine: { // 成型機相關
    saveBasicInfo: '/tokan/api/v1/moldingMachine/saveProductionBasicInfo', // 儲存基本資料
    getBasicInfo: '/tokan/api/v1/moldingMachine/getProductionBasicInfos', // 取得已建立基本資料

  },
};