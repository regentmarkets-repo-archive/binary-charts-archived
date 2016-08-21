declare module 'binary-utils' {
  declare function directionClassName(value: number): string;
  declare function sequence(n: number): number[];
  declare function dateToGMTString(date: Date): string;
  declare function arrayMin(arr: any[]): number;
  declare function arrayMax(arr: any[]): number;
  declare function getUniqueId(): number;
}
