export function calculateWidthBySeats(seatsLength: number): string {
  const width = seatsLength * 50 + 50;
  // const screenWidth = window?.innerWidth * 0.75;
  // return width > screenWidth ? `${screenWidth}px` : `${width}px`;
  return `${width}px`;
}