export interface SystemshowslideVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 标题
   */
  title: string;

  /**
   * 图片地址
   */
  path: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * 状态，0-有效，1-失效
   */
  status: string;

}

export interface SystemshowslideForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 标题
   */
  title?: string;

  /**
   * 图片地址
   */
  path?: string;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 状态，0-有效，1-失效
   */
  status?: string;

}

export interface SystemshowslideQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 图片地址
   */
  path?: string;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 状态，0-有效，1-失效
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



