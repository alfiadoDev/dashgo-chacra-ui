import { Model, createServer } from 'miragejs'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750;

      this.get('/users')
      this.post('/users')

      this.namespace = ''; // resetar o namespace para nao atrapalhar com as routas de api do nextjs
      this.passthrough()
    }
  })

  return server;
}
