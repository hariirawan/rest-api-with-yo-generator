import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Author } from '.'

const app = () => express(apiRoot, routes)

let author

beforeEach(async () => {
  author = await Author.create({})
})

test('POST /authors 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, userID: 'test', address: 'test', picture: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userID).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('POST /authors 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /authors 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /authors 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /authors/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${author.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(author.id)
})

test('GET /authors/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${author.id}`)
  expect(status).toBe(401)
})

test('GET /authors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /authors/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${author.id}`)
    .send({ access_token: masterKey, userID: 'test', address: 'test', picture: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(author.id)
  expect(body.userID).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('PUT /authors/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${author.id}`)
  expect(status).toBe(401)
})

test('PUT /authors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, userID: 'test', address: 'test', picture: 'test' })
  expect(status).toBe(404)
})

test('DELETE /authors/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${author.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /authors/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${author.id}`)
  expect(status).toBe(401)
})

test('DELETE /authors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
