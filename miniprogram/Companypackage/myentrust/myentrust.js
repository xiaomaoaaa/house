// pages/myentrust/myentrust.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 已发布的求职信息
        saleEntrustList:[],
         // 已发布的招聘信息
        rentOutEntrustList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 暂时注释
        this.MyEntrust('sale')
    },

    // 切换
    ChangeTab(e) {
        console.log(e)
        let id = e.detail.index
        let key = ''
        if (id == 0) {
            key = 'sale'
        }
        if (id == 1) {
            key = 'rentout'
        }
        this.MyEntrust(key)
    },

    // 查看我的委托
    MyEntrust(key) {
        console.log(key)
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        let that = this
        wx.cloud.callFunction({
            name: 'Entrust',
            data: {
                type: 'MyEntrust',
                key: key
            },
            success: res => {
                wx.hideLoading()
                console.log('myentrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    let data = res.result.data
                    if (data.length > 0) {
                        if (key == 'sale') {
                            that.setData({
                                saleEntrustList: data
                            })
                        }
                        if (key == 'rentout') {
                            that.setData({
                                rentOutEntrustList: data
                            })
                        }
                    } else {
                        // 提示没有数据
                        that.setData({
                            rentOutEntrustList: []
                        })
                    }
                } else {
                    // 提示网络错误
                    that.setData({
                        rentOutEntrustList: []
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('myentrust-err', err)
            }
        })
    },

    // 跳转函数
    Navigate: function (e) {
        console.log(e)
        let url = '../steps/steps'
        let data = e.currentTarget.dataset.data
        data = JSON.stringify(data)
        wx.navigateTo({
            url: `${url}?id=myentrust&data=${data}`,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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