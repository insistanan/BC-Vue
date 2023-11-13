export interface DinerjobVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 职位名称
   */
  jobName: string;

  /**
   * 显示顺序
   */
  orderNum: number;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

}

export interface DinerjobForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 职位名称
   */
  jobName?: string;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

}

export interface DinerjobQuery extends PageQuery {

  /**
   * 职位名称
   */
  jobName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



