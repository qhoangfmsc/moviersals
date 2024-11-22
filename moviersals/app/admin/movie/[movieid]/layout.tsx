export default function MovieDetailAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full w-full">
      {children}
    </section>
  );
}
