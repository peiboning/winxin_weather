var douban = require('../../comm/script/fetch')
var util = require('../../utils/utils')
var config = require('../../comm/script/config')
var movie = require('../../comm/script/movie_fetch')
let globalData = getApp().globalData
Page({
    data: {
        filmDetail: {},
        showLoading: true,
		    showContent: false,
        daoyan:"",
        zhuyan:"",
        type:"",
        tag:"",
        videoUrls:[],
        showUrls: false,
        showPlayVideo: false
    },
    onLoad: function(options) {
        var that = this
        var id = options.id
        
        that.setData({
          filmDetail: globalData.filmInfo,
          showLoading: false,
          showContent: true
        })
        // that.data.filmDetail= globalData.filmInfo
        that.parseDescL()
        movie.dealWithDetailFilms.call(that)
        that.getCloudData()
      
    },
  
  getCloudData: function () {
      var that = this
      const xcx_ctr = wx.cloud.database().collection('xcx_ctr')
      xcx_ctr.where({
          page_id: '10001'
        }).get({
          success: function (res) {
            
            if (res.data.length === 0) {
              
            } else {
              var data = res.data[0]
              var dataJson = JSON.parse(data.data)
              var result = dataJson.showPlayVideo
              
              that.setData(
                {
                  showPlayVideo: 1==result
                }
              )
            }

          },
          fail: function () {
            console.log('cloud data fail')

          }
        })
    },

    watchVideo: function() {
      var that = this
      var videoUrl = globalData.filmInfo.video_url
      // debugger;
      var videoUrlJson = JSON.parse(videoUrl)
      this.setData({
        showUrls: true,
        videoUrls: videoUrlJson
      })
    },

    parseDescL: function() {
      var that = this
      var descL = globalData.filmInfo.desc_l
      // debugger;
      var descLJson = JSON.parse(descL)
      for (var i = 0;i<descLJson.length;i++) {
        var obj = descLJson[i]
        if (obj.length > 0) {
          var res = obj.split("：")
          // if (res.length < 2){
          //   continue
          // }
          if (res[0] == '导演') {
            that.setData({
              daoyan: res[1]
            })
          } else if(res[0] == '主演') {
            that.setData({
              zhuyan: res[1]
            })
          } else if(res[0] == '类型') {
            that.setData({
              type: res[1]
            })
          } else if (res.length === 1) {
            var tags = res[0].split(" ")
            console.log("tags length:" + tags.length)
            that.setData({
              tag: obj
            })
          }
        } 
        
      }
    },

    viewVideoDetail: function(e) {
      var data = e.currentTarget.dataset;
      console.log("detailVideoUrl:" + data.tag.url)
      // wx.navigateTo({
      //   url: '/pages/videoPlayer/videoPlayer?url=' + data.tag.url,
      // })
      // wx.navigateToMiniProgram({
      //   appId: 'wx88c2c06bffd9c457',
      //   path: 'pages/videoPlayer/videoPlayer',
      //   success(res) {
      //     // 打开成功
      //   },
      //   fail(res) {
          
      //   }
      // })
    },

    copyPlayUrl: function(e) {
      var data = e.currentTarget.dataset;
      console.log("detailVideoUrl:" + data.tag.url)

      wx.setClipboardData({
        data: data.tag.url,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log('clipboarddata: ' + res.data) // data
            }
          })
        }
      })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '有人@你来看电影了',
        path: '/pages/filmlist/filmlist',
      }
    }
	
})