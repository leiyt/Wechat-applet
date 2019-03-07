// pages/coustomer/coustomer.js
Page({

  /**
   * 页面的初始数据
   * [时光里{
          longitude: 106.3221645355,
          latitude: 29.5989837961
        }, 陈家桥{
          longitude: 106.3306725025,
          latitude: 29.6070994930
        },玉带山{
          longitude: 106.4765739441,
          latitude: 29.5804924943
        },郑家院子{
          longitude: 106.5284693241,
          latitude: 29.5992263437
        },西永{
          longitude: 106.3829326630,
          latitude: 29.6009241601
        }
        ]
   */
  data: {
    title: '',
    type:'',
    coustomer: [{ name: '东门的邻居', phone: '13868988866', travel: '时光里--陈家桥轻轨站', tips: '求经过轻轨站的邻居捎上我', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930'] }, { name: '勤快小蜜蜂', phone: '15867877776', travel: '时光里--光电园', tips: '搭车到轻轨站或者过双碑大桥', time: '每天早上 7：10', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930', '106.4765739441,29.5804924943'] }, { name: '追星星的人', phone: '18565594726', travel: '时光里--陈家桥轻轨站', tips: '求经过轻轨站的邻居捎上我', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930'] }],
    driver: [{ name: '李师傅', phone: '13868988866', travel: '时光里--西永天街', tips: '途径轻轨站', time: '每天早上 7：30', position: ['106.3221645355,29.5989837961', '106.3306725025,29.6070994930'] }, { name: '帅妞', phone: '15867877776', travel: '时光里--光电园', tips: '途径轻轨站、双碑大桥', time: '每天早上 7：10', position: ['106.3221645355,29.5989837961', '106.4765739441,29.5804924943', '106.3829326630, 29.6009241601']}]
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
    if (options.type && options.type =='coustomer'){
      this.setData({
        type: 'coustomer',
        title: '乘客搭车列表'
      })
    } else if (options.type && options.type == 'driver'){
      this.setData({
        type: 'driver',
        title: '司机行程列表'
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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