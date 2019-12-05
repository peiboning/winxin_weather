var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var movie = require('../../comm/script/movie_fetch')
let globalData = getApp().globalData
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0
	},
	onLoad: function() {
		var that = this
    movie.fetchFilms.call(that, that.data.start)
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
    movie.fetchFilms.call(that, that.data.start)
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
      movie.fetchFilms.call(that, that.data.start)
		}
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
    globalData.filmInfo = data.id;
		wx.navigateTo({
			url: "/pages/filmDetail/filmDetail"
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '有人@你来看电影了',
      path: '/pages/filmlist/filmlist',
      // imageUrl: "/img/movie_channel.png",
    }
  }
})