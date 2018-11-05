import { Author } from '.'

let author

beforeEach(async () => {
  author = await Author.create({ userID: 'test', address: 'test', picture: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = author.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(author.id)
    expect(view.userID).toBe(author.userID)
    expect(view.address).toBe(author.address)
    expect(view.picture).toBe(author.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = author.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(author.id)
    expect(view.userID).toBe(author.userID)
    expect(view.address).toBe(author.address)
    expect(view.picture).toBe(author.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
