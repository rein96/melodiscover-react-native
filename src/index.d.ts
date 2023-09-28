/**
 * To solve import jpg, png, webp image file issue
 * Cannot find module '../../../src/assets/Image.jpg' or its corresponding type declarations.ts(2307)
 * @see https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module
 */
declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
