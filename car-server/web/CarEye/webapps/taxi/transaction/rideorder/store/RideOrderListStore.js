Ext.define('RideOrderApp.store.RideOrderListStore', {
	extend : "Ext.data.Store",
	model : 'RideOrderApp.model.RideOrderListModel',
	autoLoad : {
		start : 0,
		limit : 30
	},
	pageSize : 30,
	proxy : {
		type : 'ajax',
		 url : window.BIZCTX_PATH + '/rideorderjson/selRideOrderList.action', // 请求的服务器地址
		reader : {
			type : 'json',
			root : 'result.list',
			totalProperty : 'result.totalCount'
		}
	}
});
