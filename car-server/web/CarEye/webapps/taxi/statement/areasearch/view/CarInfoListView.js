Ext.define('AreaSetApp.view.CarInfoListView' ,{
    extend: 'Ext.grid.Panel',
    border : false,
    id:'carareasetgrid',
    alias : 'widget.carInfoListView',
			region: "east",
			width:280,
			title:'车辆区域',
            collapsible: true,
			store: "CarInfoListStore",
            collapseMode: "mini",
            split: true,
			frame: true,
			multiSelect: true,
			stripeRows:true, //表格是否隔行换色，默认为false
			loadMask:true,   //是否在加载数据时显示遮罩效果，默认为false
			selModel: { selType: 'checkboxmodel' }, //在首列實現checkbox，僅此在首列
			columns: [
			{ header: 'carid', flex: 0.4 ,dataIndex: 'carid', hidden: true },
			{ header: '车牌号', flex: 0.8, dataIndex: 'carnumber', sortable: true },
			{ header: '车载号码', flex: 1, dataIndex: 'terminal', sortable: true }
			],
			dockedItems: [
					{
					    xtype: 'toolbar',
					    dock: 'top',
					    items: [
							{
								xtype : 'comboboxtree',
								fieldLabel : '企业',
								editable:true,
						        labelWidth: 30,
								id : 'cas_blocid',
								width:140,
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
								cls : 'x-textfield',
								valueField: 'id', 
								displayField: 'text',
								listeners: {
							        change: {
							            element: 'el', 
							            fn: function(){ 
							            	var store = Ext.getCmp('cas_blocid').store;
											store.clearFilter(true);
											store.on('beforeload', function (store, options) {
									            var new_params = { 
									            	blocname: encodeURI(Ext.getCmp('cas_blocid').getRawValue())
									            };
									            Ext.apply(store.proxy.extraParams, new_params);
									        });
									        store.reload(); 
							            }
							        }
								 }
							},{
						        xtype : 'textfield',
						        width : 125,
						        maxLength : 20,
						        id : 'cas_carnumber',
						        labelAlign: 'right',
						        labelWidth:40,
						        fieldLabel : '车牌号'
		                     } 
						    ]
						},  {
			                  xtype: 'toolbar',
			                  dock: 'top',
			                  items: [
			                     '->',{
									xtype: 'button',
									text : '查询',
									id : 'mailset_query_car',
									tooltip : '查询',
									iconCls : 'common-search-icon',
									action: 'searchcar'
								}, {
								    text : '重置',
								    tooltip : '清空查询条件',
								    iconCls : 'common-reset-icon',
//								    action : 'resetcar',
							        handler: function(button){
							        	Ext.getCmp('cas_blocid').setValue("");
							        	Ext.getCmp('cas_carnumber').setValue("");
							        }
								}
			                  ]
			              }
			          ]
//			          ,
//			bbar : {
//				xtype : 'pagingtoolbar',
//				store: "CarInfoListStore",
//	            displayInfo: true,   
//	            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',   
//	            emptyMsg: "没有数据" 
//			}
});


