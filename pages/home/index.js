// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
        title: "企业问诊",
        desc: "完善调研表，获取诊断报告",
        btnText: "免费问诊",
      },
      {
        title: "紫菜云基建数据库",
        desc: "汇聚基建行业物资循环",
        btnText: "去看看",
      },
    ],
    tabList: [
      {
        tabName: '我有需求',
        type: 'need'
      },
      {
        tabName: '我有物资',
        type: 'goods'
      }
    ],
    pushTypeList:[
      {
        label: "全部",
        type: 'all',
      },
      {
        label: "需求",
        type: 'need',
      },
      {
        label: "工程",
        type: 'project',
      },
      {
        label: "服务商",
        type: 'company',
      },
    ],
    activeTab: 'need',
    activePush: 'all'
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 0
      })
    }
  },
  switchTab(e) {
    const data = e.currentTarget.dataset
    // const url = data.path
    this.setData({
      activeTab: data.type
    })
  }

  
})