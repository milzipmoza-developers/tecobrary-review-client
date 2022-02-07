export interface TecobraryHeaders {
  [key: string]: string
}

export const createHeaders = (token?: string, deviceId?: string) => {
  const headers: TecobraryHeaders = {}
  if (token) {
    headers["Authorization"] = `token ${token}`
  }
  if (deviceId) {
    headers["X-TECOBRARY-DEVICE-ID"] = deviceId
  }
  return headers
}