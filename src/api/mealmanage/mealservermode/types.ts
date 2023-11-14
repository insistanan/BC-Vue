export interface MealservermodeVO {
  /**
   * 1-自选开餐，2-每日开餐，3-周日不开餐，4-周一到周五开餐
   */
  serverMode: string;

  /**
   * 开餐时间，1-7代表周一到周日
   */
  serverDay: string;

  /**
   * 可提前报餐天数
   */
  earlyDay: number;

}

export interface MealservermodeForm extends BaseEntity {
  /**
   * 1-自选开餐，2-每日开餐，3-周日不开餐，4-周一到周五开餐
   */
  serverMode?: string;

  /**
   * 开餐时间，1-7代表周一到周日
   */
  serverDay?: string;

  /**
   * 可提前报餐天数
   */
  earlyDay?: number;

}

export interface MealservermodeQuery extends PageQuery {

    /**
     * 日期范围参数
     */
    params?: any;
}



