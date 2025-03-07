import type { OutputAsset, OutputChunk } from 'rollup';
import type { BuildArgs, VXRNOptions } from '../types';
export declare const build: (optionsIn: VXRNOptions, buildArgs?: BuildArgs) => Promise<void | {
    options: {
        debugBundlePaths: {
            ios: string;
            android: string;
        };
        mode: "development" | "production";
        clean: boolean;
        root: string;
        server: import("..").VXRNServeOptionsFilled;
        entries: {
            native: string;
            web?: string;
            server: string;
        };
        packageJSON: import("pkg-types").PackageJson;
        packageVersions: {
            react: string;
            reactNative: string;
        } | undefined;
        state: {
            versionHash?: string;
        };
        packageRootDir: string;
        cacheDir: string;
        build?: {
            server?: boolean | import("..").VXRNBuildOptions;
            analyze?: boolean;
        };
        debugBundle?: string;
        debug?: string;
    };
    buildArgs: BuildArgs;
    serverEntry: string;
    clientOutput: any;
    serverOutput: [OutputChunk, ...(OutputChunk | OutputAsset)[]] | undefined;
    serverBuildConfig: Record<string, any>;
    webBuildConfig: Record<string, any>;
    clientManifest: any;
}>;
//# sourceMappingURL=build.d.ts.map