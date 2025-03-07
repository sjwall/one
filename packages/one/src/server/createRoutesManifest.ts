import { type Options, getRoutes } from '../router/getRoutes'
import { getServerManifest } from './getServerManifest'
import type { RouteNode } from '../router/Route'
import type { One } from '../vite/types'

export { type Options } from '../router/getRoutes'

export type RouteInfo<TRegex = string> = {
  file: string
  page: string
  namedRegex: TRegex
  routeKeys: Record<string, string>
  layouts?: RouteNode[]
  middlewares?: RouteNode[]
  type: One.RouteType
  isNotFound?: boolean
}

export type RouteInfoCompiled = RouteInfo & {
  compiledRegex: RegExp
  honoPath: string
}

export type RoutesManifest<TRegex = string> = {
  apiRoutes: RouteInfo<TRegex>[]
  middlewareRoutes: RouteInfo<TRegex>[]
  pageRoutes: RouteInfo<TRegex>[]
}

function createMockModuleWithContext(map: string[] = []) {
  const contextModule = (key) => ({ default() {} })

  Object.defineProperty(contextModule, 'keys', {
    value: () => map,
  })

  return contextModule as One.RouteContext
}

export function createRoutesManifest(paths: string[], options: Options): RoutesManifest | null {
  const routeTree = getRoutes(createMockModuleWithContext(paths), {
    ...options,
    preserveApiRoutes: true,
    ignoreRequireErrors: true,
    ignoreEntryPoints: true,
    platform: 'web',
  })

  if (!routeTree) {
    throw new Error(`No route tree found in paths: ${JSON.stringify(paths)}`)
  }

  return getServerManifest(routeTree)
}
