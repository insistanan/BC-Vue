export interface MealfoodsVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 菜品名称
   */
  foodName: string;

  /**
   * 菜品价格
   */
  foodPrice: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding: string;

  /**
   * 菜品上架日期，1-7代表周一至周日
   */
  foodServerday: string;

  /**
   * 菜品类型
   */
  foodTypeid: string | number;

  /**
   * 是否自动上架，0-是，1-否
   */
  autoGrounding: string;

  /**
   * 限购份数
   */
  limitNum: number;

  /**
   * 预设库存
   */
  stockNum: string;

  /**
   * 第一份减免
   */
  firstReduce: string;

  /**
   * 菜品描述
   */
  explain: string;

  /**
   * 开放类型，0-指定部门开放，1-全部开放
   */
  openType: string;

  /**
   * 开放部门
   */
  enDept: string;

  /**
   * 开放职务
   */
  enJob: string;

  /**
   * 菜品图片
   */
  foodImg: string;

}

export interface MealfoodsForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 菜品名称
   */
  foodName?: string;

  /**
   * 菜品价格
   */
  foodPrice?: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding?: string;

  /**
   * 菜品上架日期，1-7代表周一至周日
   */
  foodServerday?: string;

  /**
   * 菜品类型
   */
  foodTypeid?: string | number;

  /**
   * 是否自动上架，0-是，1-否
   */
  autoGrounding?: string;

  /**
   * 限购份数
   */
  limitNum?: number;

  /**
   * 预设库存
   */
  stockNum?: string;

  /**
   * 第一份减免
   */
  firstReduce?: string;

  /**
   * 菜品描述
   */
  explain?: string;

  /**
   * 开放类型，0-指定部门开放，1-全部开放
   */
  openType?: string;

  /**
   * 开放部门
   */
  enDept?: string;

  /**
   * 开放职务
   */
  enJob?: string;

  /**
   * 菜品图片
   */
  foodImg?: string;

}

export interface MealfoodsQuery extends PageQuery {

  /**
   * 菜品名称
   */
  foodName?: string;

  /**
   * 菜品价格
   */
  foodPrice?: number;

  /**
   * 菜品上架时间段，1-早餐，2-午餐，3-晚餐
   */
  foodGrounding?: string;

  /**
   * 菜品上架日期，1-7代表周一至周日
   */
  foodServerday?: string;

  /**
   * 菜品类型
   */
  foodTypeid?: string | number;

  /**
   * 是否自动上架，0-是，1-否
   */
  autoGrounding?: string;

  /**
   * 限购份数
   */
  limitNum?: number;

  /**
   * 预设库存
   */
  stockNum?: string;

  /**
   * 第一份减免
   */
  firstReduce?: string;

  /**
   * 菜品描述
   */
  explain?: string;

  /**
   * 开放类型，0-指定部门开放，1-全部开放
   */
  openType?: string;

  /**
   * 开放部门
   */
  enDept?: string;

  /**
   * 开放职务
   */
  enJob?: string;

  /**
   * 菜品图片
   */
  foodImg?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



