// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   * [{29.5989837961,106.3221645355},{29.6070994930,106.3306725025},{29.5804924943,106.4765739441},{29.5992263437,106.5284693241}]
   * 
   * 
   * [{
        iconPath: '../imgs/map_dark.png',
        id: 0,
        latitude: 29.5989837961,
        longitude: 106.3221645355,
        width: 20,
        height: 20
      }, {
        iconPath: '../imgs/map_dark.png',
        id: 1,
        latitude: 29.6070994930,
        longitude: 106.3306725025,
        width: 20,
        height: 20
      }, {
        iconPath: '../imgs/map_dark.png',
        id: 2,
        latitude: 29.5804924943,
        longitude: 106.4765739441,
        width: 20,
        height: 20
      }, {
        iconPath: '../imgs/map_dark.png',
        id: 3,
        latitude: 29.5992263437,
        longitude: 106.5284693241,
        width: 20,
        height: 20
      }]
   * 
   * 
   */
  data: {
    mapCtx:'',
    currlatitude: 29.6070994930,//地图初次加载时的纬度坐标
    currlongitude: 106.3306725025, //地图初次加载时的经度坐标
    address: "" ,//选择的位置名称
    drivierInfo:{
      phone:'',
      positions:[],
      tips:''
    },
    markers: [],
    polyline: [{
      points: [
        {latitude: 29.5989837961,longitude: 106.3221645355},
        {latitude: 29.6070994930,longitude: 106.3306725025},
        {latitude: 29.5804924943,longitude: 106.4765739441}
        ],
      color: '#FF0000DD',
      width: 3,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../imgs/position.png',
      position: {
        left: 0,
        top: 300 - 35,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    //这里触发map里controltap事件
    controltap: function () {
      this.mapCtx.moveToLocation()
    },
  },
  //点击事件--获取当前位置
  getLocations: function(){
    var _this = this;
    // 获取当前位置信息，把地图中心定位在当前位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const speed = res.speed;
        const accuracy = res.accuracy;
        console.log('获取当前位置,把地图中心定位在当前位置')
        console.log('latitude: ' + latitude, ',longitude: ' + longitude, speed, accuracy)
        _this.setData({
          currlatitude: res.latitude,
          currlongitude: res.longitude
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getLocations()
    console.log('------ Map--onLoad')

    // 拿到坐标信息
    var positions = options.positon.split(';');
    console.dir(positions)
    console.dir(positions[0])
    var coordinates = [];
    let coordinate = {};
    
    let markList = [];
    for(var i in positions){
      coordinate.longitude = positions[i].split(',')[1];
      coordinate.latitude = positions[i].split(',')[0];
      coordinates.push(coordinate);

      let markObj = {
        iconPath: '../imgs/map_dark.png',
        id: i,
        latitude: positions[i].split(',')[1],
        longitude: positions[i].split(',')[0],
        width: 20,
        height: 20
      };      
      markList.push(markObj);
      
    }
    // 标记点、画线
    this.setData({
      markers: markList,
      drivierInfo: {
        name: options.name,
        phone: options.phone,
        positions: coordinates,
        tips: options.tips
      }
    })
    console.log('load里面setdata成功')
    console.log(this.data.markers);     
  },
  
  //点击事件--联系TA
  call: function(event){
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
    */
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