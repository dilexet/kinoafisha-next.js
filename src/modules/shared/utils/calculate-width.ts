export function calculateWidthBySeats(seatsLength: number): string {
  const width = seatsLength * 50 + 50;
  return `${width > window.innerWidth ? window.innerWidth * 0.8 : width}px`;
}