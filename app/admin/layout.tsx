import AdminSideBar from './AdminSideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
