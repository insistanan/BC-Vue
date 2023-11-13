export interface DinernoreviewVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 部门名称
   */
  personName: string;

  /**
   * 手机号
   */
  personTel: string;

  /**
   * 部门
   */
  personDinerdeptid: string | number;

  /**
   * 职务
   */
  personDinerjobid: string | number;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

}

export interface DinernoreviewForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 部门名称
   */
  personName?: string;

  /**
   * 手机号
   */
  personTel?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

}

export interface DinernoreviewQuery extends PageQuery {

  /**
   * 部门名称
   */
  personName?: string;

  /**
   * 手机号
   */
  personTel?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



