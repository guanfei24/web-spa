export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // 不包任何 sidebar/header
}
