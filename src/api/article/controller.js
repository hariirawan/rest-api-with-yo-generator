import { success, notFound } from '../../services/response/';
import { Article } from '.';
import { code } from '../../services/code';
export const create = ({ bodymen: { body }, file }, res, next) => {
  body.picture = file.path;

  Article.create(body)
    .then(article => {
      const { id, title, authorID, categoryID, slug, picture } = article;
      let response = {
        code: code.Created,
        status: 'SUCCESS',
        version: 'V1.0',
        rows: {
          id,
          title,
          authorID,
          categoryID,
          slug,
          picture,
          request: {
            type: 'GET',
            url: `http://127.0.0.1/v1/articles/${id}`
          }
        }
      };
      return response;
    })
    .then(success(res, 201))
    .catch(next);
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Article.count(query)
    .then(count =>
      Article.find(query, select, cursor).then(articles => ({
        code: code.Ok,
        status: 'SUCCESS',
        version: 'v1.0',
        count,
        rows: articles.map(article => {
          const { id, title, authorID, categoryID, slug, picture } = article;
          let response = {
            id,
            title,
            authorID,
            categoryID,
            slug,
            picture,
            request: {
              type: 'GET',
              url: `http://127.0.0.1/v1/articles/${id}`
            }
          };
          return response;
        })
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then(article => (article ? article.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) => {
  Article.findById(params.id)
    .then(notFound(res))
    .then(article => (article ? Object.assign(article, body).save() : null))
    .then(article => (article ? article.view(true) : null))
    .then(success(res))
    .catch(next);
};

export const destroy = ({ params }, res, next) =>
  Article.findById(params.id)
    .select('title content id')
    .then(notFound(res))
    .then(article => {
      let response = {
        code: code.Ok,
        status: 'SUCCESS',
        version: 'V1.0',
        rows: article
      };
      return response;
    })
    .then(success(res))
    .catch(next);
