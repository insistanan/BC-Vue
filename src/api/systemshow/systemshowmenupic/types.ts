export interface SystemshowmenupicVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 图片地址
   */
  path: string;

}

export interface SystemshowmenupicForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 图片地址
   */
  path?: string;

}

export interface SystemshowmenupicQuery extends PageQuery {

  /**
   * 图片地址
   */
  path?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



