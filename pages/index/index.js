//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    hasUserInfo: false
  },
  //事件处理函数
  toList: function (event) {
    wx.navigateTo({
      url: '../list/list?type=' + event.currentTarget.id
    })
  },
  toPublish: function(){
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  onLoad: function () {
    
  }
})
