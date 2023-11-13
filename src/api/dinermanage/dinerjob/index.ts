import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DinerjobVO, DinerjobForm, DinerjobQuery } from '@/api/dinermanage/dinerjob/types';

/**
 * 查询职务设置列表
 * @param query
 * @returns {*}
 */

export const listDinerjob = (query?: DinerjobQuery): AxiosPromise<DinerjobVO[]> => {
  return request({
    url: '/dinermanage/dinerjob/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询职务设置详细
 * @param id
 */
export const getDinerjob = (id: string | number): AxiosPromise<DinerjobVO> => {
  return request({
    url: '/dinermanage/dinerjob/' + id,
    method: 'get'
  });
};

/**
 * 新增职务设置
 * @param data
 */
export const addDinerjob = (data: DinerjobForm) => {
  return request({
    url: '/dinermanage/dinerjob',
    method: 'post',
    data: data
  });
};

/**
 * 修改职务设置
 * @param data
 */
export const updateDinerjob = (data: DinerjobForm) => {
  return request({
    url: '/dinermanage/dinerjob',
    method: 'put',
    data: data
  });
};

/**
 * 删除职务设置
 * @param id
 */
export const delDinerjob = (id: string | number | Array<string | number>) => {
  return request({
    url: '/dinermanage/dinerjob/' + id,
    method: 'delete'
  });
};
