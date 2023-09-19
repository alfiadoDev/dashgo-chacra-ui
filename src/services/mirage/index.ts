import { Factory, Model, createServer } from 'miragejs'
import { faker } from '@faker-js/faker'

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

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent({ days: 10 })
        }
      })
    },

    seeds(server) {
      server.createList('user', 200)
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
