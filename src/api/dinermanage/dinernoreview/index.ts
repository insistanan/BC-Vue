import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinernoreviewVO, DinernoreviewForm, DinernoreviewQuery } from '@/api/dinermanage/dinernoreview/types';

/**
 * 查询免审核人员列表
 * @param query
 * @returns {*}
 */

export const listDinernoreview = (query?: DinernoreviewQuery): AxiosPromise<DinernoreviewVO[]> => {
  return request({
    url: '/dinermanage/dinernoreview/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询免审核人员详细
 * @param id
 */
export const getDinernoreview = (id: string | number): AxiosPromise<DinernoreviewVO> => {
  return request({
    url: '/dinermanage/dinernoreview/' + id,
    method: 'get'
  });
};

/**
 * 新增免审核人员
 * @param data
 */
export const addDinernoreview = (data: DinernoreviewForm) => {
  return request({
    url: '/dinermanage/dinernoreview',
    method: 'post',
    data: data
  });
};

/**
 * 修改免审核人员
 * @param data
 */
export const updateDinernoreview = (data: DinernoreviewForm) => {
  return request({
    url: '/dinermanage/dinernoreview',
    method: 'put',
    data: data
  });
};

/**
 * 删除免审核人员
 * @param id
 */
export const delDinernoreview = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinermanage/dinernoreview/' + id,
    method: 'delete'
  });
};
