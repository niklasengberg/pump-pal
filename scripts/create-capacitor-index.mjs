import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const target = resolve(process.cwd(), 'dist/client/index.html')

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PodTracker</title>
    <script type="module" src="/assets/index-BAzSMz50.js"></script>
    <link rel="stylesheet" href="/assets/styles-3yQSGit_.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`

await mkdir(dirname(target), { recursive: true })
await writeFile(target, html, 'utf8')

console.log(`Created ${target}`)