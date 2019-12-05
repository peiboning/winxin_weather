var integralUtils = require('utils/Integral.js') 
App({
  onLaunch () {
    var that = this
    integralUtils.getIntegral.call(that)
    wx.cloud.init({
      env: 'weather-id',
      traceUser: true,
    })

    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
  },
  onShow() {
    
  },
  
  globalData: {
    // 是否保持常亮，离开小程序失效
    xcx_version: '1.7.5',
    keepscreenon:false,
    systeminfo: {},
    isIPhoneX: false,
    key: '5b69e94aa9b041a9b8393b14360f188b',
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
      air:'https://free-api.heweather.net/s6/air/now'
    },
    cityDatas: {},
    filmInfo:{},
    integral:0,
  },
})