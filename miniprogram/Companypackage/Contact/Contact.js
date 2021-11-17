
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      weburls:[{name:'河北',weburl:'http://www.hbysw.org/'},
      {name:'陕西',weburl:'http://www.cnslpa.com/'},
      {name:'内蒙古',weburl:'http://www.nmlpa.com/'},
      {name:'辽宁',weburl:'http://www.lnlpa.cn/Index/'},
      {name:'四川',weburl:'https://www.sclpa.cn/'},
      {name:'吉林',weburl:'http://www.jllpa.cn/'},
      {name:'黑龙江',weburl:'http://www.hljlpa.com/'},
      {name:'上海',weburl:'http://www.shys.org.cn/'},
      {name:'江苏',weburl:'http://www.jslpa.cn/index/'},
      {name:'福建',weburl:'http://www.fjlpa.cn/'},
      {name:'江西',weburl:'https://www.jxzyysedu.com/'},
      {name:'山东',weburl:'http://www.sdlpa.org.cn/'},
      {name:'河南',weburl:'http://www.hnysw.org/'},
      {name:'湖北',weburl:'https://www.hblpa.com/'},
      {name:'湖南',weburl:'https://www.hnlpa.cn/'},
      {name:'广东',weburl:'http://mpa.gd.gov.cn/'},
      {name:'广西',weburl:'http://www.gxysxh.com/index/'},
      {name:'海南',weburl:'http://www.hnslpa.cn/'},
      {name:'重庆',weburl:'http://www.cqlpa.com/'},
      {name:'贵州',weburl:'http://www.gzhfda-tc.org.cn/'},
      {name:'云南',weburl:'http://www.ynysw.org/'},
      {name:'陕西',weburl:'http://www.sxlpd.com/'},
      {name:'甘肃',weburl:'http://www.gslpa.cn/'},
      {name:'新疆',weburl:'http://www.xjzyysxh.cn/'},
      {name:'宁夏',weburl:'https://www.nxpa.org/'},
      {name:'浙江',weburl:'http://www.zjda.com/'},
      {name:'安徽',weburl:'http://alpa.ahfda.com/alpa/'},
      {name:'青海',weburl:'http://www.tmst.org.cn/jxjy.html'},],
      mark:"jxjy"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     this.setData({
      mark:options.mark
     })
    },
    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    wxsetClipboardData: function (e) {
        let url=e.currentTarget.dataset.url
        wx.setClipboardData({
          data: url,
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