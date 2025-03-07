import type { RouteInfo } from '../server/createRoutesManifest';
import type { One } from '../vite/types';
export declare function buildPage(serverEntry: string, path: string, relativeId: string, params: any, foundRoute: RouteInfo<string>, clientManifestEntry: any, staticDir: string, clientDir: string, builtMiddlewares: Record<string, string>, serverJsPath: string, preloads: string[], allCSS: string[]): Promise<One.RouteBuildInfo>;
//# sourceMappingURL=buildPage.d.ts.map