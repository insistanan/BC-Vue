import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealforbiddayVO, MealforbiddayForm, MealforbiddayQuery } from '@/api/mealmanage/mealforbidday/types';

/**
 * 查询禁止用餐日期列表
 * @param query
 * @returns {*}
 */

export const listMealforbidday = (query?: MealforbiddayQuery): AxiosPromise<MealforbiddayVO[]> => {
  return request({
    url: '/mealmanage/mealforbidday/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询禁止用餐日期详细
 * @param id
 */
export const getMealforbidday = (id: string | number): AxiosPromise<MealforbiddayVO> => {
  return request({
    url: '/mealmanage/mealforbidday/' + id,
    method: 'get'
  });
};

/**
 * 新增禁止用餐日期
 * @param data
 */
export const addMealforbidday = (data: MealforbiddayForm) => {
  return request({
    url: '/mealmanage/mealforbidday',
    method: 'post',
    data: data
  });
};

/**
 * 修改禁止用餐日期
 * @param data
 */
export const updateMealforbidday = (data: MealforbiddayForm) => {
  return request({
    url: '/mealmanage/mealforbidday',
    method: 'put',
    data: data
  });
};

/**
 * 删除禁止用餐日期
 * @param id
 */
export const delMealforbidday = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealforbidday/' + id,
    method: 'delete'
  });
};
