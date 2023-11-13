import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinerdeptVO, DinerdeptForm, DinerdeptQuery } from '@/api/dinermanage/dinerdept/types';

/**
 * 查询用餐人员部门列表
 * @param query
 * @returns {*}
 */


export const listDinerdept = (query?: DinerdeptQuery): AxiosPromise<DinerdeptVO[]> => {
  return request({
    url: '/dinermanage/dinerdept/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用餐人员部门详细
 * @param id
 */
export const getDinerdept = (id: string | number): AxiosPromise<DinerdeptVO> => {
  return request({
    url: '/dinermanage/dinerdept/' + id,
    method: 'get'
  });
};

/**
 * 新增用餐人员部门
 * @param data
 */
export const addDinerdept = (data: DinerdeptForm) => {
  return request({
    url: '/dinermanage/dinerdept',
    method: 'post',
    data: data
  });
};

/**
 * 修改用餐人员部门
 * @param data
 */
export const updateDinerdept = (data: DinerdeptForm) => {
  return request({
    url: '/dinermanage/dinerdept',
    method: 'put',
    data: data
  });
};

/**
 * 删除用餐人员部门
 * @param id
 */
export const delDinerdept = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinermanage/dinerdept/' + id,
    method: 'delete'
  });
};
