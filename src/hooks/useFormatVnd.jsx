export default function useFormatVnd() {
  const formatVnd = (n) => {
    const num = Number(n) || 0;
    return `${new Intl.NumberFormat("vi-VN").format(num)} đ`;
  };

  return { formatVnd };
}
