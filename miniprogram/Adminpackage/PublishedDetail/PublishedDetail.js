
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
        showButton: false,
        preview: false,
        photoInfo: [],
        // 步骤
        step: 1,
        // 搜索标题
        title: '',
        // 负责人
        name: '',
        phone: '',
        itemList:  ['求职', '招聘'],
        // 发布的板块
        publishPlateList: ['SecondHouse', 'RentingHouse'],
        publishPlate: '',
        isreal:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        let id = e.id
        this.setData({
            isreal:wx.getStorageSync("isreal")  
        })
        if(this.data.isreal){
            this.EntrustDetail(id)
        }
        
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
        console.log(data)
        let FormData = data.FormData
        let DetialList = this.data.DetialList
        let StatusList = this.data.StatusList
        for (let key in FormData) {
            for (let i = 0; i < DetialList.length; i++) {
                if (DetialList[i].id == key) {
                    if (key == 'totalPrice') {
                        let title = data.EntrustType == 'sale' ? '外标价位(单位：万元)' : '外标价位(单位：元/月)'
                        DetialList[i].title = title
                    }
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

        let name = data.charge['name']
        let phone = data.charge['phone']
        let displayPhone = phone.replace(phone.substring(3, 7), "****")
        this.setData({
            plate:data.plate,
            publishPlate : data.publishPlate
        })

        if (name == '' && phone == '') {
            let userInfo = wx.getStorageSync('userInfo')
            name = userInfo.name
            phone = userInfo.phone
            displayPhone = phone.replace(phone.substring(3, 7), "****")
        }
        this.setData({
            _id: data._id,
            DetialList: DetialList,
            StatusList: StatusList,
            photoInfo: data.photoInfo,
            FormData: FormData,
            showButton: true,
            title: data.title,
            name: name,
            phone: phone,
            charge: data.charge,
            publishPlate: data.publishPlate,
            plate: data.plate,
            recommendData: data.recommendData,
            displayPhone: displayPhone
        })
        wx.hideLoading()
    },

    // 修改已经审核发布的
    ChangePublish(e) {
        console.log(e)
        let that = this
        // 进行确认提示
        wx.showModal({
            title: '修改提示',
            content: '修改信息将会把已经发布和推荐到首页的信息撤下来,需要重新审核发布才能使客户搜索到,是否确定进行修改?',
            confirmText: '确定修改',
            cancelText: '取消',
            mask: true,
            success(res) {
                if (res.confirm) {
                    that.DoChange()
                }
            }
        })
    },

    // 调用云函数进行操作
    DoChange() {
        wx.showLoading({
            title: '正在撤销发布...',
            mask: true
        })
        let id = this.data._id
        let publishPlate = this.data.publishPlate
        console.log(publishPlate)
        // 撤销发布
        wx.cloud.callFunction({
            name: 'PublishEntrust',
            data: {
                type: 'changeEntrust',
                ID: id,
                publishPlate: publishPlate
            },
            success: res => {
                console.log('changeEntrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    wx.hideLoading()
               
                    if (res.result.errMsg == 'collection.update:ok' && res.result.stats.updated > 0) {
                        // 进行确认提示
                        wx.showModal({
                            title: '提示',
                            content: '成功把该已审核发布的信息撤下来,是否马上对该信息的信息进行修改?',
                            confirmText: '马上修改',
                            cancelText: '取消',
                            mask: true,
                            success(res) {
                                if (res.confirm) {
                                   
                                    wx.redirectTo({
                                        url: `../../Adminpackage/EntrustDetail/EntrustDetail?id=${id}`,
                                    })
                                } else {
                                    // 返回列表
                                    wx.navigateBack({
                                        delta: -1
                                    })
                                    // wx.navigateTo({
                                    //     url: `../../Adminpackage/managerEntrust/managerEntrust`,
                                    // })
                                }
                            }
                        })
                    }
                } else {
                    // 提示网络错误
                    wx.hideLoading()
                    wx.showToast({
                        title: '撤销失败',
                        icon: 'none',
                        mask: true
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('changeEntrust-err', err)
                wx.showToast({
                    title: '网络错误,撤销信息失败,请返回重新打开',
                    icon: 'none',
                    mask: true
                })
            }
        })
    },

    // 删除确认提示
    DeleteHouse() {
        let that = this
        // 进行确认提示
        wx.showModal({
            title: '删除提示',
            content: '信息信息一旦删除,与之有关的所有信息都会被删除,并且不能恢复,是否确定继续删除?',
            confirmText: '确定删除',
            confirmColor: '#ff0080',
            cancelText: '取消',
            mask: true,
            success(res) {
                if (res.confirm) {
                    // 删除照片
                    that.DoDeleteHouse()
                }
            }
        })
    },

    // 删除该信息
    DoDeleteHouse() {
        let that = this
        let id = this.data._id
        let publishPlate = this.data.publishPlate
        // 删除信息
        wx.showLoading({
            title: '删除信息...',
            mask: true
        })
        // 撤销发布
        wx.cloud.callFunction({
            name: 'PublishEntrust',
            data: {
                type: 'deleteEntrust',
                ID: id,
                publishPlate: publishPlate
            },
            success: res => {
                wx.hideLoading()
                console.log('changeEntrust-res', res)
                if (res.errMsg == "cloud.callFunction:ok") {
                    if (res.result.stats.removed > 0 && res.result.errMsg == 'collection.remove:ok') {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'none',
                            mask: true
                        })
                        // 跳转回去
                        wx.navigateBack({
                            delta: -1
                        })
                        // wx.navigateTo({
                        //   url: '../managerEntrust/managerEntrust',
                        // })
                    } else {
                        // 提示网络错误
                        wx.showToast({
                            title: '删除失败',
                            icon: 'none',
                            mask: true
                        })
                    }
                } else {
                    // 提示网络错误
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        mask: true
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('changeEntrust-err', err)
                wx.showToast({
                    title: '网络错误,查询失败,请返回重新打开',
                    icon: 'none',
                    mask: true
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