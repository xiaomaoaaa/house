// Adminpackage/EntrustDetail/EntrustDetail.js
const {
    formatTime
} = require("../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 渲染详细列表
        DetialList: [{
            'id': 'name',
            'title': '联系人',
            'value': ''
        },
        {
            'id': 'phonenumber',
            'title': '联系电话',
            'value': ''
        },
    
        {
            'id': 'location',
            'title': '所在城市',
            'value': ''
        },
      
        {
            'id': 'HouseType',
            'title': '证书类型',
            'value': ''
        },
       
        {
            'id': 'Invoice',
            'title': '是否有社保',
            'value': ''
        },
        {
            'id': 'Signing',
            'title': '是否可以到场配合检查',
            'value': ''
        }
        ,
        {
            'id': 'furniture',
            'title': '其他信息',
            'value': ''
        }
        ],

        // 状态
        StatusList: {
            'EntrustType': '',
            'updateTime': '',
            'checkedBy': '',
            'checkedTime': '',
            'publish': '',
            'publishTime': ''
        },
        // 搜索标题
        title: '',
        // 负责人
        charge: {
            'name': '',
            'phone': ''
        },
        itemList: ['求职', '招聘'],
        // 发布的板块
        publishPlateList: [ 'SecondHouse', 'RentingHouse'],
        publishPlate: '',
        plate: '',
        isreal:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        this.setData({
            isreal:wx.getStorageSync("isreal")  
        })
        let id = e.id
        // id = 'b040a67a5dfb2a4304d36b315da2038a'
        this.EntrustDetail(id)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (e) {
    },

    // 查询详细信息
    EntrustDetail(id) {
        console.log(id)
        wx.showLoading({
            title: '查询中...',
            mask: true
        })
        let that = this
        wx.cloud.callFunction({
            name: 'Entrust',
            data: {
                type: 'EntrustDetail',
                id: id
            },
            success: res => {
                console.log('myentrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    let data = res.result.data
                    if (data.length > 0) {
                        that.SetLisDdata(data[0])
                    } else {
                        // 提示没有数据
                        wx.hideLoading()
                        wx.showToast({
                            title: '查询失败,请返回重新打开',
                            icon: 'none',
                            mask: true
                        })
                    }
                } else {
                    // 提示网络错误
                    wx.hideLoading()
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

    // 赋值
    SetLisDdata(data) {
     
        let FormData = data.FormData
        let DetialList = this.data.DetialList
        let StatusList = this.data.StatusList
        for (let key in FormData) {
            for (let i = 0; i < DetialList.length; i++) {
                if (DetialList[i].id == key) {
                    DetialList[i].value = FormData[key]
                }
            }
        }
        StatusList['EntrustType'] = data.EntrustType
        StatusList['updateTime'] = data.updateTime
        StatusList['checkedBy'] = data.checkedBy
        StatusList['checkedTime'] = data.checkedTime
        StatusList['publish'] = data.publish
        StatusList['publishTime'] = data.publishTime
        this.setData({
            plate:data.plate,
            publishPlate : data.publishPlate
        })
        var name = data.charge['name']
        var phone = data.charge['phone']
        var displayPhone = phone.replace(phone.substring(3, 7), "****")

        if (name == '' && phone == '') {
            var userInfo = wx.getStorageSync('userInfo')
            name = userInfo.name
            phone = userInfo.phone
            displayPhone = phone.replace(phone.substring(3, 7), "****")
        }

        var charge = this.data.charge
        charge['name'] = name
        charge['phone'] = phone

        this.setData({
            _id: data._id,
            DetialList: DetialList,
            StatusList: StatusList,
            photoInfo: data.photoInfo,
            FormData: FormData,
            title: data.title,
            charge: charge,
            displayPhone: displayPhone
        })
        wx.hideLoading()
    },
    // 添加数据
    SubmitData() {
        wx.showLoading({
            title: '正在发布...',
            mask: true
        })
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
        let checkedBy = userInfo.name
        let title = this.data.DetialList[0].value
        let ID = this.data._id
        let publishPlate = this.data.publishPlate
        let plate = this.data.plate
        let charge = this.data.charge

        console.log(checkedBy)

        wx.cloud.callFunction({
            name: 'PublishEntrust',
            data: {
                type: 'add',
                plate: plate,
                publishPlate: publishPlate,
                checkedBy: checkedBy,
                title: title,
                ID: ID,
                charge: charge,
                checkedTime: formatTime(new Date()),
                publishTime: formatTime(new Date()),
                updateTime: formatTime(new Date())
            },
            success: res => {
                wx.hideLoading()
                console.log(res)
                wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000
                })
                // 页面跳转到成功页面
                wx.navigateBack({
                  delta: 1,
                })
                // wx.redirectTo({
                //     url: '../managerEntrust/managerEntrust'
                // })
            },
            fail: err => {
                wx.hideLoading()
                console.log(err)
                wx.showToast({
                    title: '发布失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: res => {
                console.log(res)
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