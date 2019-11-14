
const app = getApp()
Page({

  data:{
    showInfo:1,
  },
  onLoad(){
    // app.editTabbar();
  },

  onShow(){
    
  },

  gotoPm(){
    this.gotoDetailPage(1)
  },
  gotoSnow(){
    this.gotoDetailPage(2)
  },
  gotoWind(){
    this.gotoDetailPage(3)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "关注生活,关注天气",
      path: '/pages/knowledge/knowledge',
      imageUrl: "/img/share_info.jpg",
    }
  },

  gotoDetailPage(source){
    
    wx.navigateTo({
      url: '/pages/detailknowledge/detailknowledge?showInfo=' + source,
    })
  },

  lookVideoAd() {
    // 在页面中定义激励视频广告
    let videoAd = null

    videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-62b7545cfcce8bfa'
    })
    videoAd.onLoad(() => { })
    videoAd.onError((err) => { })
    videoAd.onClose((res) => { })

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  }

}
)