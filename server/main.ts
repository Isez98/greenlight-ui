import { Application } from '@oak/oak/application'
import { Router } from '@oak/oak/router'
import { oakCors } from '@tajpouria/cors'
import path from 'node:path'
import routeStaticFilesFrom from './util/routeStaticFilesFrom.ts'
import fs from 'node:fs'

const __dirname = import.meta.dirname
const buildPath = path.join(__dirname, '../client/dist')
export const app = new Application()
const router = new Router()

app.use(
  oakCors({
    origin: 'https://greenlight.isez.dev',
  }),
)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(
  routeStaticFilesFrom([
    `${Deno.cwd()}/client/dist`,
    `${Deno.cwd()}/client/public`,
  ]),
)

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.request.path = '/'
  ctx.response.body = fs.readFileSync(`${buildPath}/index.html`)
})

if (import.meta.main) {
  console.log('Server listening on port http://localhost:3000')
  await app.listen({ port: 3000 })
}
