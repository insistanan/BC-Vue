export interface SystemshownoticeVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 公告名称
   */
  noticeName: string;

  /**
   * 公告顺序
   */
  noticeSort: number;

  /**
   * 公告装填（0-有效，1-失效）
   */
  noticeStatus: string;

  /**
   * 公告内容
   */
  noticeContent: string;

}

export interface SystemshownoticeForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 公告名称
   */
  noticeName?: string;

  /**
   * 公告顺序
   */
  noticeSort?: number;

  /**
   * 公告装填（0-有效，1-失效）
   */
  noticeStatus?: string;

  /**
   * 公告内容
   */
  noticeContent?: string;

}

export interface SystemshownoticeQuery extends PageQuery {

  /**
   * 公告名称
   */
  noticeName?: string;

  /**
   * 公告顺序
   */
  noticeSort?: number;

  /**
   * 公告装填（0-有效，1-失效）
   */
  noticeStatus?: string;

  /**
   * 公告内容
   */
  noticeContent?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



