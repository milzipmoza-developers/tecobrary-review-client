export function requestTemplate(request: RequestAction): void {
  const {doOnSuccess, doOnAuthError, doOn400Errors, doOn500Errors, doErrors} = request

  try {
    doOnSuccess()
  } catch (e) {
    if (e.response && e.response.status == 401) {
      if (doOnAuthError) {
        doOnAuthError(e)
      }
      return
    }

    if (e.response && (400 <= e.response.status && e.response.status < 500)) {
      if (doOn400Errors) {
        doOn400Errors(e)
      }
      return
    }

    if (e.response && (500 <= e.response.status && e.response.status < 600)) {
      if (doOn500Errors) {
        doOn500Errors(e)
      }
      return
    }

    if (doErrors) {
      doErrors(e)
    }
    return;
  }
}

export interface RequestAction {
  doOnSuccess: () => void,
  doOnAuthError?: (e: Error) => void,
  doOn400Errors?: (e: Error) => void,
  doOn500Errors?: (e: Error) => void,
  doErrors?: (e: Error) => void
}