export interface DinerreportPersonVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 客户姓名
   */
  customerName: string;

  /**
   * 部门
   */
  deptName: string;

  /**
   * 职务
   */
  jobName: string;

  /**
   * 用餐时段
   */
  servetimeName: string;

  /**
   * 未实际就餐数
   */
  unusenum: number;

  /**
   * 时段未实际就餐数
   */
  singleunusenum: number;

}

export interface DinerreportPersonForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 客户姓名
   */
  customerName?: string;

  /**
   * 部门
   */
  deptName?: string;

  /**
   * 职务
   */
  jobName?: string;

  /**
   * 用餐时段
   */
  servetimeName?: string;

  /**
   * 未实际就餐数
   */
  unusenum?: number;

  /**
   * 时段未实际就餐数
   */
  singleunusenum?: number;

}

export interface DinerreportPersonQuery extends PageQuery {

  /**
   * 客户姓名
   */
  customerName?: string;

  /**
   * 部门
   */
  deptName?: string;

  /**
   * 职务
   */
  jobName?: string;

  /**
   * 用餐时段
   */
  servetimeName?: string;

  /**
   * 未实际就餐数
   */
  unusenum?: number;

  /**
   * 时段未实际就餐数
   */
  singleunusenum?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



