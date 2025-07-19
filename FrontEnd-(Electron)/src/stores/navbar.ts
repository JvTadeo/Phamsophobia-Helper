import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface NavItem {
  label: string
  href?: string
  icon?: string
  action?: () => void
  children?: NavItem[]
  active?: boolean
}

export interface UserProfile {
  name: string
  email: string
  avatar?: string
  role?: string
}

export const useNavbarStore = defineStore('navbar', () => {
  // Estado
  const isCollapsed = ref(false)
  const currentRoute = ref('/')
  const user = ref<UserProfile | null>(null)
  const isUserMenuOpen = ref(false)
  
  // Itens de navegação
  const navItems = ref<NavItem[]>([
    {
      label: 'Dashboard',
      href: '/',
      icon: 'Home',
      active: false
    },
    {
      label: 'Phasmophobia',
      icon: 'Ghost',
      children: [
        {
          label: 'Player Count',
          href: '/phasmophobia/players',
          icon: 'Users'
        },
        {
          label: 'News',
          href: '/phasmophobia/news',
          icon: 'Newspaper'
        }
      ]
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: 'Settings',
      active: false
    }
  ])

  // Computed
  const activeNavItem = computed(() => {
    return navItems.value.find(item => 
      item.href === currentRoute.value || 
      item.children?.some(child => child.href === currentRoute.value)
    )
  })

  const isLoggedIn = computed(() => user.value !== null)

  // Actions
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const setCurrentRoute = (route: string) => {
    currentRoute.value = route
    updateActiveStates()
  }

  const updateActiveStates = () => {
    navItems.value.forEach(item => {
      item.active = item.href === currentRoute.value
      if (item.children) {
        item.children.forEach(child => {
          child.active = child.href === currentRoute.value
        })
      }
    })
  }

  const setUser = (userData: UserProfile) => {
    user.value = userData
  }

  const logout = () => {
    user.value = null
    isUserMenuOpen.value = false
  }

  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
  }

  const addNavItem = (item: NavItem, index?: number) => {
    if (index !== undefined) {
      navItems.value.splice(index, 0, item)
    } else {
      navItems.value.push(item)
    }
  }

  const removeNavItem = (label: string) => {
    const index = navItems.value.findIndex(item => item.label === label)
    if (index > -1) {
      navItems.value.splice(index, 1)
    }
  }

  return {
    // State
    isCollapsed,
    currentRoute,
    user,
    isUserMenuOpen,
    navItems,
    
    // Computed
    activeNavItem,
    isLoggedIn,
    
    // Actions
    toggleSidebar,
    setCurrentRoute,
    updateActiveStates,
    setUser,
    logout,
    toggleUserMenu,
    addNavItem,
    removeNavItem
  }
})
