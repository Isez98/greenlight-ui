import { Application } from '@oak/oak/application'
import { Router } from '@oak/oak/router'
import { oakCors } from '@tajpouria/cors'
import * as path from 'jsr:@std/path'
import routeStaticFilesFrom from './util/routeStaticFilesFrom.ts'
const moduleDir = path.dirname(path.fromFileUrl(import.meta.url))

const publicDir = path.join(moduleDir, '../client/dist')

function getPublicFile(...filePath: string[]): Promise<Uint8Array> {
  return Deno.readFile(path.join(publicDir, ...filePath))
}

const router = new Router()

router.get('(.*)', async (ctx, next) => {
  ctx.response.body = await getPublicFile('/index.html')

  await next()
})

export const app = new Application()

app.use(
  oakCors({
    origin: 'http://localhost:3000',
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

if (import.meta.main) {
  console.log('Server listening on port http://localhost:3000')
  await app.listen({ port: 3000 })
}
