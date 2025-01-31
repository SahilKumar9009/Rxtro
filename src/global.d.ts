// create global.d.ts file in folder src,and add this line

declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}
declare module '*.jpeg' {
  export default '' as string;
}