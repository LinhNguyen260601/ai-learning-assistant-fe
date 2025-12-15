import { StrictMode, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import reportWebVitals from './reportWebVitals.ts'
import type { MyRouterContext } from '@/routes/__root.tsx'
import { AntdConfigProvider } from '@/integrations/antd/root-provider.tsx'
import './styles.css'
import useAuthStore from '@/stores/useAuthStore.ts'

// Lazy load error components as they're not on the critical path
const Error = lazy(() =>
  import('@/pages/index.ts').then((module) => ({ default: module.Error })),
)
const NotFound = lazy(() =>
  import('@/pages/index.ts').then((module) => ({ default: module.NotFound })),
)

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    auth: useAuthStore.getState(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: Error,
  defaultNotFoundComponent: NotFound,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const auth = useAuthStore.getState()

  const routerContext: Partial<MyRouterContext> = {
    auth,
  }

  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <AntdConfigProvider>
          <RouterProvider router={router} context={routerContext} />
        </AntdConfigProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
