import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

export const useAppStore = defineStore('app', () => {
  // Estado
  const isElectron = ref(typeof window !== 'undefined' && window.electronAPI !== undefined)
  const backendUrl = ref('http://localhost:3000') // URL do seu backend
  const data = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Ações
  const fetchData = async (endpoint: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`${backendUrl.value}${endpoint}`)
      data.value = response.data
      return response.data
    } catch (err) {
      const errorMessage = err instanceof AxiosError ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      loading.value = false
    }
  }

  const minimizeWindow = () => {
    if (isElectron.value && window.electronAPI) {
      window.electronAPI.minimize()
    }
  }

  const maximizeWindow = () => {
    if (isElectron.value && window.electronAPI) {
      window.electronAPI.maximize()
    }
  }

  const closeWindow = () => {
    if (isElectron.value && window.electronAPI) {
      window.electronAPI.close()
    }
  }

  const getVersion = async () => {
    if (isElectron.value && window.electronAPI) {
      return await window.electronAPI.getVersion()
    }
    return null
  }

  return {
    // Estado
    isElectron,
    backendUrl,
    data,
    loading,
    error,
    
    // Ações
    fetchData,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    getVersion
  }
})
