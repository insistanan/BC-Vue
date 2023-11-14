import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealservermodeVO, MealservermodeForm, MealservermodeQuery } from '@/api/mealmanage/mealservermode/types';

/**
 * 查询开餐模式信息列表
 * @param query
 * @returns {*}
 */

export const listMealservermode = (query?: MealservermodeQuery): AxiosPromise<MealservermodeVO[]> => {
  return request({
    url: '/mealmanage/mealservermode/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询开餐模式信息详细
 * @param id
 */
export const getMealservermode = (id: string | number): AxiosPromise<MealservermodeVO> => {
  return request({
    url: '/mealmanage/mealservermode/' + id,
    method: 'get'
  });
};

/**
 * 新增开餐模式信息
 * @param data
 */
export const addMealservermode = (data: MealservermodeForm) => {
  return request({
    url: '/mealmanage/mealservermode',
    method: 'post',
    data: data
  });
};

/**
 * 修改开餐模式信息
 * @param data
 */
export const updateMealservermode = (data: MealservermodeForm) => {
  return request({
    url: '/mealmanage/mealservermode',
    method: 'put',
    data: data
  });
};

/**
 * 删除开餐模式信息
 * @param id
 */
export const delMealservermode = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealservermode/' + id,
    method: 'delete'
  });
};
