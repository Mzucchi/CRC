import { cp, mkdir, rm } from 'node:fs/promises'

await rm('dist', { force: true, recursive: true })
await mkdir('dist')
await cp('index.html', 'dist/index.html')
await cp('src', 'dist/src', { recursive: true })

console.log('Built CRC Payroll in dist/')
