// pages/houseDetail/houseDetail.js
const {
    formatTime
} = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
            title:"",
            publishTime:"",
            content:"",
            HasCollection: false,
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log(e)
        let id = e.id
       console.log(id)
        this.HoseDettail(id)
        this.setData({
            ID: id
        })
        let userInfo = wx.getStorageSync('userInfo')
        let openid = userInfo.openid
        
        
    },

    // 查询详情
    HoseDettail(id) {
        wx.showLoading({
            title: '加载中...'
        })
        let that = this
        const db = wx.cloud.database()
        db.collection('NewHouse').where({
            _id: id
        }).get({
            success(res) {
                wx.hideLoading()
                console.log('detail-res', res)
                if (res.errMsg == "collection.get:ok") {
                    if (res.data.length > 0) {
                        let data = res.data[0]
                        console.log(data)
                        that.setData({
                            title:data.title,
                            publishTime:data.publishTime,
                            content:data.content
                        })

               
                    } else {
                        wx.showToast({
                            title: '网络错误,请返回重新打开',
                            mask: true,
                            icon: 'none'
                        })
                        
                    }
                } else {
                    wx.showToast({
                        title: '网络错误,请返回重新打开',
                        mask: true,
                        icon: 'none'
                    })
                   
                }
            },
            fail(err) {
                wx.hideLoading()
                console.log('detail-err', err)
                wx.showToast({
                    title: '网络错误,请返回重新打开',
                    mask: true,
                    icon: 'none'
                })
                wx.navigateBack({
                    delta: -1
                })
            }
        })
    },

    // 赋值
    SetLisDdata(data) {
        let title = data.title
        let FormData = data.FormData
        let HouseType = FormData.HouseType
        let location = FormData.location
        let Tags = FormData.Tags
        let phone = FormData.phonenumber
        let DetialList = this.data.DetialList
        DetialList[7].value=data.publishTime
        this.data.publishPlate=data.publishPlate
        for (let key in FormData) {
            for (let i = 0; i < DetialList.length; i++) {
                if (DetialList[i].id == key) {
                    DetialList[i].value = FormData[key]
                }
                if (DetialList[DetialList.length - 1].id == 'updateTime') {
                    DetialList[DetialList.length - 1].value = data.updateTime
                }
            }
        }
        let displayPhone = phone.replace(phone.substring(3, 7), "****")
        this.setData({
            title: title,
            HouseType: HouseType,
            location: location,
            Tags: Tags,
            displayPhone: displayPhone,
            DetialList: DetialList,
            
        })
        wx.hideLoading()
    },

// 检查是否已经收藏
HasCollection(openid, ID) {
    let that = this
    const db = wx.cloud.database()
    db.collection('Collections')
        .where({
            _openid: openid,
            ID: ID
        })
        .count({
            success(res) {
                console.log('是否收藏', res)
                if (res.errMsg == "collection.count:ok") {
                    if (res.total > 0) {
                        // 已收藏
                        that.setData({
                            HasCollection: true
                        })
                    }
                }
            },
            fail(err) {
                console.log(err)
            }
        })
},
 // 收藏信息
 Docollection() {
    let that = this
    // 如果已收藏，终止，防止重复收藏
    if (this.data.HasCollection) {
        wx.showToast({
            title: '已收藏',
            icon: 'none'
        })
        return
    }
    wx.showLoading({
        title: '正在收藏...',
        mask: true
    })
    // 未收藏，开始收藏
    const db = wx.cloud.database()
   
    db.collection('Collections')
        .add({
            data: {
                ID: that.data.ID,
                title: that.data.title,
                updateTime: formatTime(new Date())
            },
            success(res) {
                wx.hideLoading()
                console.log('collection-res', res)
                if (res.errMsg == "collection.add:ok") {
                    that.setData({
                        HasCollection: true
                    })
                    wx.showToast({
                        title: '收藏成功',
                        icon: 'none'
                    })
                } else {
                    wx.showToast({
                        title: '收藏失败',
                        icon: 'none'
                    })
                }
            },
            fail(err) {
                wx.hideLoading()
                console.log('collection', err)
                wx.showToast({
                    title: '收藏失败',
                    icon: 'none'
                })
            }
        })
},
    

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (e) {

    },

    // 

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})