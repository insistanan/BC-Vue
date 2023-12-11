export interface MealservetimeVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 标题
   */
  servetimeName: string;

  /**
   * 时段可报份数
   */
  servetimeNum: number;

  /**
   * 状态，0-开启，1关闭
   */
  servetimeStatus: string;

  /**
   * 开始时间
   */
  servetimeBeginHour: string;
  servetimeBeginMin: string;

  servetimeEndHour: string;
  /**
   * 结束时间
   */
  servetimeEndMin: string;

  /**
   * 报餐提醒状态，0-开启，1关闭
   */
  servetimeRemindstatus: string;

  /**
   * 报餐提醒时间
   */
  servetimeRemind: string;

  /**
   * 报餐截止天数
   */
  servetimeRepotrendday: string;

  /**
   * 报餐截止时间
   */
  servetimeRepotrendtimeHour: string;
  servetimeRepotrendtimeMin?: string;

}

export interface MealservetimeForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 标题
   */
  servetimeName?: string;

  /**
   * 时段可报份数
   */
  servetimeNum?: number;

  /**
   * 状态，0-开启，1关闭
   */
  servetimeStatus?: string;

  /**
   * 开始时间
   */
  servetimeBeginHour?: string;
  /**
   * 开始时间
   */
  servetimeBeginMin?: string;

  /**
   * 结束时间
   */
  servetimeEndHour?: string;
  /**
   * 结束时间
   */
  servetimeEndMin?: string;

  /**
   * 报餐提醒状态，0-开启，1关闭
   */
  servetimeRemindstatus?: string;

  /**
   * 报餐提醒时间
   */
  servetimeRemind?: string;

  /**
   * 报餐截止天数
   */
  servetimeRepotrendday?: string;

  /**
   * 报餐截止时间
   */
  servetimeRepotrendtimeHour?: string;
  servetimeRepotrendtimeMin?: string;
}

export interface MealservetimeQuery extends PageQuery {

  /**
   * 标题
   */
  servetimeName?: string;

  /**
   * 时段可报份数
   */
  servetimeNum?: number;

  /**
   * 状态，0-开启，1关闭
   */
  servetimeStatus?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



