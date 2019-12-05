var message = require('../../components/message/message')

function fetchFilms(start, cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    const movie = wx.cloud.database().collection('movie')
    movie.skip(start).limit(20).get(
      {
        success: function (res) {
          if (res.data.length === 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            that.setData({
              films: that.data.films.concat(res.data),
              start: that.data.start + res.data.length,
              showLoading: false
            })
          }

          wx.stopPullDownRefresh()
          
        },
        fail: function () {
          that.setData({
            showLoading: false
          })
          message.show.call(that, {
            content: '网络开小差了',
            icon: 'offline',
            duration: 3000
          })
          wx.stopPullDownRefresh()
          
        }
      }
    )
  }
}

function dealWithDetailFilms() {
  var that = this
  message.hide.call(that)
}

module.exports = {
  fetchFilms: fetchFilms,
  dealWithDetailFilms: dealWithDetailFilms
}
