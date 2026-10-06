import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve(process.argv[2] ?? '.')
const port = Number(process.env.PORT ?? 4173)
const host = process.env.HOST ?? '0.0.0.0'
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname)
  const requestedPath = pathname === '/' ? 'index.html' : pathname.slice(1)
  const filePath = resolve(join(root, normalize(requestedPath)))

  if (!filePath.startsWith(`${root}/`) && filePath !== root) {
    response.writeHead(403).end('Forbidden')
    return
  }

  try {
    const file = await stat(filePath)
    if (!file.isFile()) throw new Error('Not a file')
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream' })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
  }
}).listen(port, host, () => {
  console.log(`CRC Payroll is running at http://${host}:${port}`)
})
