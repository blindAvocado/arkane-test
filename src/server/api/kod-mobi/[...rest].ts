export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const targetUrl = `${config.kodMobiApi.baseUrl}${event.path.replace('/api/kod-mobi', '')}`

  return proxyRequest(event, targetUrl, {
    headers: {
      'x-api-key': config.kodMobiApi.token
    }
  })
})
