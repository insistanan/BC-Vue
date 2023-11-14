export interface MealforbiddayVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 禁止用餐日期
   */
  forbidDate: string | number;

  /**
   * 类型
   */
  forbidType: string | number;

}

export interface MealforbiddayForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 禁止用餐日期
   */
  forbidDate?: string | number;

  /**
   * 类型
   */
  forbidType?: string | number;

}

export interface MealforbiddayQuery extends PageQuery {

  /**
   * 禁止用餐日期
   */
  forbidDate?: string | number;

  /**
   * 类型
   */
  forbidType?: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}



