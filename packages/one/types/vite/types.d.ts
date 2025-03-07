import type { GetTransform } from '@vxrn/compiler';
import type { PluginOptions as TSConfigPluginOptions } from 'vite-tsconfig-paths';
import type { DepOptimize, DepPatch, AfterBuildProps as VXRNAfterBuildProps, VXRNBuildOptions, VXRNOptions, VXRNServePlatform } from 'vxrn';
import type { RouteInfo } from '../server/createRoutesManifest';
export declare namespace One {
    export type Options = Omit<VXRNOptions, keyof PluginOptions> & PluginOptions;
    export type RouteRenderMode = 'ssg' | 'spa' | 'ssr';
    export type RouteType = RouteRenderMode | 'api' | 'layout';
    export type RouteOptions = {
        routeModes?: Record<string, RouteRenderMode>;
    };
    export type FixDependencies = {
        [key: string]: DepOptimize | DepPatch['patchFiles'];
    };
    export type ReactScanOptions = {
        enabled?: boolean;
        includeChildren?: boolean;
        playSound?: boolean;
        log?: boolean;
        showToolbar?: boolean;
        renderCountThreshold?: number;
        resetCountTimeout?: number;
        maxRenders?: number;
        report?: boolean;
        alwaysShowLabels?: boolean;
        animationSpeed?: 'slow' | 'fast' | 'off';
    };
    type PluginPlatformTarget = 'native' | 'web';
    export type PluginOptions = {
        /**
         * Enabling zero does a couple very simple things:
         *
         *   - It makes zero hand of seamelessly from server to client without flicker
         *
         */
        zero?: boolean;
        /**
         * Per-file control over how code transforms.
         * Defaults to SWC, runs babel before SWC if:
         *
         *  - options.react.compiler is `true`, on tsx files in your app
         *  - `react-native-reanimated` is in your dependencies and a file contains a reanimated keyword
         *
         * Otherwise One defaults to using `@swc/core`.
         *
         * Accepts a function:
         *
         *   (props: {
         *      id: string
         *      code: string
         *      development: boolean
         *      environment: Environment
         *      reactForRNVersion: '18' | '19'
         *   }) =>
         *      | true     // default transforms
         *      | false    // no transforms
         *      | 'babel'  // force babel default transform
         *      | 'swc'    // force swc default transform
         *
         *       // force babel, custom transform
         *
         *      | {
         *          transform: 'babel'
         *          excludeDefaultPlugins?: boolean
         *        } & babel.TransformOptions
         *
         *      // force swc, custom transform
         *
         *      | {
         *          transform: 'swc'
         *        } & SWCOptions
         *
         * Babel defaults to preset `@babel/preset-typescript` with plugins:
         *
         *  - @babel/plugin-transform-destructuring
         *  - @babel/plugin-transform-runtime
         *  - @babel/plugin-transform-react-jsx
         *  - @babel/plugin-transform-async-generator-functions
         *  - @babel/plugin-transform-async-to-generator
         *
         *
         * SWC defaults to target es5 for native, es2020 for web.
         *
         */
        transform?: GetTransform;
        react?: {
            compiler?: boolean | PluginPlatformTarget;
            scan?: boolean | PluginPlatformTarget | (Record<PluginPlatformTarget, ReactScanOptions> & {
                options?: ReactScanOptions;
            });
        };
        optimization?: {
            /**
             * Turn on [vite-plugin-barrel](https://github.com/JiangWeixian/vite-plugin-barrel/tree/master).
             * Optimizes barrel export files to speed up your build, you must list the packages that have
             * barrel exports. Especially useful for icon packs.
             *
             * @default ['@tamagui/lucide-icons']
             */
            barrel?: boolean | string[];
        };
        /**
         * Path to a js or ts file to import before the rest of your app runs
         * One controls your root, but you may want to runs some JS before anything else
         * Use this to give One the entrypoint to run
         */
        setupFile?: string;
        config?: {
            ensureTSConfig?: false;
            /**
             * One automatically adds vite-tsconfig-paths, set this to false to disable, or
             * pass in an object to pass options down. If you add your own vite-tsconfig-paths
             * we will avoid adding it again internally.
             *
             * See: https://github.com/aleclarson/vite-tsconfig-paths
             *
             * @default false
             */
            tsConfigPaths?: boolean | TSConfigPluginOptions;
        };
        native?: {
            /**
             * The uid of your native app, this will be used internally in one to call
             * `AppRegistry.registerComponent(key)`
             */
            key?: string;
            /**
             * Turns on react-native-css-interop support when importing CSS on native
             */
            css?: boolean;
        };
        web?: {
            /**
             * Choose the default strategy for pages to be rendered on the web.
             *
             * For sites that are mostly static, choose "ssg":
             *   SSG stands for "server side generated", in this mode when you run `build`
             *   your pages will all be fully rendered on the server once during the build,
             *   outputting a static HTML page with the rendered page and loader data inlined.
             *   This gives better performance for initial render, and better SEO.
             *
             *
             * For apps that are mostly dynamic, choose "spa":
             *   SPA stands for "single page app", in this mode when you run `build` your
             *   pages will only render out an empty shell of HTML and will not attempt to
             *   server render at all. Loaders will be run on the server side and the data will
             *   be available to your app on initial render.
             *
             * @default 'ssg'
             */
            defaultRenderMode?: RouteRenderMode;
            /**
             * An array of redirect objects, works in development and production:
             *
             * @example
             *
             * [
             *   {
             *     source: '/vite',
             *     destination: 'https://vxrn.dev',
             *     permanent: true,
             *   },
             *   {
             *     source: '/docs/components/:slug/:version',
             *     destination: '/ui/:slug/:version',
             *     permanent: true,
             *   },
             * ]
             *
             */
            redirects?: Redirect[];
            /**
             * Can be one of "node" or "vercel", this will determine the Hono adapter and build to run
             * properly in production for each platform.
             *
             * @default node
             */
            deploy?: VXRNServePlatform;
        };
        server?: VXRNOptions['server'];
        build?: {
            server?: VXRNBuildOptions;
            api?: VXRNBuildOptions;
        };
        deps?: FixDependencies;
        ssr?: {
            /**
             * Do not pre-bundle specific dependencies for SSR, or disable the automatic scan for dependencies to pre-bundle entirely.
             */
            disableAutoDepsPreBundling?: boolean | string[];
        };
    };
    export interface RouteContext {
        keys(): string[];
        (id: string): any;
        <T>(id: string): T;
        resolve(id: string): string;
        id: string;
    }
    export type Redirect = {
        source: string;
        destination: string;
        permanent: boolean;
    };
    export type BuildInfo = {
        constants: {
            CACHE_KEY: string;
        };
        oneOptions?: PluginOptions;
        routeToBuildInfo: Record<string, One.RouteBuildInfo>;
        routeMap: Record<string, string>;
        manifest: {
            pageRoutes: RouteInfo[];
            apiRoutes: RouteInfo[];
        };
    };
    export type AfterBuildProps = VXRNAfterBuildProps & BuildInfo;
    export type RouteBuildInfo = {
        type: One.RouteType;
        path: string;
        routeFile: string;
        middlewares: string[];
        preloadPath: string;
        cleanPath: string;
        htmlPath: string;
        clientJsPath: string;
        serverJsPath: string;
        params: Object;
        loaderData: any;
        preloads: string[];
    };
    export {};
}
//# sourceMappingURL=types.d.ts.map