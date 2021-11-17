// pages/entrust/entrustHome.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      weburls:[{name:'河北药师网',weburl:'http://www.hbysw.org/'},
      {name:'陕西省执业药师协会',weburl:'http://www.cnslpa.com/'},
      {name:'内蒙古药师协会',weburl:'http://www.nmlpa.com/'},
      {name:'辽宁省执业药师继续教育培训平台',weburl:'http://www.lnlpa.cn/Index/'},
      {name:'四川省执业药师协会https://www.sclpa.cn/'},
      {name:'吉林省执业药师协会',weburl:'http://www.jllpa.cn/'},
      {name:'黑龙江省执业药师协会',weburl:'http://www.hljlpa.com/'},
      {name:'上海药师网',weburl:'http://www.shys.org.cn/'},
      {name:'江苏省执业药师协会',weburl:'http://www.jslpa.cn/index/'},
      {name:'福建省药师协会',weburl:'http://www.fjlpa.cn/'},
      {name:'江西省药品监督管理局https://www.jxzyysedu.com/'},
      {name:'山东省药师协会',weburl:'http://www.sdlpa.org.cn/'},
      {name:'河南药师网',weburl:'http://www.hnysw.org/'},
      {name:'湖北省执业药师协会https://www.hblpa.com/'},
      {name:'湖南省药师协会https://www.hnlpa.cn/'},
      {name:'广东省药品监督管理局',weburl:'http://mpa.gd.gov.cn/'},
      {name:'广西药师协会',weburl:'http://www.gxysxh.com/index/'},
      {name:'海南省药师协会',weburl:'http://www.hnslpa.cn/'},
      {name:'重庆药师网',weburl:'http://www.cqlpa.com/'},
      {name:'贵州省食品药品监督管理局宣传教育中心',weburl:'http://www.gzhfda-tc.org.cn/'},
      {name:'云南省执业药师协会',weburl:'http://www.ynysw.org/'},
      {name:'中国药师协会',weburl:'http://www.clponline.cn/'},
      {name:'陕西省执业药师协会',weburl:'http://www.sxlpd.com/'},
      {name:'甘肃药师网',weburl:'http://www.gslpa.cn/'},
      {name:'新疆维吾尔自治区执业药师协会',weburl:'http://www.xjzyysxh.cn/'},
      {name:'宁夏药师网https://www.nxpa.org/'},
      {name:'浙江药师网',weburl:'http://www.zjda.com/facade/index.shtml'},
      {name:'安徽省执业药师协会',weburl:'http://alpa.ahfda.com/alpa/index.aspx'},
      {name:'青海省藏医药学会',weburl:'http://www.tmst.org.cn/jxjy.html'},]
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