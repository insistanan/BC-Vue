export interface MealdailymenuVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 菜品名称
   */
  foodName: string;

  /**
   * 菜品类型
   */
  foodtypeName: string;

  /**
   * 菜品价格
   */
  foodPrice: number;

  /**
   * 预设库存
   */
  stockNum: string;

  /**
   * 菜品图片
   */
  foodImg: string;

  /**
   * 用餐时段
   */
  foodGrounding: string;

  /**
   * 查询时间
   */
  searchTime: Date;

}

export interface MealdailymenuForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 菜品名称
   */
  foodName?: string;

  /**
   * 菜品类型
   */
  foodtypeName?: string;

  /**
   * 菜品价格
   */
  foodPrice?: number;

  /**
   * 预设库存
   */
  stockNum?: string;

  /**
   * 菜品图片
   */
  foodImg?: string;

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 查询时间
   */
  searchTime?: string;

}

export interface MealdailymenuQuery extends PageQuery {

  /**
   * 菜品名称
   */
  foodName?: string;

  /**
   * 菜品类型
   */
  foodtypeName?: string;

  /**
   * 菜品价格
   */
  foodPrice?: number;

  /**
   * 预设库存
   */
  stockNum?: string;

  /**
   * 菜品图片
   */
  foodImg?: string;

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 查询时间
   */
  searchTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



