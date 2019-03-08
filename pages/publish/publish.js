// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapCtx:'',
    currlongitude: 106.3221645355,
    currlatitude: 29.5998793534,
    startName:'',
    endName:'',
    startPosition:{},
    passPosition:[],
    endPosition:{},
    markers: [],
    polyline:[],
    usertype:'',
    username:'',
    phone:'',
    time:'',
    tips:''
  },
  //点击事件--提交、重置表单
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  //选择乘客 or 司机
  changeType: function(event){
    this.setData({
      usertype: event.detail.value
    })
    console.log('选择乘客还是司机：' + event.detail.value)
    console.log(event)
  },
  // 输入昵称
  inputNname(e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 输入手机号
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 输入时间
  inputTime(e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 输入备注
  inputTips(e) {
    this.setData({
      tips: e.detail.value
    })
  },
  // 发布按钮
  publish:function(event){
    var _this = this;
    //检测必填字段
    if (_this.data.usertype == ''){
      wx.showToast({
        title: '请选择发布对象',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (_this.data.username == '') {
      wx.showToast({
        title: '请输入您的称呼',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (_this.data.phone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 电话号码正则验证
    if (!_this.data.startPosition.name) {
      wx.showToast({
        title: '请选择出发地点',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!_this.data.endPosition.name) {
      wx.showToast({
        title: '请选择目的地',
        icon: 'success',
        duration: 2000
      })
      return;
    } 
    if (_this.data.time == '') {
      wx.showToast({
        title: '请输入时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    // 处理发布信息并写入缓存
    var positionList = [];
    //起点坐标放入数组
    positionList.push([_this.data.startPosition.longitude, _this.data.startPosition.latitude].join(','))
    // 途经坐标放入数组
    if (_this.data.passPosition.length>0){
      for (var i in _this.data.passPosition){
        positionList.push([_this.data.passPosition[i].longitude, _this.data.passPosition[i].latitude].join(','))
      }
    }
    // 终点坐标放入数组
    positionList.push([_this.data.endPosition.longitude, _this.data.endPosition.latitude].join(','))
    // 组装发布数据
    var publishData = {
      name: _this.data.username,
      phone: _this.data.phone,
      travel: _this.data.startPosition.name + '--' + _this.data.endPosition.name,
      time: _this.data.time,
      tips: _this.data.tips,
      position: positionList
    }
    // 写入缓存
    wx.setStorage({
      key: 'publishTest',
      data: JSON.stringify(publishData)
    })

    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
      success: function(res){
        
      },
      complete: function(res){
        wx.navigateTo({
          url: '../list/list?type=' + _this.data.usertype,
        })
      }
    })
  },
  //点击事件--获取位置
  getLocation: function(event){
    var flag = event.target.id
    var that = this;

    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        //选择的位置
        let address = {
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        }
        // 地图标记点
        let marksData={
          iconPath: '../imgs/map_dark.png',
          latitude: res.latitude,
          longitude: res.longitude,
          width: 20,
          height: 20
        };
        // 地图画线点
        let pointData = [];
        that.mapCtx = wx.createMapContext("mymap");
        
        if(flag == 'start'){
          marksData.id = 0;
          pointData[0] = { latitude: res.latitude, longitude: res.longitude };
          that.setData({
            startName: res.name,
            startPosition: address,
            markers: marksData,
            polyline:[{
              points: pointData,
              color: '#FF0000DD',
              width: 3,
              dottedLine: true
            }]
          })
          console.log('marks===> ')
          console.log(that.data.markers)

        }else if(flag == 'end'){
          let index = that.data.markers.length;
          that.setData({
            endPosition: address
          })
        }else if(flag == 'pass'){
          let index = that.data.markers.length;
          let newPassList = that.data.passPosition;
          newPassList.push(address);
          console.log(newPassList)
          
          that.setData({
            passPosition: newPassList
          })
          console.log("途经地点添加")
          console.log(that.data.passPosition)
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },

  // 地图信息改变
  regionchange: function(e){
    console.log('RegionChange ---')
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.setData({
          currlatitude: latitude,
          currlongitude: longitude
        })
        var positionObj = {
          latitude: latitude,
          longitude: longitude,
          speed: speed,
          accuracy: accuracy
        }
        console.log(positionObj)
      }
    })
    
    _this.setData({
      markers: [{
        iconPath: '../imgs/map_dark.png',
        id: 0,
        latitude: 29.5989837961,
        longitude: 106.3221645355,
        width: 20,
        height: 20
      }, {
          iconPath: '../imgs/map_dark.png',
          id: 1,
          latitude: 29.5998793534,
          longitude: 106.5295314789,
          width: 20,
          height: 20
        }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('mymap')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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