Ext.define('IntercomApp.store.MemberListStore', {
	extend : "Ext.data.Store",
	model : 'IntercomApp.model.IntercomModel',
	autoLoad : {
		start : 0,
		limit : 30
	},
	pageSize : 30,
	proxy : {
		type : 'ajax',
		 url : window.BIZCTX_PATH + '/intercomjson/selMemberList.action', // 请求的服务器地址
		reader : {
			type : 'json',
			root : 'result.list',
			totalProperty : 'result.totalCount'
		}
	}
});
