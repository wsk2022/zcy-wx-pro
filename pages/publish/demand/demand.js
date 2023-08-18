// pages/publish/demand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: null,
    projectType: ['公路', '铁路', '地铁', '隧道', '桥梁', '城市管廊', '水利', '巷口'],
    chooseIndex: [],
    hopeType: ['购买', '租赁', '置换'],
    hopeIndex: [],
    materialsList: [{
        type: '贝雷梁',
        subType: ''
      },
      {
        type: '钢管桩',
        subType: '600螺旋管'
      },
      {
        type: '钢管桩',
        subType: '800螺旋管'
      },
      {
        type: '钢管桩',
        subType: '拉森--Ⅳ'
      },
      {
        type: '钢围囹',
        subType: '40槽钢'
      },
      {
        type: '水平钢支撑',
        subType: '600钢管'
      },
      {
        type: '钢管',
        subType: '300螺旋管'
      },
      {
        type: '钢管',
        subType: '600螺旋管'
      },
      {
        type: '钢管桩',
        subType: '600螺旋管'
      },
    ],
    materialIndex: [],
    pageType: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pageType: options && options.type ? options.type : '1'
    })
    wx.setNavigationBarTitle({
      title: this.data.pageType == 1 ? '我有需求' : '我有物资'
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success: (res) => {
        that.setData({
          addressInfo: {
            ...res
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  changeChoose(e) {
    let curArr = this.data.chooseIndex
    let index = e.currentTarget.dataset.index
    let isExit = this.data.chooseIndex.indexOf(index)
    if (isExit > -1) {
      curArr.splice(isExit, 1)
      this.setData({
        chooseIndex: curArr
      })
    } else {
      curArr.push(index)
      this.setData({
        chooseIndex: curArr
      })
    }

  },
  changeChooseHope(e) {
    let curArr = this.data.hopeIndex
    let index = e.currentTarget.dataset.index
    let isExit = this.data.hopeIndex.indexOf(index)
    if (isExit > -1) {
      curArr.splice(isExit, 1)
      this.setData({
        hopeIndex: curArr
      })
    } else {
      curArr.push(index)
      this.setData({
        hopeIndex: curArr
      })
    }
  },
  changeChooseMaterial(e) {
    let curArr = this.data.materialIndex
    let index = e.currentTarget.dataset.index
    let isExit = this.data.materialIndex.indexOf(index)
    if (isExit > -1) {
      curArr.splice(isExit, 1)
      this.setData({
        materialIndex: curArr
      })
    } else {
      curArr.push(index)
      this.setData({
        materialIndex: curArr
      })
    }
  },
  gotomate() {
    wx.navigateTo({
      url: this.data.pageType == 1 ? '/pages/publish/demand-mate/index' : '/pages/publish/material-mate/material-mate',
    })
  },

  changeChooseAll() {
    if (this.data.materialIndex.length == this.data.materialsList.length) {
      this.setData({
        materialIndex: []
      })
    } else {
      let arr = []
      for (let i = 0; i < this.data.materialsList.length; i++) {
        arr.push(i)
      }
      this.setData({
        materialIndex: [...arr]
      })
    }
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