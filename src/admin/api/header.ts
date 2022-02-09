export interface TecobraryHeaders {
  [key: string]: string
}

export const headers = () => {
  const deviceId = localStorage.getItem("X-TECOBRARY-DEVICE-ID")
  const token = localStorage.getItem("X-TECOBRARY-AUTH-TOKEN")
  console.log(deviceId, token)
  return createHeaders(token, deviceId)
}

const createHeaders = (token: string | null, deviceId: string | null) => {
  const headers: TecobraryHeaders = {}
  if (token && token.length != 0) {
    headers["Authorization"] = `token ${token}`
  }
  if (deviceId && deviceId.length != 0) {
    headers["X-TECOBRARY-DEVICE-ID"] = deviceId
  }
  return headers
}