// Companypackage/rentingHouse/rentingHouse.js
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

     
    
        // 查询到的数据
        HouseList: [],
        // 默认数据总数
        total: 0,
        // 默认查询第一页
        page: 0,
        // 显示数据加载结束
        showEnd: false,
        // 搜索类型,默认为query，即搜索全部
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function () {
        let page = this.data.page

        this.DocCount()
        this.QueryHose(page)
    },

    // 查询数据总数
    DocCount() {
        let that = this
        const db = wx.cloud.database()
        db.collection('RentingHouse').count({
            success(res) {
                console.log('count-res', res)
                if (res.errMsg == "collection.count:ok") {
                    that.setData({
                        total: res.total
                    })
                } else { }
            },
            fail(err) {
                wx.hideLoading()
                console.log('detail-err', err)
            }
        })
    },

    // 获取房源数据列表
    QueryHose(page) {
        wx.showLoading({
            title: '正在加载...',
            mask: true
        })
        let that = this
        let HouseList = this.data.HouseList
        let searchtext= this.data.searchtext



        wx.cloud.callFunction({
            name: 'HouseInfo',
            data: {
                type: "query",
                key: 'RentingHouse',
                page: page,
                searchtext:searchtext
            },
            success: res => {
                wx.hideLoading()
                console.log('myentrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    // 显示数据
                    let data = res.result
                    if (data) { data = data.list } else { return }
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            HouseList.push(data[i])
                        }
                        that.setData({
                 
                            page: page,
                            HouseList: HouseList
                        })

                    } else {
                        // 提示没有数据
                        wx.showToast({
                            title: '已经显示所有数据了哦！',
                            icon: 'none',
                            mask: true
                        })
                    }
                } else {
                    // 提示网络错误
                    wx.showToast({
                        title: '查询失败,请返回重新打开',
                        icon: 'none',
                        mask: true
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('myentrust-err', err)
                wx.showToast({
                    title: '网络错误,查询失败,请返回重新打开',
                    icon: 'none',
                    mask: true
                })
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function (e) {
        console.log(e, '666')
        wx.showNavigationBarLoading()
        // 初始化数据
        this.setData({
            total: 0,
            page: 0,
            HouseList: []
        })
        // 重新获取数据
        let page = 0
        this.DocCount()
        this.QueryHose(page)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let total = this.data.total
        let page = this.data.page
        let HouseList = this.data.HouseList
        if (HouseList.length < total) {
            page = page + 10
            this.QueryHose(page)
        } else {
            this.setData({
                showEnd: true
            })
        }
    },

    // 跳转函数
    Navigate: function (e) {
        console.log(e, e.currentTarget.dataset.url)
        let url = '../rentingHouseDetail/rentingHouseDetail'
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `${url}?id=${id}`,
        })
    },
    InputData: function (e) {
        let searchtext = e.detail.value
        this.setData({
            searchtext:searchtext
        })
    },
    onSearch(){
        let page = 0
        this.setData({
            HouseList:[]
        })
        this.QueryHose(page)
       
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})