Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#165DFF",
    list: [{
      pagePath: "/pages/home/index",
      iconPath: "/images/tab-icons/home.svg",
      selectedIconPath: "/images/tab-icons/homeActive.svg",
      text: "首页"
    },
    {
      pagePath: "/pages/publish/index",
      iconPath: "/images/tab-icons/home.svg",
      selectedIconPath: "/images/tab-icons/homeActive.svg",
      text: "发布"
    },
    {
      pagePath: "/pages/logs/logs",
      iconPath: "/images/tab-icons/mine.svg",
      selectedIconPath: "/images/tab-icons/mineActive.svg",
      text: "我的"
    },
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})