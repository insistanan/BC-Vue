import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealfoodtypeVO, MealfoodtypeForm, MealfoodtypeQuery } from '@/api/mealmanage/mealfoodtype/types';

/**
 * 查询菜品类型列表
 * @param query
 * @returns {*}
 */

export const listMealfoodtype = (query?: MealfoodtypeQuery): AxiosPromise<MealfoodtypeVO[]> => {
  return request({
    url: '/mealmanage/mealfoodtype/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询菜品类型详细
 * @param id
 */
export const getMealfoodtype = (id: string | number): AxiosPromise<MealfoodtypeVO> => {
  return request({
    url: '/mealmanage/mealfoodtype/' + id,
    method: 'get'
  });
};

/**
 * 新增菜品类型
 * @param data
 */
export const addMealfoodtype = (data: MealfoodtypeForm) => {
  return request({
    url: '/mealmanage/mealfoodtype',
    method: 'post',
    data: data
  });
};

/**
 * 修改菜品类型
 * @param data
 */
export const updateMealfoodtype = (data: MealfoodtypeForm) => {
  return request({
    url: '/mealmanage/mealfoodtype',
    method: 'put',
    data: data
  });
};

/**
 * 删除菜品类型
 * @param id
 */
export const delMealfoodtype = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealfoodtype/' + id,
    method: 'delete'
  });
};
