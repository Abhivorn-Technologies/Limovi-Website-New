// WhatsApp number that receives Early Access and Contact enquiries.
// Set NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER in the deployment to change it.
export const ADMIN_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919000360109";

export function whatsappLink(text: string) {
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
