import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
import { upload } from '../../services/upload';
export Article, { schema } from './model';

const router = new Router();
const { title, content, authorID, categoryID, slug, excerpt } = schema.tree;

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 master access only.
 */
router.post(
  '/',
  token({ required: true }),
  upload.single('picture'),
  body({ title, content, authorID, categoryID, slug, excerpt }),
  create
);

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of articles.
 * @apiSuccess {Object[]} rows List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', query(), index);

/**
 * @api {get} /articles/:id Retrieve article
 * @apiName RetrieveArticle
 * @apiGroup Article
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 master access only.
 */
router.put(
  '/:id',
  token({ required: true }),
  upload.single('picture'),
  body({ title, content, authorID, categoryID, slug, excerpt }),
  update
);

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', token({ required: true }), destroy);

export default router;
