import createClient from 'openapi-fetch'

import type { paths } from './api'

const baseUrl = process.env.API_URL ?? ''
const client = createClient<paths>({ baseUrl })
export default client
