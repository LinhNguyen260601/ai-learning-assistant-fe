import { Suspense, lazy } from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import type { useAuthStore } from '@/stores'

export interface MyRouterContext {
  auth: ReturnType<typeof useAuthStore.getState>
  queryClient: QueryClient
}

// Devtools are only loaded in development
// Vite will tree-shake these imports in production builds
const DevtoolsWrapper = () => {
  if (import.meta.env.PROD) {
    return null
  }

  // Lazy load devtools only in development
  const Devtools = lazy(async () => {
    const [
      { TanStackDevtools },
      { TanStackRouterDevtoolsPanel },
      TanStackQueryDevtools,
    ] = await Promise.all([
      import('@tanstack/react-devtools'),
      import('@tanstack/react-router-devtools'),
      import('../integrations/tanstack-query/devtools'),
    ])

    return {
      default: () => (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools.default,
          ]}
        />
      ),
    }
  })

  return (
    <Suspense fallback={null}>
      <Devtools />
    </Suspense>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <DevtoolsWrapper />
    </>
  ),
})
