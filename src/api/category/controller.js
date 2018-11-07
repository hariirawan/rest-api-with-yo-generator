import { success, notFound } from '../../services/response/';
import { Category } from '.';
import { code } from '../../services/code';

export const create = ({ bodymen: { body } }, res, next) =>
  Category.create(body)
    .then(category => {
      let response = {
        code: code.Created,
        status: 'SUCCESS',
        version: 'V1.0',
        rows: category
      };
      return response;
    })
    .then(success(res))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Category.count(query)
    .then(count =>
      Category.find(query, select, cursor).then(categories => ({
        code: code.Ok,
        status: 'SUCCESS',
        version: 'V1.0',
        count,
        rows: categories.map(category => category.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? category.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? Object.assign(category, body).save() : null))
    .then(category => (category ? category.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? category.remove() : null))
    .then(success(res, 204))
    .catch(next);
