import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinerpersonVO, DinerpersonForm, DinerpersonQuery } from '@/api/dinermanage/dinerperson/types';

/**
 * 查询用餐人员信息列表
 * @param query
 * @returns {*}
 */

export const listDinerperson = (query?: DinerpersonQuery): AxiosPromise<DinerpersonVO[]> => {
  return request({
    url: '/dinermanage/dinerperson/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用餐人员信息详细
 * @param id
 */
export const getDinerperson = (id: string | number): AxiosPromise<DinerpersonVO> => {
  return request({
    url: '/dinermanage/dinerperson/' + id,
    method: 'get'
  });
};

/**
 * 新增用餐人员信息
 * @param data
 */
export const addDinerperson = (data: DinerpersonForm) => {
  return request({
    url: '/dinermanage/dinerperson',
    method: 'post',
    data: data
  });
};

/**
 * 修改用餐人员信息
 * @param data
 */
export const updateDinerperson = (data: DinerpersonForm) => {
  return request({
    url: '/dinermanage/dinerperson',
    method: 'put',
    data: data
  });
};

/**
 * 删除用餐人员信息
 * @param id
 */
export const delDinerperson = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinermanage/dinerperson/' + id,
    method: 'delete'
  });
};
