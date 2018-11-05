import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Category } from '.'

const app = () => express(apiRoot, routes)

let category

beforeEach(async () => {
  category = await Category.create({})
})

test('POST /categories 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', desc: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
})

test('POST /categories 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /categories 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /categories 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /categories/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${category.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(category.id)
})

test('GET /categories/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${category.id}`)
  expect(status).toBe(401)
})

test('GET /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /categories/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${category.id}`)
    .send({ access_token: masterKey, name: 'test', desc: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(category.id)
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
})

test('PUT /categories/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${category.id}`)
  expect(status).toBe(401)
})

test('PUT /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', desc: 'test' })
  expect(status).toBe(404)
})

test('DELETE /categories/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${category.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /categories/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${category.id}`)
  expect(status).toBe(401)
})

test('DELETE /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
