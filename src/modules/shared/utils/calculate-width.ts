export function calculateWidthBySeats(seatsLength: number): string {
  const width = seatsLength * 100;
  const screenWidth = window?.innerWidth * 0.75;
  return width > screenWidth ? `${screenWidth}px` : `${width}px`;
}