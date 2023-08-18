// pages/publish/material-mate/material-mate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchList: [{
      name: '中铁十二局五公司',
      projectName: '雄安新区至商丘段 XSZQ-2 标',
      type: '铁路',
      need: '拼装式活动板房、拼装式活动板房、拼装式活动板房、拼装式活动板房',
      btns: ['购买', '租赁', '置换'],
      phone: '400-400-400'
    }, {
      name: '中铁十二局五公司',
      projectName: '雄安新区至商丘段 XSZQ-2 标',
      type: '铁路',
      need: '拼装式活动板房、拼装式活动板房、拼装式活动板房、拼装式活动板房',
      btns: ['购买', '租赁', '置换'],
      phone: '400-400-400'
    }, {
      name: '中铁十二局五公司',
      projectName: '雄安新区至商丘段 XSZQ-2 标',
      type: '铁路',
      need: '拼装式活动板房、拼装式活动板房、拼装式活动板房、拼装式活动板房',
      btns: ['购买', '租赁', '置换'],
      phone: '400-400-400'
    }, {
      name: '中铁十二局五公司',
      projectName: '雄安新区至商丘段 XSZQ-2 标',
      type: '铁路',
      need: '拼装式活动板房、拼装式活动板房、拼装式活动板房、拼装式活动板房',
      btns: ['购买', '租赁', '置换'],
      phone: '400-400-400'
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
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