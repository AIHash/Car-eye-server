Ext.define("VoiceOrderApp.store.VoiceOrderAnswerListStore",{
	extend:"Ext.data.Store",
	autoLoad: { start: 0, limit: 30 },
	autoLoad: false,
	model:"VoiceOrderApp.model.VoiceOrderAnswerModel",
	pageSize: 30,
	proxy: {
		type: 'ajax',
		url: window.BIZCTX_PATH + '/transaction/transactionjson/getTransactionAnswerList.action',  //请求的服务器地址
		reader: {
			type: 'json',
			root: 'result.list',
			totalProperty: 'result.totalCount'
		}
	}
 });