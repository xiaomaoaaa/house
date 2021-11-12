var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerList: [
            {
                "id": "#",
                "icon": "../image/calculate-home.png",
                "text": "招聘列表",
                "url": "../../Companypackage/rentingHouse/rentingHouse"
                
            },
            {
                "id": "#",
                "icon": "../image/qualifications.png",
                "text": "求职列表",
                "url": "../../Companypackage/secondHandHouse/secondHandHouse"
            },
            {
                "id": "#",
                "icon": "../image/relation.png",
                "text": "证书查询",
                "url": "../../Companypackage/Contact/Contact"
            },
            {
                "id": "#",
                "icon": "../image/entrust-bar-selected.png",
                "text": "继续教育",
                "url": "../../Companypackage/Contact/Contact"
            }
        ],
        defaultimg1:"../image/default.jpg",
        defaultimg2:"../image/default2.jpg",
        // 查询到的招聘数据
        HouseList: [],
        // 查询到的求职数据
        newsHouseList: [],
        // 默认公告信息
        notice: '欢迎使用 ~'
    },

    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 删除本地缓存
        wx.removeStorageSync('userInfo')
        // 获取个人信息，如果不存在，则跳转到认证页面
        this.IsAuthor()
        this.CompanyInfo()
        this.QueryHose()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // app.IsLogon()
        // 全局变量
        let globalData = app.globalData
        this.setData({
   
          
            HouseList: [],
            UserLogin: globalData.UserLogin,
            userInfo: globalData.userInfo
        })
       
    },

    /**
    * 检查授权情况
    */
    IsAuthor: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        var that = this
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            var userInfo = res.userInfo
                            var nickName = userInfo.nickName
                            var avatarUrl = userInfo.avatarUrl
                            var gender = userInfo.gender //性别 0：未知、1：男、2：女
                            var province = userInfo.province
                            var city = userInfo.city
                            var country = userInfo.country
                            var userInfo = {
                                'nickName': nickName,
                                'avatarUrl': avatarUrl,
                                'gender': gender,
                                'province': province,
                                'city': city,
                                'country': country
                            }
                            // 获取数据库的用户信息
                            that.InitInfo(userInfo)
                        }
                    })
                } else {
                    // 未授权，跳转到授权页面
                    wx.redirectTo({
                        url: '../login/login?id=auth'
                    })
                }
            },
            fail: function (err) {
                wx.hideLoading()
            }
        })
    },

    // 获取个人信息
    InitInfo(userInfo) {
        wx.showLoading({
            title: '正在登录...',
            mask: true
        })
        let that = this
        wx.cloud.callFunction({
            name: 'InitInfo',
            data: {
                type: 'INIT'
            },
            success: res => {
                wx.hideLoading()
                let result = res.result.data
                // 判断是否已经注册
                if (result.length) {
                    // 已注册，拉取公告、推荐列表
                    userInfo['openid'] = result[0]._openid
                    userInfo['name'] = result[0].name
                    userInfo['phone'] = result[0].phone
                    userInfo['address'] = result[0].address
                    // 修改库变量
                    app.globalData = {
                        userInfo: userInfo,
                        UserLogin: true
                    }
                    // 修改登录状态
                    that.setData({
                        userInfo: userInfo,
                        UserLogin: true
                    })
                    // 缓存到本地
                    wx.setStorageSync('userInfo', userInfo)

                } else {
                    // 未注册，页面跳转到授权注册页面
                    wx.redirectTo({
                        url: '../login/login?id=register'
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('err', err)
                wx.showToast({
                    title: '网络错误，登录失败...',
                    icon: 'none',
                    duration: 2000
                })
            },
            complete: res => {
                console.log('complete', res)
            }
        })
    },
     // 页面跳转
     NavigateToPages(e) {
        let url = e.currentTarget.dataset.url
        let id = e.currentTarget.dataset.id
        let title = e.currentTarget.dataset.title
        let backgroundcolor = e.currentTarget.dataset.backgroundcolor

        console.log(e, url, id, title)

        if (this.data.UserLogin) {
            wx.navigateTo({
                url: `${url}?id=${id}&title=${title}&backgroundcolor=${backgroundcolor}`,
                success: function (res) {
                    console.log('res', res)
                },
                fail: function (err) {
                    console.log('err', err)
                }
            })
        } else {
            // 提示登录
            wx.showToast({
                title: '你还未登录，请先到个人中心登录！',
                icon: 'none',
                duration: 2500,
                mask: true,
            })
        }
    },
    // 跳转函数
    Navigate: function (e) {
        console.log(e, e.currentTarget.dataset.id)
        let url = e.currentTarget.dataset.url
        let id = e.currentTarget.dataset.id
        let UserLogin = this.data.UserLogin
        if (UserLogin) {
            wx.navigateTo({
                url: `${url}?id=${id}`,
            })
        } else {
            // 提示登录
            wx.showToast({
                title: '你还未登录，请先到个人中心登录！',
                icon: 'none',
                duration: 2500,
                mask: true,
            })
        }
    },

    // 跳到详情页函数
    NavigateToDetail: function (e) {
        console.log(e, e.currentTarget.dataset.id)
        let url = '../../Companypackage/houseDetail/houseDetail'
        let id = e.currentTarget.dataset.id
        let UserLogin = this.data.UserLogin
        if (UserLogin) {
            wx.navigateTo({
                url: `${url}?id=${id}`,
            })
        } else {
            // 提示登录
            wx.showToast({
                title: '你还未登录，请先到个人中心登录！',
                icon: 'none',
                duration: 2500,
                mask: true,
            })
        }
    },

    // 获取公告数据
    CompanyInfo() {
        let that = this
        const db = wx.cloud.database()
        db.collection('CompanyInfo')
            .field({
                notice: true
            })
            .get({
                success(res) {
                    wx.hideLoading()
                    console.log('CompanyInfo-res', res, that.data.notice == res.data[0].notice)
                    if (res.errMsg == "collection.get:ok") {
                        if (res.data.length) {
                            if (that.data.notice != res.data[0].notice) {
                                that.setData({
                                    notice: res.data[0].notice
                                })
                            }
                        }
                    }
                },
                fail: err => {
                    wx.hideLoading()
                    console.log('Recommend-err', err)
                }
            })
    },


    // 获取房源数据列表
    QueryHose() {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        let that = this
        const db = wx.cloud.database()
        db.collection('Entrust')
            .orderBy('recommendData.weight', 'desc')
            .where({
                publish: true,
                
            })
            .limit(20)
            .field({
                _id: true,
                photoInfo: true,
                title: true,
                EntrustType: true,
                publishTime: true,
                publishPlate: true,
                'FormData.area': true,
                'FormData.Tags': true,
                'FormData.roomStyle': true,
                'FormData.location': true,
                'FormData.totalPrice': true,
                'FormData.averagePrice': true
            })
            .get({
                success(res) {
                    wx.hideLoading()
                    console.log('Recommend-res', res)
                    if (res.errMsg == "collection.get:ok") {
                        let data = res.data
                        let HouseList = []
                        let newsHouseList = []
                        if (data.length > 0) {
                            data.map((item, index) => {
                                if (item.publishPlate == "SecondHouse") {
                                    newsHouseList.push(item)
                                } else {
                                    HouseList.push(item)
                                }
                            })


                            that.setData({
                             
                                HouseList: HouseList,
                                newsHouseList: newsHouseList
                            })
                        }
                    }
                },
                fail: err => {
                    wx.hideLoading()
                    console.log('Recommend-err', err)
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})