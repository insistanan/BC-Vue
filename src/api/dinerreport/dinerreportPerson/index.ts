import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinerreportPersonVO, DinerreportPersonForm, DinerreportPersonQuery } from '@/api/dinerreport/dinerreportPerson/types';

/**
 * 查询未实际就餐统计列表
 * @param query
 * @returns {*}
 */

export const listDinerreportPerson = (query?: DinerreportPersonQuery): AxiosPromise<DinerreportPersonVO[]> => {
  return request({
    url: '/dinerreport/dinerreportPerson/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询未实际就餐统计详细
 * @param id
 */
export const getDinerreportPerson = (id: string | number): AxiosPromise<DinerreportPersonVO> => {
  return request({
    url: '/dinerreport/dinerreportPerson/' + id,
    method: 'get'
  });
};

/**
 * 新增未实际就餐统计
 * @param data
 */
export const addDinerreportPerson = (data: DinerreportPersonForm) => {
  return request({
    url: '/dinerreport/dinerreportPerson',
    method: 'post',
    data: data
  });
};

/**
 * 修改未实际就餐统计
 * @param data
 */
export const updateDinerreportPerson = (data: DinerreportPersonForm) => {
  return request({
    url: '/dinerreport/dinerreportPerson',
    method: 'put',
    data: data
  });
};

/**
 * 删除未实际就餐统计
 * @param id
 */
export const delDinerreportPerson = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinerreport/dinerreportPerson/' + id,
    method: 'delete'
  });
};
