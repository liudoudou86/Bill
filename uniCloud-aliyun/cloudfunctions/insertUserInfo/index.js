'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('insertUserInfo: ', event)
	// 初始化数据库
	const db = uniCloud.database();
	// 向user表插入客户端的数据
	const res = await db.collection('user').add(event);
	console.log("向user表插入数据", res)
	//返回数据给客户端
	return res
};
