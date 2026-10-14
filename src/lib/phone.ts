/**
 * Telefone no formato internacional (+55...), pra preencher o campo do
 * Calendly. No funil, a pessoa digita só DDD + número; o Calendly precisa do
 * código do país. Já vindo com 55 (12 ou 13 dígitos), mantém.
 */
export function toInternationalPhone(input: string | null | undefined): string | undefined {
  const digits = (input ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length < 10) return undefined;
  if (digits.length <= 11) return `+55${digits}`;
  return `+${digits}`;
}
