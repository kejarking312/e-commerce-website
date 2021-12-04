

export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
  const config = {
    method,
    url: `/api${requestUrl}`,
    headers: { 
      'Content-Type': 'application/json',
    },
    data,
  }
  return config
}