import { success, notFound } from '../../services/response/'
import { Author } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Author.create(body)
    .then((author) => author.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Author.find(query, select, cursor)
    .then((authors) => authors.map((author) => author.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Author.findById(params.id)
    .then(notFound(res))
    .then((author) => author ? author.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Author.findById(params.id)
    .then(notFound(res))
    .then((author) => author ? Object.assign(author, body).save() : null)
    .then((author) => author ? author.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Author.findById(params.id)
    .then(notFound(res))
    .then((author) => author ? author.remove() : null)
    .then(success(res, 204))
    .catch(next)
