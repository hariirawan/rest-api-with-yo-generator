import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Category, { schema } from './model';

const router = new Router();
const { name, desc } = schema.tree;

/**
 * @api {post} /categories Create category
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Category's name.
 * @apiParam desc Category's desc.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.post('/', token({ required: true }), body({ name, desc }), create);

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of categories.
 * @apiSuccess {Object[]} rows List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/', token({ required: true }), query(), index);

/**
 * @api {get} /categories/:id Retrieve category
 * @apiName RetrieveCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /categories/:id Update category
 * @apiName UpdateCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Category's name.
 * @apiParam desc Category's desc.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.put('/:id', token({ required: true }), body({ name, desc }), update);

/**
 * @api {delete} /categories/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', token({ required: true }), destroy);

export default router;
