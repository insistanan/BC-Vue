export interface DinerpersonVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 工号
   */
  personCode: string;

  /**
   * 昵称
   */
  personName: string;

  /**
   * 手机号
   */
  personTel: string;

  /**
   * 职工卡号
   */
  personCardno: string;

  /**
   * 部门
   */
  personDinerdeptid: string | number;

  /**
   * 职务
   */
  personDinerjobid: string | number;

  /**
   * 头像
   */
  personHeadimg: number;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

}

export interface DinerpersonForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 工号
   */
  personCode?: string;

  /**
   * 昵称
   */
  personName?: string;

  /**
   * 手机号
   */
  personTel?: string;

  /**
   * 职工卡号
   */
  personCardno?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

  /**
   * 头像
   */
  personHeadimg?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

}

export interface DinerpersonQuery extends PageQuery {

  /**
   * 工号
   */
  personCode?: string;

  /**
   * 昵称
   */
  personName?: string;

  /**
   * 手机号
   */
  personTel?: string;

  /**
   * 职工卡号
   */
  personCardno?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

  /**
   * 头像
   */
  personHeadimg?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



