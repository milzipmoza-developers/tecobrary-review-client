export interface TecobraryHeaders {
  [key: string]: string
}

export const createHeaders = (token?: string, deviceId?: string) => {
  const headers: TecobraryHeaders = {}
  if (token && token.length != 0) {
    headers["Authorization"] = `token ${token}`
  }
  if (deviceId && deviceId.length != 0) {
    headers["X-TECOBRARY-DEVICE-ID"] = deviceId
  }
  return headers
}