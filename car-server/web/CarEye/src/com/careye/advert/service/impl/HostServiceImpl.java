/**
 * 
 */
package com.careye.advert.service.impl;

import java.util.List;
import java.util.Map;

import com.careye.advert.domain.AdvertCon;
import com.careye.advert.domain.AdvertPos;
import com.careye.advert.domain.AdvertType;
import com.careye.advert.domain.AdvertVer;
import com.careye.advert.service.HostService;
import com.careye.base.service.GenericService;
import com.careye.constant.Constant;
import com.careye.utils.DateUtil;

/**
 * @author Administrator
 *
 */
public class HostServiceImpl extends GenericService implements HostService{
	

	/**
	 * getAdvertPosList
	 * 广告版本分页查询列表
	 */
	public Map getAdvertVerList(Integer currentPage, Integer everyPage,
			AdvertVer advertVer) {
		// TODO Auto-generated method stub
		advertVer.setPositionid(Constant.HOSTADV);
		return this.baseDao.findPageList("oracle-advertManageSQL.getAdvertVerList",
				"oracle-advertManageSQL.getAdvertVerListCount", advertVer,currentPage,everyPage);
	}

	
	
	/**
	 * getTypeList   类型下拉列表
	 */
	public List<AdvertType> getTypeList() {
		// TODO Auto-generated method stub
		return this.baseDao.queryForList("oracle-advertManageSQL.getTypeList");
	}
	
	
	
	
	/**
	* 版本是否存在
	*/
	public Integer verIsExist(AdvertVer advertVer) {
		// TODO Auto-generated method stub
		advertVer.setPositionid(Constant.HOSTADV);
		return (Integer)this.baseDao.queryForObject("oracle-advertManageSQL.verIsExist",advertVer);
	}
	/**
	* 版本是否存在
	*/
	public Integer veridIsExist(AdvertVer advertVer) {
		// TODO Auto-generated method stub
		advertVer.setPositionid(Constant.HOSTADV);
		return (Integer)this.baseDao.queryForObject("oracle-advertManageSQL.veridIsExist",advertVer);
	}

	/**
	* 修改版本
	*/
	public int updateVer(AdvertVer advertVer) {
		// TODO Auto-generated method stub
		return this.baseDao.update("oracle-advertManageSQL.updateVer",advertVer);
	}
	/**
	* 增加版本
	*/
	public int addVer(AdvertVer advertVer) {
		// TODO Auto-generated method stub
		String current_time=DateUtil.getSQLDate();
		advertVer.setCreatetime(current_time);
		advertVer.setReltime(current_time);
		advertVer.setAuditstatus(0);
		advertVer.setOnstatus(1);
		advertVer.setPositionid(Constant.HOSTADV);
		return this.baseDao.save("oracle-advertManageSQL.saveVer", advertVer);
	}
	
	/**
	 * 是否被使用
	 */
	public int queryVer(int id) {
		// TODO Auto-generated method stub
		return (Integer)this.baseDao.queryForObject("oracle-advertManageSQL.queryVer",id);
	}
	
	/**
	 * 删除版本
	 */
	public int deleteVer(int id) {
		// TODO Auto-generated method stub
		return this.baseDao.delete("oracle-advertManageSQL.deleteVer", id);
	}

	/**
	 * exportVer
	 * 导出版本
	 */
	public List<AdvertVer> exportVer(AdvertVer advertVer) {
		// TODO Auto-generated method stub
		advertVer.setPositionid(Constant.HOSTADV);
		return this.baseDao.queryForList("oracle-advertManageSQL.getAdvertVerList", advertVer);
	}

	/**
	 * saveAuditVer
	 * 审核版本
	 */
	public int saveAuditVer(AdvertVer advertVer) {
		String current_time=DateUtil.getSQLDate();
		advertVer.setAudittime(current_time);
		return this.baseDao.update("oracle-advertManageSQL.saveAuditVer",advertVer);
	}
	/**
	 * 上架版本
	 */
	public int activeVer(int id){
		return this.baseDao.update("oracle-advertManageSQL.activeVer", id);
	}
	
	/**
	 * 下架版本
	 */
	public int inactiveVer(int id){
		return this.baseDao.update("oracle-advertManageSQL.inactiveVer", id);
	}

	
	
	
	
	
	
	
	/**
	 * getAdvertConList
	 * 广告内容分页显示查询列表
	 */
	public Map getAdvertConList(Integer currentPage, Integer everyPage,
			AdvertCon advertCon) {
		// TODO Auto-generated method stub
		advertCon.setPositionid(Constant.HOSTADV);
		return this.baseDao.findPageList("oracle-advertManageSQL.getAdvertConList",
				"oracle-advertManageSQL.getAdvertConListCount", advertCon,currentPage,everyPage);
	}
	
	/**
	* 内容是否存在
	*/
	public Integer conIsExist(AdvertCon advertCon) {
		// TODO Auto-generated method stub
		advertCon.setPositionid(Constant.HOSTADV);
		return (Integer)this.baseDao.queryForObject("oracle-advertManageSQL.conIsExist",advertCon);
	}

	/**
	* 修改内容
	*/
	public int updateCon(AdvertCon advertCon) {
		// TODO Auto-generated method stub
		return this.baseDao.update("oracle-advertManageSQL.updateCon",advertCon);
	}
	/**
	* 增加内容
	*/
	public int addCon(AdvertCon advertCon) {
		// TODO Auto-generated method stub
		String current_time=DateUtil.getSQLDate();
		advertCon.setCreatetime(current_time);
		advertCon.setReltime(current_time);
		advertCon.setPositionid(Constant.HOSTADV);
		return this.baseDao.save("oracle-advertManageSQL.saveCon", advertCon);
	}
	/**
	 * deleteCon删除内容
	 */
	public int deleteCon(int id) {
		// TODO Auto-generated method stub
		return this.baseDao.delete("oracle-advertManageSQL.deleteCon", id);
	}

	/**
	 * 获取已存在的广告序号   
	 */
	public int selconnumber(int pid) {
		// TODO Auto-generated method stub
		return (Integer)this.baseDao.queryForObject("oracle-advertManageSQL.selconnumber",pid);
	}
	
}
