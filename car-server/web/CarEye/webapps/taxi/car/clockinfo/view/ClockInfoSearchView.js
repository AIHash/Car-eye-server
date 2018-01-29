Ext.define('ClockInfoApp.view.ClockInfoSearchView' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.clockInfoSearchView',
    title: '考勤信息搜索',
    frame : true,
    region: "north",
    height:120,
    collapsible: true,
    collapseMode: "mini",
    split: true,
	bodyStyle : 'padding:4px 2px 3px 4px',
	layout : {
		type : 'table',
		align : 'right',
		columns:5
	},
	fieldDefaults: {
    	labelAlign: 'right',
    	labelWidth:60
	},
    items : [{
								xtype : 'comboboxtree',
								fieldLabel : '企业',
								id : 'c_blocid',
								itemId : 'blocid',
								width:170,
								labelWidth: 60,
								store: Ext.create('Ext.data.TreeStore', {  
							        autoLoad : 'true',
							        fields: ['text','id','parentId'], 
									root : {expanded : true,text : '企业' },
									proxy: {
										 type: 'ajax',
										 url: window.BIZCTX_PATH + '/servlet/DeptTree?type=200', 
										 reader: {
											 type: 'json'
										 }
									}
							    }) ,
							    rootVisible: false,
								editable: true,
								cls : 'x-textfield',
								valueField: 'id', 
								displayField: 'text',
								listeners: {
							        change: {
							            element: 'el', 
							            fn: function(){ 
							            	var store = Ext.getCmp('c_blocid').store;
											store.clearFilter(true);
											store.on('beforeload', function (store, options) {
									            var new_params = { 
									            	blocname: encodeURI(Ext.getCmp('c_blocid').getRawValue())
									            };
									            Ext.apply(store.proxy.extraParams, new_params);
									        });
									        store.reload(); 
							            }
							        }
								 }
							},{
								xtype : 'combo',
								fieldLabel : '车牌号',
								width: 160,
								labelWidth: 50,
								id : 'c_carnumber',
								itemId : 'carnumber',
								labelAlign: 'right',
								store : 'CarPageListStore',
								displayField : 'carnumber',
								valueField : 'carnumber',
								pageSize : 10,
								minChars:1,
								matchFieldWidth:false,
								listConfig :{
									width:235
								}
							},{
						        xtype : 'textfield',
						        width : 170,
						        maxLength : 20,
								labelAlign: 'right',
						        labelWidth: 60,
						        id : 'c_terminal',
						        fieldLabel : '终端号码'
							},{
								xtype : 'datetimefield',
								width : 170,
								maxLength : 20,
								id : 'c_startstime',
								fieldLabel : '上班时间',
								labelWidth: 60,
								editable: false,
								labelAlign: 'right'
							}, {
								xtype : 'datetimefield',
								width : 130,
								maxLength : 20,
								id : 'c_startetime',
								fieldLabel : '至',
								labelWidth: 20,
								editable: false,
								labelAlign: 'right'
							},{
								xtype : 'datetimefield',
								width : 170,
								maxLength : 20,
								id : 'c_endstime',
								fieldLabel : '下班时间',
								labelWidth: 60,
								editable: false,
								labelAlign: 'right'
							},  {
								xtype : 'datetimefield',
								width : 130,
								maxLength : 20,
								id : 'c_endetime',
								fieldLabel : '至',
								labelWidth: 20,
								editable: false,
								labelAlign: 'right'
							}
    ],
    buttons : [{
	    text : '查询',
	    tooltip : '查询考勤信息',
	    iconCls : 'common-search-icon',
	    action: 'search'
	}, {
	    text : '重置',
	    tooltip : '清空查询条件',
	    iconCls : 'common-reset-icon',
//	    action : 'reset',
        handler: function(button){
        	button.up('form').getForm().reset();
        }
	}]

});

