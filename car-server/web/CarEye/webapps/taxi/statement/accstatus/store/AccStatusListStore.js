Ext.define("AccStatusApp.store.AccStatusListStore",{
	extend:"Ext.data.Store",
	model:"AccStatusApp.model.AccStatusModel",
	autoLoad: true,
	pageSize: 30,
	autoLoad: { start: 0, limit: 30 },
	proxy: {
		type: 'ajax',
		//timeout: 600000,
		url: window.BIZCTX_PATH + '/statement/statementjson/selectAccStatus.action',  //请求的服务器地址
		reader: {
			type: 'json',
			root: 'result.list',
			totalProperty: 'result.totalCount'
		}
	}
 });