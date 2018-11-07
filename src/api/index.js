import { Router } from 'express';
import user from './user';
import auth from './auth';
import passwordReset from './password-reset';
import article from './article';
import author from './author';
import category from './category';

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/v1/users', user);
router.use('/v1/auth', auth);
router.use('/v1/password-resets', passwordReset);
router.use('/v1/articles', article);
router.use('/v1/authors', author);
router.use('/v1/categories', category);

export default router;
