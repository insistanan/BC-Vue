export interface MealfoodtypeVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 菜品类型
   */
  foodtypeName: string;

}

export interface MealfoodtypeForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 菜品类型
   */
  foodtypeName?: string;

}

export interface MealfoodtypeQuery extends PageQuery {

  /**
   * 菜品类型
   */
  foodtypeName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



