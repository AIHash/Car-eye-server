Ext.define("OnCallCountApp.store.AnswerCountListStore",{
	extend:"Ext.data.Store",
	model:"OnCallCountApp.model.AnswerCountModel",
	autoLoad: { start: 0, limit: 18 },
	pageSize: 18,
	proxy: {
		type: 'ajax',
//		timeout: 600000,
		url: window.BIZCTX_PATH + '/statement/oncalltransaction/answercountjson/findPageAnswerCountList.action',  //请求的服务器地址
		reader: {
			type: 'json',
			root: 'result.list',
			totalProperty: 'result.totalCount'
		}
	}
 });