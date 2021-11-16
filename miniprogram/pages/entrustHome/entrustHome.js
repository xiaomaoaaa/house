// pages/entrust/entrustHome.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    wxsetClipboardData: function (fileUrl) {
        wx.setClipboardData({
          data: "http://app1.nmpa.gov.cn/data_nmpa/face3/base.jsp?tableId=122&tableName=TABLE122&title=%D6%B4%D2%B5%D2%A9%CA%A6%D7%A2%B2%E1%C8%CB%D4%B1&bcId=152912087124325608102345261418",
          success(res) {
                wx.showToast({
                  title: '复制成功！',
                })
          }
        })
      },
 
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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