import Header from "../../../components/layout/Header";
import Sidebar from "../../../components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
               {children} 
            </main>
        </div>
    </>
  );
}