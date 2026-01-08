export default function useFormatVnd() {
  return (n) => {
    const num = Number(n) || 0;
    return `${new Intl.NumberFormat("vi-VN").format(num)} đ`;
  };
}
