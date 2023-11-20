export interface MealstatisticVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 用餐时段
   */
  foodGrounding: string;

  /**
   * 部门。部门id
   */
  deptId: string | number;

  /**
   * 职务。职务id
   */
  jobId: string | number;

  /**
   * 餐品名称
   */
  foodName: string;

  /**
   * 报餐时间
   */
  bcTime: string;

}

export interface MealstatisticForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 部门。部门id
   */
  deptId?: string | number;

  /**
   * 职务。职务id
   */
  jobId?: string | number;

  /**
   * 餐品名称
   */
  foodName?: string;

  /**
   * 报餐时间
   */
  bcTime?: string;

}

export interface MealstatisticQuery extends PageQuery {

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 部门。部门id
   */
  deptId?: string | number;

  /**
   * 职务。职务id
   */
  jobId?: string | number;

  /**
   * 餐品名称
   */
  foodName?: string;

  /**
   * 报餐时间
   */
  bcTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



