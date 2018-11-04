import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Article } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, article

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  article = await Article.create({})
})

test('POST /articles 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('POST /articles 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /articles 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /articles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /articles 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /articles 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /articles/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${article.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
})

test('GET /articles/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${article.id}`)
  expect(status).toBe(401)
})

test('GET /articles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /articles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${article.id}`)
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('PUT /articles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${article.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /articles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${article.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /articles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${article.id}`)
  expect(status).toBe(401)
})

test('PUT /articles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(404)
})

test('DELETE /articles/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /articles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /articles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /articles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
  expect(status).toBe(401)
})

test('DELETE /articles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
