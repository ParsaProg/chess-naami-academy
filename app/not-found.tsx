import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - صفحه یافت نشد</h1>
      <p>متأسفانه صفحه‌ای که دنبالش هستید پیدا نشد.</p>
      <Link href="/">بازگشت به صفحه اصلی</Link>
    </div>
  );
}