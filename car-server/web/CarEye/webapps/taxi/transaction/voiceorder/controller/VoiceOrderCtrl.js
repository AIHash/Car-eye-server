var mapObj;
var marker;
var markermap = new Map();
var flag=1; //1 出发地  2 目的地
var mapObj;
var marker;
var markermap = new Map();
var city;
Ext.define('VoiceOrderApp.controller.VoiceOrderCtrl', {
    extend: 'Ext.app.Controller',
    stores: [
             'VoiceOrderListStore',
             'TypeListStore',
             'ResstatusStore',
             'SourceStore',
             'StatusStore',
             'TraTypeStore',
             'PioPlaceStore',
             'CarpoolStore',
             'VoiceOrderAnswerListStore'
             ],//声明该控制层要用到的store
    models: [
    	'VoiceOrderModel',
    	'TypeModel',
    	'PioPlaceModel',
    	'VoiceOrderAnswerModel'
    	],//声明该控制层要用到的model
    views: [
    		'VoiceOrderListView',
		    'VoiceOrderEditView',
		    'MapView',
		    'SearchMapView',
		    'CenterListView',
		    'MapWindowView',
		    'VoiceOrderSearchView',
		    'VoiceOrderAnswerListView'
		    ],//声明该控制层要用到的view
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'voiceOrderListView',
            selector: 'voiceOrderListView'
        },{
            ref: 'searchMapView',
            selector: 'searchMapView'
        },{
            ref: 'mapView',
            selector: 'mapView'
        },{
            ref: 'centerListView',
            selector: 'centerListView'
        },{
            ref: 'voiceOrderSearchView',
            selector: 'voiceOrderSearchView'
        },{
            ref: 'voiceOrderAnswerListView',
            selector: 'voiceOrderAnswerListView'
        }
    ],
    init: function() {
		this.control({
			'voiceOrderSearchView button[action=search]' : {
				click : this.searchVoiceOrder
			},
			'voiceOrderListView button[action=delete]' : {
				click : this.deleteVoiceOrder
			},
			'voiceOrderListView button[action=edit]' : {
				click : this.editVoiceOrder
			},
			'voiceOrderEditView button[action=save]' : {
				click : this.saveVoiceOrder
			},
			'voiceOrderEditView button[action=sselmap]' : {
				click : this.saddress
			},
			'voiceOrderListView button[action=export]' : {
				click : this.exportInfo
			},
			'searchMapView': {
                afterrender:function(component, eOpts){
                    //初始化地图
                    render: this.initMap(component.el.dom);
                }
            },
            'mapView button[action=searchtext]' : {
				//click : this.searchtext
            	click : this.searchPOI
			}
		});
	},
	 /*
        初始化地图
    */
    initMap:function(div){
				markermap.clear();
				mapObj = new AMap.Map("searchMapView", {
					resizeEnable : true,
					rotateEnable : true,
					dragEnable : true,
					zoomEnable : true,
					zooms : [3, 18],
					// 二维地图显示视口
					view : new AMap.View2D({
						center : new AMap.LngLat(116.397428, 39.90923),// 地图中心点
						zoom : 13
					})
				});
				//加载城市查询插件
				AMap.service(["AMap.CitySearch"], function() {
					//实例化城市查询类
					var citysearch = new AMap.CitySearch();
					//自动获取用户IP，返回当前城市
					citysearch.getLocalCity(function(status, result){
						if(status === 'complete' && result.info === 'OK'){
							if(result && result.city && result.bounds) {
								var cityinfo = result.city;
								var citybounds = result.bounds;
								//地图显示当前城市
								mapObj.setBounds(citybounds);
		                        mapObj.setZoom(10);
							}
						}else{
						}
					});
				});
			},
    saddress : function() {
		var view = Ext.widget('mapWindowView');
		view.show();
		Ext.getCmp('flag').setValue("1");
		return false;
	},
//    searchtext:function(){
//    	var keyword = Ext.getCmp('addr_search').getValue();
//			if (keyword == null || keyword == ""){
//				Ext.Msg.alert('提示',"请输入要搜索的关键字");
//				return;
//			}
//			getlocation(keyword);
//    },
    searchPOI:function(button){
		var keyword = Ext.getCmp('addr_search').getValue();
		if (keyword == null || keyword == "") {
			Ext.Msg.alert('提示', "请输入要搜索的关键字");
			return;
		}
		var store=Ext.StoreManager.get("PioPlaceStore");
		store.removeAll();
		var arrays=new Array();
		//获取用户所在城市信息
		function showCityInfo() { 
			//加载城市查询插件
			AMap.service(["AMap.CitySearch"], function() {
				//实例化城市查询类
				var citysearch = new AMap.CitySearch();
				//自动获取用户IP，返回当前城市
				citysearch.getLocalCity(function(status, result){
					if(status === 'complete' && result.info === 'OK'){
						if(result && result.city && result.bounds) {
							city = result.city;
						}
					}else{
						city=result.info ;
					}
				});
			});
		}
		
		showCityInfo();
		
		AMap.service(["AMap.PlaceSearch"], function() {       
	        MSearch = new AMap.PlaceSearch({ //构造地点查询类
	            pageSize:poipagesize,
	            pageIndex:1,
	            city:city //城市
	        });
	        //关键字查询
	        MSearch.search(keyword, function(status, result){
	        	if(status === 'complete' && result.info === 'OK'){
	        		
	        		var poiList= result.poiList.pois;
	        		for(var i=0;i<poiList.length;i++){
        			   var poi=poiList[i];
        			   var location=poi.location.lng+","+poi.location.lat;
						
					   var obj=new Object();
					   obj.name=poi.name;
					   obj.address=poi.address;
					   obj.lnglat=location;
					   obj.telephone=poi.tel;
					   arrays[i]=obj;
	        		}
	        	}else if(status === 'no_data'){
	        	}
	        	 store.addSorted(arrays);  
	        }); 
	        
	    });
	},
	searchVoiceOrder : function(button) {
		var stime=Ext.util.Format.date(Ext.getCmp('tran_stime').getValue(), 'Y-m-d H:i:s');
		var etime=Ext.util.Format.date(Ext.getCmp('tran_etime').getValue(), 'Y-m-d H:i:s');
		if(validTime(stime,etime)==-1){
			Ext.Msg.alert("提示","结束日期不能小于开始日期!");
			return;
		}
		var stime1=Ext.util.Format.date(Ext.getCmp('tran_stime1').getValue(), 'Y-m-d H:i:s');
		var etime1=Ext.util.Format.date(Ext.getCmp('tran_etime1').getValue(), 'Y-m-d H:i:s');
		if(validTime(stime1,etime1)==-1){
			Ext.Msg.alert("提示","结束日期不能小于开始日期!");
			return;
		}
		var stime2=Ext.util.Format.date(Ext.getCmp('tran_stime2').getValue(), 'Y-m-d H:i:s');
		var etime2=Ext.util.Format.date(Ext.getCmp('tran_etime2').getValue(), 'Y-m-d H:i:s');
		if(validTime(stime2,etime2)==-1){
			Ext.Msg.alert("提示","结束日期不能小于开始日期!");
			return;
		}
		var store = this.getVoiceOrderListStoreStore();
		store.clearFilter(true);
		store.on('beforeload', function (store, options) {
	            var new_params = { 
	            	source: encodeURI(Ext.getCmp('tran_source').getValue()),
	            	typeid: encodeURI(Ext.getCmp('tran_typeid').getValue()),
	            	tratype: encodeURI(Ext.getCmp('tran_tratype').getValue()),
	            	carpool: encodeURI(Ext.getCmp('tran_carpool').getValue()),
	            	status: encodeURI(Ext.getCmp('tran_status').getValue()),
	            	resstatus: encodeURI(Ext.getCmp('tran_resstatus').getValue()),
	            	stime: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime').getValue(), 'Y-m-d H:i:s')),
	            	etime: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime').getValue(), 'Y-m-d H:i:s')),
	            	stime1: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime1').getValue(), 'Y-m-d H:i:s')),
	            	etime1: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime1').getValue(), 'Y-m-d H:i:s')),
	            	stime2: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime2').getValue(), 'Y-m-d H:i:s')),
	            	etime2: encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime2').getValue(), 'Y-m-d H:i:s'))
	            };
	            Ext.apply(store.proxy.extraParams, new_params);
	        });
	        store.loadPage(1); 
	        //store.reload();
	    return false;
	},
	saveVoiceOrder : function(button) {
			var win = button.up('window');
			var form = win.down('form');
			var store = this.getVoiceOrderListStoreStore();
			if (!form.getForm().isValid()) {
				return;
			}
			Ext.MessageBox.wait('请稍候...', '提示');
			form.getForm().submit({
				url : window.BIZCTX_PATH + '/transaction/transactionjson/saveTransaction.action',
				method : 'post',
				success : function(form, action) {
						Ext.MessageBox.updateProgress(1);
					    Ext.MessageBox.close();
						var resp = action.result.result;
						var su = resp.su;
						 if (su == -1) {
							win.close();
							Ext.Msg.alert("提示","系统异常,请与管理员联系!");
						}else if (su == -3) {
							Ext.Msg.alert("提示","不是来电最近一次约车记录不可修改!");
						}else {
							win.close();
							Ext.Msg.alert("提示","操作信息成功!");
							store.reload();
						}
			    },
				failure : function(form, action) {
					Ext.MessageBox.updateProgress(1);
					Ext.MessageBox.close();
					win.close();
					Ext.Msg.alert('提示', "操作信息失败!");
					store.reload();
				}
			});
			return false;
	},
	deleteVoiceOrder : function(button) {
		var grid = button.up('grid');
		//var grid=Ext.getCmp('dataBankListViewGrid');
		var data = grid.getSelectionModel().getSelection();
		var store = grid.getStore();
		if (data.length>0) {
			Ext.MessageBox.confirm('提示','你确认要删除选中的数据？',
			function(btn) {
				if (btn == "yes") {
					var m = grid.getSelectionModel().getSelection();
					var jsonData = "";
					var customertypeids="";
					for ( var i = 0, len = m.length; i < len; i++) {
						var ss = m[i].get("id");
					    var resstatus = store.getById(m[i].get('id')).get("resstatus");
						if(resstatus == 1){
								Ext.Msg.alert('提示',"已抢答的业务不能删除!");
								return;
						}
						if (i == 0) {
							jsonData = jsonData + ss;
						} else {
							jsonData = jsonData + "," + ss;
						}
					}
					Ext.Ajax.request( {
								url : window.BIZCTX_PATH + '/transaction/transactionjson/deleteTransaction.action',
								method : 'POST',  
								params : "ids="+ jsonData,
								success : function(response) {
									var text = response.responseText;
									 var obj = eval( "(" + text + ")" );//转换后的JSON对象
				   					 var su = obj.result.su;
									 if (su == -1) {
										Ext.Msg.alert('提示',"不能被删除");
										store.reload();
									}else {
										Ext.Msg.alert('提示',"删除成功");
										store.reload();
									}
						   		},
								failure : function() {
									Ext.Msg.alert('提示',"删除失败");
									store.reload();
								}
							});
				}
			});
		} else {
			Ext.Msg.alert('提示', '请选择要删除的数据项!');
		}
		return false;
	},
	editVoiceOrder : function(button) {
		var grid = button.up('grid');
		var records = grid.getSelectionModel().getSelection();
		if(records.length != 1){
			Ext.Msg.alert('提示', '请选择一条记录编辑');
			return;
		}
		//已抢答的业务不能修改
		var store = this.getVoiceOrderListStoreStore();
		
		var resstatus = store.getById(records[0].get('id')).get("resstatus");
		if(resstatus == 1){
			Ext.Msg.alert('提示',"已抢答的业务不能修改!");
			return;
		}
		if(flag==1){
		     s_lng=store.getById(records[0].get('id')).get("slng");
		     s_lat=store.getById(records[0].get('id')).get("slat");
		}else if(flag==2){
			 e_lng=store.getById(records[0].get('id')).get("elng");
             e_lat=store.getById(records[0].get('id')).get("elat");
		}
		var view = Ext.widget('voiceOrderEditView');
		view.show();
		
		var data = store.getById(records[0].get('id'));
		view.down('form').loadRecord(data);
		return false;
	},
	exportInfo : function (button){
		    var source=encodeURI(Ext.getCmp('tran_source').getValue());
	        var typeid=encodeURI(Ext.getCmp('tran_typeid').getValue());
	        var carpool=encodeURI(Ext.getCmp('tran_carpool').getValue());
	        var	tratype= encodeURI(Ext.getCmp('tran_tratype').getValue());
	        var status=encodeURI(Ext.getCmp('tran_status').getValue());
	        var resstatus= encodeURI(Ext.getCmp('tran_resstatus').getValue());
	        var stime= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime').getValue(), 'Y-m-d H:i:s'));
	        var etime= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime').getValue(), 'Y-m-d H:i:s'));
	        var stime1= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime1').getValue(), 'Y-m-d H:i:s'));
	        var etime1= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime1').getValue(), 'Y-m-d H:i:s'));
	        var stime2= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_stime2').getValue(), 'Y-m-d H:i:s'));
	        var etime2= encodeURI(Ext.util.Format.date(Ext.getCmp('tran_etime2').getValue(), 'Y-m-d H:i:s'));
	        
	        if(validTime(stime,etime)==-1){
				Ext.Msg.alert("提示","结束日期不能小于开始日期!");
				return;
			}
			if(validTime(stime1,etime1)==-1){
				Ext.Msg.alert("提示","结束日期不能小于开始日期!");
				return;
			}
			if(validTime(stime2,etime2)==-1){
				Ext.Msg.alert("提示","结束日期不能小于开始日期!");
				return;
			}
	        
	        var strParams="calltype=2&source="+source+"&typeid="+typeid+
	        "&tratype="+tratype+"&status="+status+
	        "&carpool="+carpool+
	        "&resstatus="+resstatus+
	        "&stime="+stime+"&etime="+etime+
	        "&stime1="+stime1+"&etime1="+etime1+
	        "&stime2="+stime2+"&etime2="+etime2;
	        
        	location.href=window.BIZCTX_PATH + '/transaction/transactionjson/exportExcel.action?'+strParams;
	},
	exportAnswerList : function (button){
		var view = Ext.getCmp('voiceOrderListViewGrid');
		var records = view.getSelectionModel().getSelection();
		if(records.length != 1){
			return;
		}
		 var orderid=records[0].data.orderid;
        	location.href=window.BIZCTX_PATH + '/transaction/transactionjson/exportAnswerList.action?calltype=2&orderid='+orderid;
	}
});

function getlocation(keyword){
	   var cityinfo="";
		//加载城市查询插件
		AMap.service(["AMap.CitySearch"], function() {
				//实例化城市查询类
				var citysearch = new AMap.CitySearch();
				//自动获取用户IP，返回当前城市
				citysearch.getLocalCity(function(status, result){
					if(status === 'complete' && result.info === 'OK'){
						if(result && result.city && result.bounds) {
							cityinfo = result.city;
							var citybounds = result.bounds;
							
		var store = Ext.StoreManager.get('PioPlaceStore');
		// 显示
	    var myMask = new Ext.LoadMask(Ext.getBody(), {//也可以是Ext.getCmp('').getEl()窗口名称
            msg    : "正在操作,请稍后...",//你要写成Loading...也可以
            msgCls : 'z-index:10000;'
        }); 
        myMask.show();
        
	     Ext.getCmp('centerlistview').expand();
			store.on('beforeload', function (store, options) {
			            var new_params = { 
				            query: encodeURI(keyword),
				            city: encodeURI(cityinfo)
			            };
			            Ext.apply(store.proxy.extraParams, new_params);
			        });
			     store.load();
       			myMask.hide();
			}
					}
				});
			});
}


function addMarker(lng, lat,pioname) {
	map.clearOverlays();
	marker = new AMap.Marker({                   
	   map:mapObj,  
	   title:pioname,
	   position:new AMap.LngLat(lng,lat), //位置
	   icon:"http://webapi.amap.com/images/marker_sprite.png"
    });
			   
    //自定义点标记内容  
    var markerContent = document.createElement("div");
    markerContent.className = "markerContentStyle";
    //点标记中的图标
    var markerImg= document.createElement("img");
    markerImg.className="markerlnglat";
    markerImg.src="http://webapi.amap.com/images/marker_sprite.png";   
    markerContent.appendChild(markerImg);
      
    //点标记中的文本
    var markerSpan = document.createElement("span");
    markerSpan.style.width=100;
    markerSpan.style.height=20;
    markerSpan.innerHTML = pioname;
    
    markerContent.appendChild(markerSpan);
    marker.setContent(markerContent);//更新点标记内容
    
    AMap.event.addListener(marker, 'click', function(e) {
    	var flag = Ext.getCmp('flag').getValue();
    	if (flag == 1) {	//出发地
			Ext.getCmp('saddress').setValue(pioname);
			Ext.getCmp('slng').setValue(lng);
			Ext.getCmp('slat').setValue(lat);
		} 
	Ext.getCmp('mapWindowView').close();
    });
    mapObj.setFitView();
}

function playVoice(addr){
//	addr=addr.replace("http","https");
	Ext.Ajax.request( {
		url : window.BIZCTX_PATH + '/transaction/transactionjson/downloadURLVoice.action',
		method : 'POST',  
		params : "voiceurl="+ addr,
		success : function(response) {
			var text = response.responseText;
			 var obj = eval( "(" + text + ")" );//转换后的JSON对象
			 var fileName = obj.result.fileName;
			 if(Ext.isIE){
			     document.getElementById("voiceOrder").src= window.BIZCTX_PATH + "/download/voice/"+fileName;
		    }else{
	    		soundManager.createSound({
		            id: "v"+fileName.split(".")[0], 
		            url: window.BIZCTX_PATH + "/download/voice/"+fileName //wav文件的路径
		        });
			    soundManager.play("v"+fileName.split(".")[0]);	//根据初始化id播放对应声音		}
	    	 }
   		},
		failure : function() {
			Ext.Msg.alert('提示',"播放失败");
		}
	});
}

 function validTime(startTime,endTime){
       var arr1 = startTime.split("-");
       var arr2 = endTime.split("-");
       var date1=new Date(parseInt(arr1[0]),parseInt(arr1[1])-1,parseInt(arr1[2]),0,0,0);
       var date2=new Date(parseInt(arr2[0]),parseInt(arr2[1])-1,parseInt(arr2[2]),0,0,0);
       if(date1.getTime()>date2.getTime()) {                               
               return -1;
         }else{
             return 1;
         }
         return -1;
}