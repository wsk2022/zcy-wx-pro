// pages/publish/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '济南',
    projectList: [{
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }, {
      name: '新建北京至雄安新区至商丘高速铁路',
      distance: '2.3',
      waitNum: '5',
      address: '山东省济南市历城区人寿大厦北楼'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  goToPerfect() {
    wx.navigateTo({
      url: '/pages/publish/perfect/perfect',
    })
  },
  uploadProject(){
    wx.navigateTo({
      url: '/pages/publish/upload/upload',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})