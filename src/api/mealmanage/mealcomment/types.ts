export interface MealcommentVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 评论
   */
  comment: string;

  /**
   * 星级
   */
  score: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding: string;

  /**
   * 姓名
   */
  personName: string;

  /**
   * 部门
   */
  personDinerdeptid: string | number;

  /**
   * 职务
   */
  personDinerjobid: string | number;

  /**
   * 评论时间
   */
  commentTime: string;

}

export interface MealcommentForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 评论
   */
  comment?: string;

  /**
   * 星级
   */
  score?: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding?: string;

  /**
   * 姓名
   */
  personName?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

  /**
   * 评论时间
   */
  commentTime?: string;

}

export interface MealcommentQuery extends PageQuery {

  /**
   * 评论
   */
  comment?: string;

  /**
   * 星级
   */
  score?: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding?: string;

  /**
   * 姓名
   */
  personName?: string;

  /**
   * 部门
   */
  personDinerdeptid?: string | number;

  /**
   * 职务
   */
  personDinerjobid?: string | number;

  /**
   * 评论时间
   */
  commentTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



