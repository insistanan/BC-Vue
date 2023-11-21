import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinerreportServetimeVO, DinerreportServetimeForm, DinerreportServetimeQuery } from '@/api/dinerreport/dinerreportServetime/types';

/**
 * 查询时段就餐统计列表
 * @param query
 * @returns {*}
 */

export const getreport = (query?: DinerreportServetimeQuery): AxiosPromise<DinerreportServetimeVO[]> => {
  return request({
    url: '/dinerreport/dinerreportServetime/report',
    method: 'get',
    params: query
  });
};

/**
 * 查询时段就餐统计详细
 * @param id
 */
export const getDinerreportServetime = (id: string | number): AxiosPromise<DinerreportServetimeVO> => {
  return request({
    url: '/dinerreport/dinerreportServetime/' + id,
    method: 'get'
  });
};

/**
 * 新增时段就餐统计
 * @param data
 */
export const addDinerreportServetime = (data: DinerreportServetimeForm) => {
  return request({
    url: '/dinerreport/dinerreportServetime',
    method: 'post',
    data: data
  });
};

/**
 * 修改时段就餐统计
 * @param data
 */
export const updateDinerreportServetime = (data: DinerreportServetimeForm) => {
  return request({
    url: '/dinerreport/dinerreportServetime',
    method: 'put',
    data: data
  });
};

/**
 * 删除时段就餐统计
 * @param id
 */
export const delDinerreportServetime = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinerreport/dinerreportServetime/' + id,
    method: 'delete'
  });
};
