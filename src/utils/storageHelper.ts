export type StorageType = "local" | "session"

const getStorageAPI = (type: StorageType): Storage => {
  return type === "local" ? localStorage : sessionStorage
}

export const setStoredValue = <T>(
  key: string,
  value: T,
  storageType: StorageType = "local"
): void => {
  const storage = getStorageAPI(storageType)
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to set ${storageType}Storage item '${key}':`, error)
  }
}

export const getStoredValue = <T>(
  key: string,
  storageType: StorageType
): T | null => {
  const storage = getStorageAPI(storageType)
  try {
    const item = storage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Failed to get ${storageType}Storage item '${key}':`, error)
    return null
  }
}
