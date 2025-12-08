import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools'

import type { QueryClient } from '@tanstack/react-query'
import type { useAuthStore } from '@/stores'

export interface MyRouterContext {
  auth: ReturnType<typeof useAuthStore.getState>
  queryClient: QueryClient
}

const tanStackConfig:
  | Partial<{
      defaultOpen: boolean
      hideUntilHover: boolean
      position: 'bottom-right'
      panelLocation: 'top' | 'bottom'
      requireUrlFlag: boolean
      urlFlag: string
      theme: 'light' | 'dark'
      triggerImage: string
      triggerHidden?: boolean
    }>
  | undefined = {
  position: 'bottom-right',
}

const tackStackDevtoolsPlugins: Array<TanStackDevtoolsReactPlugin> | undefined =
  [
    {
      name: 'Tanstack Router',
      render: <TanStackRouterDevtoolsPanel />,
    },
    TanStackQueryDevtools,
  ]

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={tanStackConfig}
        plugins={tackStackDevtoolsPlugins}
      />
    </>
  ),
})
