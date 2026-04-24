import "~/styles/globals.css";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen">{children}</main>;
}
