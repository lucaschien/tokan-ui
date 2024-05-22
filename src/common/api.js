// api path format 
// 用法: format('/member/my/api/my/collect/{0}/{1}', 'C5', '1');
export function formatPath(format, ...args) {
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}

export const api = {
  app: {
    login: '/tokan/api/v1/auth/token',
    loginUserInfo: '/tokan/api/v1/auth/me', // 登入者資訊
  },
  moldingMachine: { // 成型機相關
    formingMachineList: '/tokan/api/v1/provision', // 取得成型機列表
    formingMachineInfo: '/tokan/api/v1/provision/{0}', // 取得單一成型機資訊 {0}機器id
    shiftUserList: '/tokan/api/v1/users/shiftType/{0}', // 班別下使用者的名單 {0} 班別
    saveBasicInfo: '/tokan/api/v1/moldingMachine/saveProductionBasicInfo', // 儲存基本資料
    getBasicInfo: '/tokan/api/v1/moldingMachine/getProductionBasicInfos', // 取得已建立基本資料
    launchProduction: '/tokan/api/v1/plc/launchProduction', // 生產啟動
    // 功能: 巡查 相關
    getPackagingBagInspections: '/tokan/api/v1/moldingMachine/getPackagingBagInspections', // 包裝膜檢查列表
    getPackagingBagInspectionDetail: '/tokan/api/v1/moldingMachine/getPackagingBagInspectionDetail', // 包裝膜檢查-詳細資料
    updatePackagingBagInspection: '/tokan/api/v1/moldingMachine/updatePackagingBagInspection', // 儲存 包裝膜檢查 (2-Q-007-01-2.6生產品質檢驗表)

    updateCupDestructionTestInspection: '/tokan/api/v1/moldingMachine/updateCupDestructionTestInspection', // 儲存 巡查-紙杯破壞試驗檢查表 (2-Q-007-11-1.0紙杯破壞試驗檢查表)
  },
};