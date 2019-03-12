// pages/coustomer/coustomer.js
// 乘客行程静态数据
var coustomerData = [{ name: '12幢的邻居', phone: '13868988866', travel: '时光里--陈家桥轻轨站', tips: '求经过轻轨站的邻居捎上我', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930'] }, { name: '勤快小蜜蜂', phone: '15867877776', travel: '时光里--光电园', tips: '搭车到轻轨站或者过双碑大桥', time: '每天早上 7：10', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930', '106.4765739441,29.5804924943'] }, { name: '追星星的人', phone: '18565594726', travel: '时光里--陈家桥轻轨站', tips: '求经过轻轨站的邻居捎上我', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930'] }];

// 司机行程静态数据
var driverData = [{ name: '洋洋的爸爸', phone: '13868988866', travel: '时光里--冉家坝', tips: '途径轻轨站', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930', '106.3826751709, 29.6101030681', '106.4987182617,29.5981628617'] }, { name: '乘风破浪', phone: '15867877776', travel: '时光里--光电园', tips: '途径轻轨站、双碑大桥', time: '每天早上 7：10', position: ['106.3221645355,29.5989837961', '106.3826751709, 29.6101030681', '106.4681625366,29.5855868036', '106.4994478226,29.6158487884'] }, { name: '时光里花魁', phone: '18678544319', travel: '时光里--冉家坝', tips: '途径轻轨站', time: '每天早上 7：40', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930', '106.3826751709, 29.6101030681', '106.4987182617,29.5981628617'] }];


Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    title: '',
    type:'',
    list: [],
    coustomer: coustomerData,
    driver: driverData,
    publishData: {}
  },
  // 点击事件--查看路线
  toMap: function(event){
    wx.navigateTo({
      url: '../map/map?phone=' + event.target.dataset.phone + '&positon=' + event.target.dataset.positon.join(';') + '&tips=' + event.target.dataset.tips + '&name=' + event.target.dataset.name,
    })
  },
  //点击事件--联系TA
  call: function(event){
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  //点击事件--去发布
  toPublish: function(event){
    wx.navigateTo({
      url: '../publish/publish',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取缓存数据
    var _this = this
    
    if (options.type && options.type =='coustomer'){
      let addData = {};
      if (wx.getStorageSync('coustomerData')){
        addData = JSON.parse(wx.getStorageSync('coustomerData'));
        coustomerData.unshift(addData)
      }
      
      _this.setData({
        type: 'coustomer',
        title: '乘客搭车列表',
        list: coustomerData
      })
    } else if (options.type && options.type == 'driver'){
      let addData = {};
      if (wx.getStorageSync('driverData')) {
        addData = JSON.parse(wx.getStorageSync('driverData'));
        driverData.unshift(addData)
      }
            
      _this.setData({
        type: 'driver',
        title: '司机行程列表',
        list: driverData
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取传递的参数
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面关闭时清空缓存
    wx.clearStorage()
    wx.clearStorageSync()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.clearStorageSync()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})