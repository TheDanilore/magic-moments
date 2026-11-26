/**
 * Formatea un monto entero en céntimos a Soles peruanos ("S/ 45.00").
 */
export function formatPEN(cents: number): string {
  const amount = cents / 100
  return `S/ ${amount.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
