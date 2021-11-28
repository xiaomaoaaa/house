// Companypackage/rentingHouse/rentingHouse.js
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {


        searchtext:"",
        // 查询到的数据
        HouseList: [],
        // 默认数据总数
        total: 0,
        // 默认查询第一页
        page: 0,
        // 显示数据加载结束
        showEnd: false,
        mark: ""
        // 搜索类型,默认为query，即搜索全部
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function (e) {
        this.data.mark = e.mark
        this.DocCount()
        if (e.mark == "RentingHouse") {
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: "#f9ae95",
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
            wx.setNavigationBarTitle({
                title: '招聘搜索'
            })
        } else {
            wx.setNavigationBarTitle({
                title: '求职搜索'
            })
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: "#48c0f2",
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        }
    },

    // 查询数据总数
    DocCount() {
        let that = this
        const db = wx.cloud.database()
        let mark = this.data.mark
        db.collection(mark).count({
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


    QueryHose(page) {
        wx.showLoading({
            title: '正在加载...',
            mask: true
        })
        let that = this
        let HouseList = this.data.HouseList
        let searchtext = this.data.searchtext
        let mark = this.data.mark
        wx.cloud.callFunction({
            name: 'HouseInfo',
            data: {
                type: "search",
                key: mark,
                page: page,
                searchtext: searchtext
            },
            success: res => {
                wx.hideLoading()
                console.log('myentrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    // 显示数据
                    let data = res.result.data
                  
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            data[i].mark=mark
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
        let url = '../houseDetail/houseDetail'
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `${url}?id=${id}`,
        })
    },
    // InputData: function (e) {
    //     let searchtext = e.detail.value
    //     this.setData({
    //         searchtext:searchtext
    //     })
    // },
    startSearch() {

        setTimeout(() => {
            if (this.data.searchtext.length == 0) {
                return
            }
            if (this.data.searchtext.length < 2) {
                wx.showToast({
                    title: '至少输入2个字符',
                    icon: 'none',
                    duration: 3000
                })
                return
            }
            let page = 0
            this.setData({
                HouseList: []
            })
            this.QueryHose(page)
        }, 100)


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