export interface DinerreportServetimeVO {

  begindate?: any;

  enddate?: any;


}

export interface DinerreportServetimeForm extends BaseEntity {

  /**
   * 部门
   */
  deptName?: string;

  /**
   * 用餐时段
   */
  servetimeName?: string;

  /**
   * 已报餐数
   */
  dinertotalnum?: number;

  /**
   * 实际就餐数
   */
  usedinernum?: number;

  /**
   * 未实际就餐数
   */
  unusedinernum?: number;

}

export interface DinerreportServetimeQuery extends PageQuery {

  begindate?: any;

  enddate?: any;

    /**
     * 日期范围参数
     */
    params?: any;
}



