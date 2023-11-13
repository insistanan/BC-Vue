export interface DinerdeptVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 部门名称
   */
  deptName: string;

  /**
   * 显示顺序
   */
  orderNum: number;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

}

export interface DinerdeptForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

}

export interface DinerdeptQuery extends PageQuery {

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



