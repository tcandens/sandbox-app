import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

export function runSubscriptionServer({ schema, port, path }) {
  const ws = createServer((req, res) => {
    res.writeHead(404)
    res.end()
  })
  ws.listen(port, () =>
    console.log(`GraphQL Subscription Server Running at 0.0.0:${port}/${path}`)
  )

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: ws,
      path,
    }
  )
}
