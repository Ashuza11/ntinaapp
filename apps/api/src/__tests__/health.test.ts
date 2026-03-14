import app from '../app'

describe('Health Check', () => {
  afterAll(async () => {
    await app.close()
  })

  it('GET /health returns 200 with ok status', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({ status: 'ok', service: 'ntina-api' })
  })
})
