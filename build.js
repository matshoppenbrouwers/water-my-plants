import { build } from 'vite'

async function buildApp() {
  try {
    await build()
    console.log('build completed successfully')
  } catch (e) {
    console.error('build failed')
    console.error(e)
    process.exit(1)
  }
}

buildApp() 