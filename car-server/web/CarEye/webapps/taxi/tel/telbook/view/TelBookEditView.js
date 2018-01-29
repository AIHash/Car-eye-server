Ext.define('TelBookApp.view.TelBookEditView', {
	extend : 'Ext.window.Window',
	alias : 'widget.telbookEditView',
	title : '编辑电话本',
    width : 300,
	layout : 'fit',
	animCollapse:false,
	constrain : true,  //true则强制此window控制在viewport，默认为false
	constrainHeader : true,
	maximizable : false,
	minimizable : false,
	modal : true,  //modal:true为模式窗口，后面的内容都不能操作，默认为false
	border : false,
	closeAction : 'destroy',
	
	items :[ {
		xtype : 'form',
		frame : true,
		anchor : '100%',
		collapsible : false,
		buttonAlign : 'right',
		fieldDefaults: {
	        labelAlign: 'right',
	        labelWidth: 60
	    },
		layout : 'form',
		items : [
		                     {
								xtype : 'hidden',
								id : 'id',
								name:'telBookSystem.id'
							},
							 {
								xtype : 'textfield',
								fieldLabel : '<font color="red">*</font>联系人',
								name : 'telBookSystem.contacts',
								anchor : '100%',
								itemId : 'contacts',
								id : 'contacts',
								cls : 'x-textfield',
								allowBlank : false,
								blankText : '不能为空'
					         },
					         {
								xtype : 'textfield',
								fieldLabel : '<font color="red">*</font>电话号码',
								name : 'telBookSystem.tel',
								anchor : '100%',
								itemId : 'tel',
								id : 'tel',
								cls : 'x-textfield',
						    	regex : /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
								regexText : '格式：3-4位区号，7-8位直播号码，1－4位分机号',
								allowBlank : false,
								blankText : '不能为空'
					         },
					        {
								xtype : 'combo',
								fieldLabel : '<font color="red">*</font>呼叫类型',
								itemId : 'calltype',
								id : 'calltype',
								name : 'telBookSystem.calltype',
								anchor : '100%',
								store : 'CallTypeStore',
								editable: false,
								allowBlank : false,
								blankText : '不能为空',
								valueField : 'id',
								displayField : 'calltype',
								cls : 'x-textfield'
							},
							{
								xtype : 'textarea',
								fieldLabel : '备注',
								name : 'telBookSystem.remark',
								rows :4,
								anchor : '100%',
								itemId : 'remark',
								id : 'remark',
								cls : 'x-textfield'
					         }
					 ]
}],
	buttons: [{
		text: '修改',
		action: 'save'
	},{
		text: '取消',
		handler: function(btn){
			btn.up('window').close();
		}
	}]
});