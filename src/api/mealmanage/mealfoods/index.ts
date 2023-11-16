import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealfoodsVO, MealfoodsForm, MealfoodsQuery } from '@/api/mealmanage/mealfoods/types';

/**
 * 查询菜品列表
 * @param query
 * @returns {*}
 */

export const listMealfoods = (query?: MealfoodsQuery): AxiosPromise<MealfoodsVO[]> => {
  return request({
    url: '/mealmanage/mealfoods/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询菜品详细
 * @param id
 */
export const getMealfoods = (id: string | number): AxiosPromise<MealfoodsVO> => {
  return request({
    url: '/mealmanage/mealfoods/' + id,
    method: 'get'
  });
};

/**
 * 新增菜品
 * @param data
 */
export const addMealfoods = (data: MealfoodsForm) => {
  return request({
    url: '/mealmanage/mealfoods',
    method: 'post',
    data: data
  });
};

/**
 * 修改菜品
 * @param data
 */
export const updateMealfoods = (data: MealfoodsForm) => {
  return request({
    url: '/mealmanage/mealfoods',
    method: 'put',
    data: data
  });
};

/**
 * 删除菜品
 * @param id
 */
export const delMealfoods = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealfoods/' + id,
    method: 'delete'
  });
};
