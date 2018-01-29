Ext.define("QuestionApp.store.CarNumberStore",{
	extend:"Ext.data.Store",
	model:"QuestionApp.model.CarNumberModel",
	proxy: {
		type: 'ajax',
		url: window.BIZCTX_PATH + '/terminalpositionjson/selectCarList.action',  //请求的服务器地址
		reader: {
			type: 'json',
			root: 'result.list'
		}
	}
 });