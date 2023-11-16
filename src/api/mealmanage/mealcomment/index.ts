import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealcommentVO, MealcommentForm, MealcommentQuery } from '@/api/mealmanage/mealcomment/types';

/**
 * 查询评论列表
 * @param query
 * @returns {*}
 */

export const listMealcomment = (query?: MealcommentQuery): AxiosPromise<MealcommentVO[]> => {
  return request({
    url: '/mealmanage/mealcomment/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询评论详细
 * @param id
 */
export const getMealcomment = (id: string | number): AxiosPromise<MealcommentVO> => {
  return request({
    url: '/mealmanage/mealcomment/' + id,
    method: 'get'
  });
};

/**
 * 新增评论
 * @param data
 */
export const addMealcomment = (data: MealcommentForm) => {
  return request({
    url: '/mealmanage/mealcomment',
    method: 'post',
    data: data
  });
};

/**
 * 修改评论
 * @param data
 */
export const updateMealcomment = (data: MealcommentForm) => {
  return request({
    url: '/mealmanage/mealcomment',
    method: 'put',
    data: data
  });
};

/**
 * 删除评论
 * @param id
 */
export const delMealcomment = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealcomment/' + id,
    method: 'delete'
  });
};
