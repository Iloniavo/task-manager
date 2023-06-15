const useLocalStorage = (key) => {
  const getStorageItem = () => {
    return JSON.parse(localStorage.getItem(key))
  }

  const setStorageItem = (item) => localStorage.setItem(key, JSON.stringify(item))

  return {
    getStorageItem, setStorageItem
  }

}

export {
  useLocalStorage
}