export interface MealkeywordVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 关键词
   */
  keywordName: string;

}

export interface MealkeywordForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 关键词
   */
  keywordName?: string;

}

export interface MealkeywordQuery extends PageQuery {

  /**
   * 关键词
   */
  keywordName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



