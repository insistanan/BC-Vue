import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealdailymenuVO, MealdailymenuForm, MealdailymenuQuery } from '@/api/mealmanage/mealdailymenu/types';

/**
 * 查询每日菜谱列表
 * @param query
 * @returns {*}
 */

export const listMealdailymenu = (query?: MealdailymenuQuery): AxiosPromise<MealdailymenuVO[]> => {
  return request({
    url: '/mealmanage/mealdailymenu/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询每日菜谱详细
 * @param id
 */
export const getMealdailymenu = (id: string | number): AxiosPromise<MealdailymenuVO> => {
  return request({
    url: '/mealmanage/mealdailymenu/' + id,
    method: 'get'
  });
};

/**
 * 新增每日菜谱
 * @param data
 */
export const addMealdailymenu = (data: MealdailymenuForm) => {
  return request({
    url: '/mealmanage/mealdailymenu',
    method: 'post',
    data: data
  });
};

/**
 * 修改每日菜谱
 * @param data
 */
export const updateMealdailymenu = (data: MealdailymenuForm) => {
  return request({
    url: '/mealmanage/mealdailymenu',
    method: 'put',
    data: data
  });
};

/**
 * 删除每日菜谱
 * @param id
 */
export const delMealdailymenu = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealdailymenu/' + id,
    method: 'delete'
  });
};
