/* car-eye车辆管理平台 
 * car-eye车辆管理公共平台   www.car-eye.cn
 * car-eye开源网址:  https://github.com/Car-eye-admin
 * Copyright car-eye 车辆管理平台  2017 
 */

package com.careye.dscomm.mq.utils;

import java.util.TimerTask;

import org.apache.log4j.Logger;

import com.careye.dscomm.mq.JmsCommReceiver;
import com.careye.dscomm.utlis.ExceptionUtil;

public class ClientMqReStartTimer extends TimerTask {
	private final static Logger logger = Logger.getLogger(ClientMqReStartTimer.class);
	@Override
	public void run() {
		
		try {
			logger.info("消息队列服务断开,系统自动进行连接");
			for (int i = 0; i < 5; i++) {
				JmsCommReceiver jms = new JmsCommReceiver();
				jms.start();
			}
		} catch (Exception e) {
			e.printStackTrace();
			ExceptionUtil.getInfo(e);
		}
		
	}
}
