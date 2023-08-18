// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
      name: '我有需求',
      toast: '提交需求为您精准推荐相关物资',
      img: "/images/publish/need-icon.png"
    }, {
      name: '我有物资',
      toast: '提交物资后可为您精准推送相关项目需求',
      img: "/images/publish/metairal-icon.png"
    }, {
      name: '我有工程',
      toast: '发布/完善工程信息可获得对应的奖励',
      img: "/images/publish/project-icon.png"
    }, ]
  },
  // 事件处理函数

  onLoad() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  goToPage(e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: index == 0 ? '/pages/publish/demand/demand?type=1' : index == 1 ? '/pages/publish/demand/demand?type=2' : '/pages/publish/project/project',
    })
  }

})