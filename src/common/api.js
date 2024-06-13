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
  // Ｃ端產品
  fmoldingMachine: { // 成型機相關
    formingMachineList: '/tokan/api/v1/provision/getProvisionsByProvisionType', // 取得成型機列表
    formingMachineInfo: '/tokan/api/v1/provision/{0}', // 取得單一成型機資訊 {0}機器id
    changeStatus: '/tokan/api/v1/provision/changeStatus', // 更新機器狀態 TOOD... 暫時不使用
    shiftUserList: '/tokan/api/v1/users/shiftType/{0}', // 班別下使用者的名單 {0} 班別
    roleUserList: '/tokan/api/v1/users/roleCode/{0}', // 依照角色撈取人員清單 {0} roleCode
    saveBasicInfo: '/tokan/api/v1/moldingMachine/saveProductionBasicInfo', // 儲存基本資料
    getBasicInfos: '/tokan/api/v1/moldingMachine/getProductionBasicInfos/{0}', // 取得已建立基本資料 {0}機器id
    getLastMaterial: '/tokan/api/v1/moldingMachine/getLastMaterial/{0}', // 查詢當日最後一筆領料資料 {0}機器id

    // 機器狀態相關
    launchProduction: '/tokan/api/v1/plc/launchProduction', // ● 生產啟動 (紫色功能全開)
    setHumanMachineStatusDisplay: '/tokan/api/v1/plc/setHumanMachineStatusDisplay', // ● 設定人機螢幕顯示 (黃色)
    lockAndUnlockButton: '/tokan/api/v1/plc/lockAndUnlockButton', // ● 解除啟動鍵限制 or 啟動鍵無功能 or 功能全開 (黃色+紫色)
    lockProduction: '/tokan/api/v1/plc/lockProduction', // ● 人機顯示+良杯撥桿繼電器無功能+送杯身紙電眼啟動計數量(ENABLE) (漏水調機,故障排除用) (黃色+紫色)
    startAndStopMachine: '/tokan/api/v1/plc/startAndStopMachine', // ● 關機

    // 功能: ● 巡查 相關
    getInspectionMoldingMachineProductions: '/tokan/api/v1/moldingMachine/getInspectionMoldingMachineProductions', // 巡查- 一般成型機日報表部分項目-列表
    getInspectionMoldingMachineProduction: '/tokan/api/v1/moldingMachine/getInspectionMoldingMachineProduction', // 巡查- 一般成型機日報表部分項目-詳細資料
    updateInspectionMoldingMachineProduction: '/tokan/api/v1/moldingMachine/updateInspectionMoldingMachineProduction', // 巡查- 一般成型機日報表部分項目-儲存

    getInspectionSF170MoldingMachineProductions: '/tokan/api/v1/moldingMachine/getInspectionSF170MoldingMachineProductions', // 巡查- SF170成型機日報表部分項目-列表
    getInspectionSF170MoldingMachineProduction: '/tokan/api/v1/moldingMachine/getInspectionSF170MoldingMachineProduction', // 巡查- SF170成型機日報表部分項目-詳細資料
    updateInspectionSF170MoldingMachineProduction: '/tokan/api/v1/moldingMachine/updateInspectionSF170MoldingMachineProduction', // 巡查- SF170成型機日報表部分項目-儲存

    getPackagingBagInspections: '/tokan/api/v1/moldingMachine/getPackagingBagInspections', // 巡查-包裝膜檢查-列表
    getPackagingBagInspectionDetail: '/tokan/api/v1/moldingMachine/getPackagingBagInspectionDetail', // 巡查-包裝膜檢查-詳細資料
    updatePackagingBagInspection: '/tokan/api/v1/moldingMachine/updatePackagingBagInspection', // 巡查-包裝膜檢查-儲存 (2-Q-007-01-2.6生產品質檢驗表)

    getCupDestructionTestInspections: '/tokan/api/v1/moldingMachine/getCupDestructionTestInspections', // 巡查- 紙杯破壞試驗檢查表-列表
    updateCupDestructionTestInspection: '/tokan/api/v1/moldingMachine/updateCupDestructionTestInspection', // 巡查-紙杯破壞試驗檢查表-儲存 (2-Q-007-11-1.0紙杯破壞試驗檢查表)

    // 功能: ● 領料 相關
    saveMoldingMachineMaterialRecord: '/tokan/api/v1/moldingMachine/saveMoldingMachineMaterialRecord', // 領料-儲存領料紀錄

    // 功能: ● 機台清潔 相關
    getMoldingMachineCleaningInspections: '/tokan/api/v1/moldingMachine/getMoldingMachineCleaningInspections/{0}', // 一般機器清潔檢查列表 {0} cycleType: DAILY, WEEKLY, BI_WEEKLY
    updateMoldingMachineCleaningInspection: '/tokan/api/v1/moldingMachine/updateMoldingMachineCleaningInspection/{0}', // 儲存一般機器清潔檢查 {0} cycleType: DAILY, WEEKLY, BI_WEEKLY

    getSF170MoldingMachineCleaningInspections: '/tokan/api/v1/moldingMachine/getSF170MoldingMachineCleaningInspections/{0}', // SF170機器清潔檢查列表 {0} cycleType: DAILY, WEEKLY, BI_WEEKLY
    updateSF170MoldingMachineCleaningInspection: '/tokan/api/v1/moldingMachine/updateSF170MoldingMachineCleaningInspection/{0}', // 儲存SF170機器清潔檢查 {0} cycleType: DAILY, WEEKLY, BI_WEEKLY

    // 功能: ● 故障排除 相關
    getList: '/tokan/api/v1/moldingMachine/{0}', // 撈取列表(同巡查的成型機日報表部分項目) {0} 機器類型對應的api path 'getInspectionMoldingMachineProductions', 'getInspectionSF170MoldingMachineProductions'
    updateFaultResolution: '/tokan/api/v1/moldingMachine/updateFaultResolution', // 儲存 故障排除
    updateSF170FaultResolution: '/tokan/api/v1/moldingMachine/updateSF170FaultResolution', // 儲存 SF170 故障排除

    // 功能: ● 更換產品 相關
    getProductChangeCheck: '/tokan/api/v1/product/un-conforming/productChangeCheck', // 撈取未完成更換產品確認單
    checkerProductChangeCheck: '/tokan/api/v1/product/checkerProductChangeCheck', // 儲存檢查更換產品確認單
    saveModifyFROM: '/tokan/api/v1/moldingMachine/saveMoldingMachineMaterialRecord', // 儲存更換產品選項
  },

  // B端平台用
  Admin: {
    // 產品管理相關
    productList: '/tokan/api/v1/product/list', // 產品列表
    updateProduct: '/tokan/api/v1/product', // 新增與修改共用
    deleteProduct: '/tokan/api/v1/product/{0}', // 刪除

    // 更換產品確認單相關
    getPackagingList: '/tokan/api/v1/provision/getProvisionsByProvisionType', // 取得包裝機清單
    getProductChangeCheckList: '/tokan/api/v1/product/productChangeCheck/list', // 更換產品確認單列表
    updateProductChangeCheck: '/tokan/api/v1/product/productChangeCheck', // 新增與修改共用
    deleteProductChangeCheck: '/tokan/api/v1/product/productChangeCheck/{0}', // 刪除 {0} id

    // 

  }
};