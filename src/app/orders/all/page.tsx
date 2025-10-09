export default function DeprecatedAllOrdersRedirect() {
  if (typeof window !== 'undefined') {
    window.location.replace('/orders');
  }
  return null;
}
