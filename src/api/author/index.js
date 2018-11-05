import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Author, { schema } from './model'

const router = new Router()
const { userID, address, picture } = schema.tree

/**
 * @api {post} /authors Create author
 * @apiName CreateAuthor
 * @apiGroup Author
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userID Author's userID.
 * @apiParam address Author's address.
 * @apiParam picture Author's picture.
 * @apiSuccess {Object} author Author's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Author not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ userID, address, picture }),
  create)

/**
 * @api {get} /authors Retrieve authors
 * @apiName RetrieveAuthors
 * @apiGroup Author
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} authors List of authors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /authors/:id Retrieve author
 * @apiName RetrieveAuthor
 * @apiGroup Author
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} author Author's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Author not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /authors/:id Update author
 * @apiName UpdateAuthor
 * @apiGroup Author
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userID Author's userID.
 * @apiParam address Author's address.
 * @apiParam picture Author's picture.
 * @apiSuccess {Object} author Author's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Author not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ userID, address, picture }),
  update)

/**
 * @api {delete} /authors/:id Delete author
 * @apiName DeleteAuthor
 * @apiGroup Author
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Author not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
