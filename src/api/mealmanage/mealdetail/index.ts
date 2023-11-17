import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealdetailVO, MealdetailForm, MealdetailQuery } from '@/api/mealmanage/mealdetail/types';

/**
 * 查询报餐明细列表
 * @param query
 * @returns {*}
 */

export const listMealdetail = (query?: MealdetailQuery): AxiosPromise<MealdetailVO[]> => {
  return request({
    url: '/mealmanage/mealdetail/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询报餐明细详细
 * @param id
 */
export const getMealdetail = (id: string | number): AxiosPromise<MealdetailVO> => {
  return request({
    url: '/mealmanage/mealdetail/' + id,
    method: 'get'
  });
};

/**
 * 新增报餐明细
 * @param data
 */
export const addMealdetail = (data: MealdetailForm) => {
  return request({
    url: '/mealmanage/mealdetail',
    method: 'post',
    data: data
  });
};

/**
 * 修改报餐明细
 * @param data
 */
export const updateMealdetail = (data: MealdetailForm) => {
  return request({
    url: '/mealmanage/mealdetail',
    method: 'put',
    data: data
  });
};

/**
 * 删除报餐明细
 * @param id
 */
export const delMealdetail = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealdetail/' + id,
    method: 'delete'
  });
};
