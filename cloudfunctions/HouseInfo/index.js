// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
    traceUser: true
})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openId = wxContext.OPENID
    if (event.type === 'query') {
        let limit = 10
        let dbname = event.key
        let page = event.page
        let matchObj=null
        let searchtext=event.searchtext?event.searchtext:''
        if(searchtext){
            matchObj={
                'EntrustInfo.publish': true,
                'EntrustInfo.FormData.location':db.RegExp({
                    regexp: searchtext,
                    options: 'i',
                  })
            }
        }else{
            matchObj={
                'EntrustInfo.publish': true,
            }  
        }
        let res = await db.collection(dbname).aggregate()
            .skip(page)
            .limit(limit)
            .sort({
                updateTime: -1
            })
            .lookup({
                from: 'Entrust',
                localField: 'ID',
                foreignField: '_id',
                as: 'EntrustInfo',
            })
            .match(matchObj)
            .project({
                'ID': true,
                'updateTime': true,
                'EntrustInfo.title': true,
                'EntrustInfo.FormData.HouseType': true,
                'EntrustInfo.FormData.location': true,
                'EntrustInfo.FormData.Invoice': true,
                'EntrustInfo.FormData.Tags': true,
                'EntrustInfo.publishTime': true
            })
            .replaceRoot({
                newRoot: $.mergeObjects([$.arrayElemAt(['$EntrustInfo', 0]), '$$ROOT'])
            })
            .project({
                '_id': false,
                'EntrustInfo': false
            })
            .end()
        return res
    }

    if (event.type == 'housetype') {
        let limit = 10
        let dbname = event.key
        let page = event.page
        let HouseType= event.HouseType
       
        let res = await db.collection(dbname).aggregate()
            .skip(page)
            .limit(limit)
            .sort({
                updateTime: -1
            })
            .lookup({
                from: 'Entrust',
                localField: 'ID',
                foreignField: '_id',
                as: 'EntrustInfo',
            })
            .match({
                'EntrustInfo.publish': true,
                'EntrustInfo.FormData.HouseType': HouseType
            })
            .project({
                'ID': true,
                'updateTime': true,
                'EntrustInfo.title': true,
                'EntrustInfo.FormData.HouseType': true,
                'EntrustInfo.FormData.location': true,
                'EntrustInfo.FormData.Invoice': true,
                'EntrustInfo.FormData.Tags': true,
                'EntrustInfo.publishTime': true
            })
            .replaceRoot({
                newRoot: $.mergeObjects([$.arrayElemAt(['$EntrustInfo', 0]), '$$ROOT'])
            })
            .project({
                '_id': false,
                'EntrustInfo': false
            })
            .end()
            console.log(res)
        return res
    }

    // 价格筛选
    if (event.type == 'invoice') {
        let limit = 10
        let page = 0
        let dbname = event.key
        let Invoice= event.Invoice
        let res = await db.collection(dbname).aggregate()
            .skip(page)
            .limit(limit)
            .sort({
                updateTime: -1
            })
            .lookup({
                from: 'Entrust',
                localField: 'ID',
                foreignField: '_id',
                as: 'EntrustInfo',
            })
            .match({
                'EntrustInfo.publish': true,
                'EntrustInfo.FormData.Invoice':Invoice
            })
            .project({
                'ID': true,
                'updateTime': true,
                'EntrustInfo.title': true,
                'EntrustInfo.FormData.roomStyle': true,
                'EntrustInfo.FormData.location': true,
                'EntrustInfo.FormData.Tags': true,
                'EntrustInfo.FormData.Invoice': true,
                'EntrustInfo.publishTime': true
            })
            .replaceRoot({
                newRoot: $.mergeObjects([$.arrayElemAt(['$EntrustInfo', 0]), '$$ROOT'])
            })
            .project({
                '_id': false,
                'EntrustInfo': false
            })
            .end()
        return res
    }

}