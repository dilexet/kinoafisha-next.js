export function calculateWidthBySeats(seatsLength: number): string {
  const width = seatsLength * 50 + 50;
  return `${width}px`;
}
