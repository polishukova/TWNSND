export function checkDataInSessionStorage(key: string) {
  const sessionStorageJson = sessionStorage.getItem(key)
  return sessionStorageJson ? JSON.parse(sessionStorageJson) : null
}
