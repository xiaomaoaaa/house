// Adminpackage/companyInfo/companyInfo.js
const { formatTime } = require("../../utils/util.js")
Page({

    data: {
        // 照片列表
        CompanyData: {
            '_id': '',
            'introduce': '',
            'notice': '',
            'editer': '',
            'phone': '',
            'updatetime': ''
        },
        // 字数
        length: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.CompanyInfo()
    },

    // 获取输入框的数据
    InputData(e) {
        console.log(e, e.detail.cursor, e.detail.value)
        let id = e.currentTarget.dataset.id
        let value = e.detail.value
        let CompanyData = this.data.CompanyData
        if (id == 'info') {
            CompanyData['introduce'] = value
        }
        if (id == 'notice') {
            CompanyData['notice'] = value
        }
        this.setData({
            CompanyData: CompanyData
        })
    },

    // 获取数据
    CompanyInfo() {
        wx.showLoading({
            title: '获取数据...',
            mask: true
        })
        let that = this
        const db = wx.cloud.database()
        db.collection('CompanyInfo')
            .get({
                success(res) {
                    wx.hideLoading()
                    console.log('CompanyInfo-res', res)
                    if (res.errMsg == "collection.get:ok") {
                        if (res.data.length > 0) {
                            that.setData({
                                length: res.data[0].introduce.length,
                                CompanyData: res.data[0]
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

    // 更新数据
    submitData() {
        let CompanyData = this.data.CompanyData
        let ID = CompanyData._id
        let introduce = CompanyData.introduce
        let notice = CompanyData.notice

        let userInfo = wx.getStorageSync('userInfo')
        let editer = userInfo.name
        let phone = userInfo.phone

        let that = this
        // 调用函数修改信息
        wx.showLoading({
            title: '正在修改...',
            mask: true
        })
        wx.cloud.callFunction({
            name: 'Manager',
            data: {
                ID: ID,
                type: 'update-company',
                editer: editer,
                introduce: introduce,
                notice: notice,
                phone: phone,
                updatetime: formatTime(new Date())
            },
            success(res) {
                wx.hideLoading()
                console.log('EditStaff-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    if (res.result.errMsg == 'collection.update:ok' && res.result.stats.updated > 0) {
                        // 添加成功
                        that.ShowTips('修改成功')
                    } else {
                        // 添加失败
                        that.ShowTips('修改失败')
                    }
                } else {
                    // 添加失败
                    that.ShowTips('修改失败')
                }
            },
            fail(err) {
                wx.hideLoading()
                console.log('AddNewStaff-err', err)
                // 添加失败
                that.ShowTips('网络错误，修改失败')
            }
        })
    },

    // 提示
    ShowTips(tips) {
        wx.showToast({
            title: tips,
            mask: true,
            icon: 'none'
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