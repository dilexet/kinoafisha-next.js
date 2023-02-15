export function generateEmptyArray(arrayLength: number, value: any): any[] {
  const array = new Array(arrayLength);
  return array.fill(value);
}
