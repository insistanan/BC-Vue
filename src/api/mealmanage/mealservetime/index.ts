import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealservetimeVO, MealservetimeForm, MealservetimeQuery } from '@/api/mealmanage/mealservetime/types';

/**
 * 查询用餐时段列表
 * @param query
 * @returns {*}
 */

export const listMealservetime = (query?: MealservetimeQuery): AxiosPromise<MealservetimeVO[]> => {
  return request({
    url: '/mealmanage/mealservetime/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用餐时段详细
 * @param id
 */
export const getMealservetime = (id: string | number): AxiosPromise<MealservetimeVO> => {
  return request({
    url: '/mealmanage/mealservetime/' + id,
    method: 'get'
  });
};

/**
 * 新增用餐时段
 * @param data
 */
export const addMealservetime = (data: MealservetimeForm) => {
  return request({
    url: '/mealmanage/mealservetime',
    method: 'post',
    data: data
  });
};

/**
 * 修改用餐时段
 * @param data
 */
export const updateMealservetime = (data: MealservetimeForm) => {
  return request({
    url: '/mealmanage/mealservetime',
    method: 'put',
    data: data
  });
};

/**
 * 删除用餐时段
 * @param id
 */
export const delMealservetime = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealservetime/' + id,
    method: 'delete'
  });
};
