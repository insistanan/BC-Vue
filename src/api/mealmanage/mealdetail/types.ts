export interface MealdetailVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 用餐时段
   */
  foodGrounding: string;

  /**
   * 部门。部门id
   */
  deptId: string | number;

  /**
   * 职务。职务id
   */
  jobId: string | number;

  /**
   * 用餐类型
   */
  foodTypeid: string | number;

  /**
   * 订单明细
   */
  orderId: string | number;

  /**
   * 金额
   */
  sumPrice: number;

  /**
   * 订餐人姓名
   */
  customerName: string;

  /**
   * 订餐人联系电话
   */
  customerPhone: string;

  /**
   * 用餐日期
   */
  dinnerTime: string;

  /**
   * 用餐状态(0待用餐，1已用餐，2退款，3其他)
   */
  dinnerStatus: string;

  /**
   * 验证方式
   */
  authType: string;

  /**
   * 报餐时间
   */
  bcTime: string;

  /**
   * 核销时间
   */
  verificationTime: string;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

}

export interface MealdetailForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 部门。部门id
   */
  deptId?: string | number;

  /**
   * 职务。职务id
   */
  jobId?: string | number;

  /**
   * 用餐类型
   */
  foodTypeid?: string | number;

  /**
   * 订单明细
   */
  orderId?: string | number;

  /**
   * 金额
   */
  sumPrice?: number;

  /**
   * 订餐人姓名
   */
  customerName?: string;

  /**
   * 订餐人联系电话
   */
  customerPhone?: string;

  /**
   * 用餐日期
   */
  dinnerTime?: string;

  /**
   * 用餐状态(0待用餐，1已用餐，2退款，3其他)
   */
  dinnerStatus?: string;

  /**
   * 验证方式
   */
  authType?: string;

  /**
   * 报餐时间
   */
  bcTime?: string;

  /**
   * 核销时间
   */
  verificationTime?: string;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

}

export interface MealdetailQuery extends PageQuery {

  /**
   * 用餐时段
   */
  foodGrounding?: string;

  /**
   * 部门。部门id
   */
  deptId?: string | number;

  /**
   * 职务。职务id
   */
  jobId?: string | number;

  /**
   * 用餐类型
   */
  foodTypeid?: string | number;

  /**
   * 订单明细
   */
  orderId?: string | number;

  /**
   * 金额
   */
  sumPrice?: number;

  /**
   * 订餐人姓名
   */
  customerName?: string;

  /**
   * 订餐人联系电话
   */
  customerPhone?: string;

  /**
   * 用餐日期
   */
  dinnerTime?: string;

  /**
   * 用餐状态(0待用餐，1已用餐，2退款，3其他)
   */
  dinnerStatus?: string;

  /**
   * 验证方式
   */
  authType?: string;

  /**
   * 报餐时间
   */
  bcTime?: string;

  /**
   * 核销时间
   */
  verificationTime?: string;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



