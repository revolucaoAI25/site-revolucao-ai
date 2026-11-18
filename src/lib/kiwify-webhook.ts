import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * A Kiwify assina cada webhook com HMAC-SHA1 do corpo usando o token que ela
 * mostra ao criar o webhook, e manda a assinatura em hex no parâmetro
 * `?signature=` da URL. Conferimos contra o corpo cru e, por garantia, contra
 * o JSON re-serializado (é assim que alguns exemplos da própria Kiwify fazem).
 */
export function verifyKiwifySignature(rawBody: string, signature: string | null, token: string): boolean {
  if (!signature) return false;
  const given = Buffer.from(signature.trim().toLowerCase());
  const candidates = [rawBody];
  try {
    candidates.push(JSON.stringify(JSON.parse(rawBody)));
  } catch {
    // corpo inválido: só o cru
  }
  return candidates.some((body) => {
    const expected = Buffer.from(createHmac("sha1", token).update(body).digest("hex"));
    return expected.length === given.length && timingSafeEqual(expected, given);
  });
}

type Dict = Record<string, unknown>;

const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const obj = (v: unknown): Dict | null => (v && typeof v === "object" ? (v as Dict) : null);

export type KiwifyOrder = {
  orderId: string | null;
  event: string | null;
  status: string | null;
  productId: string | null;
  productName: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
};

/** Lê os campos que importam, aceitando o pedido solto ou dentro de `order`. */
export function parseKiwifyOrder(payload: unknown): KiwifyOrder {
  const root = obj(payload) ?? {};
  const order = obj(root.order) ?? root;
  const product = obj(order.Product) ?? obj(order.product) ?? {};
  const customer = obj(order.Customer) ?? obj(order.customer) ?? {};
  return {
    orderId: str(order.order_id) ?? str(order.id),
    event: str(order.webhook_event_type) ?? str(root.webhook_event_type),
    status: str(order.order_status) ?? str(order.status),
    productId: str(product.product_id) ?? str(product.id),
    productName: str(product.product_name) ?? str(product.name),
    email: str(customer.email)?.toLowerCase() ?? null,
    name: str(customer.full_name) ?? str(customer.name),
    phone: str(customer.mobile) ?? str(customer.phone),
  };
}

/** Compra aprovada (o evento da Kiwify é `order_approved`, com status `paid`). */
export function isApprovedOrder(order: KiwifyOrder): boolean {
  return order.event === "order_approved" || order.status === "paid" || order.status === "approved";
}

/**
 * É o Do Zero aos 10K? Se KIWIFY_10K_PRODUCT_IDS estiver definida (ids
 * separados por vírgula), vale só ela. Sem ela, olha o nome do produto e
 * deixa de fora o Kit Proposta + Contrato (order bump).
 */
export function isZeroAos10kProduct(order: KiwifyOrder): boolean {
  const ids = (process.env.KIWIFY_10K_PRODUCT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (ids.length) return Boolean(order.productId && ids.includes(order.productId));
  const name = order.productName ?? "";
  return /zero\s+aos\s+10\s?k/i.test(name) && !/\bkit\b/i.test(name);
}
