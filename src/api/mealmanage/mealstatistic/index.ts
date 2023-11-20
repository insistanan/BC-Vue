import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealstatisticVO, MealstatisticForm, MealstatisticQuery } from '@/api/mealmanage/mealstatistic/types';

/**
 * 查询报餐统计列表
 * @param query
 * @returns {*}
 */

export const listMealstatistic = (query?: MealstatisticQuery): AxiosPromise<MealstatisticVO[]> => {
  return request({
    url: '/mealmanage/mealstatistic/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询报餐统计详细
 * @param id
 */
export const getMealstatistic = (id: string | number): AxiosPromise<MealstatisticVO> => {
  return request({
    url: '/mealmanage/mealstatistic/' + id,
    method: 'get'
  });
};

/**
 * 新增报餐统计
 * @param data
 */
export const addMealstatistic = (data: MealstatisticForm) => {
  return request({
    url: '/mealmanage/mealstatistic',
    method: 'post',
    data: data
  });
};

/**
 * 修改报餐统计
 * @param data
 */
export const updateMealstatistic = (data: MealstatisticForm) => {
  return request({
    url: '/mealmanage/mealstatistic',
    method: 'put',
    data: data
  });
};

/**
 * 删除报餐统计
 * @param id
 */
export const delMealstatistic = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealstatistic/' + id,
    method: 'delete'
  });
};
