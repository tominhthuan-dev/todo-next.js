import Header from "../../../components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        <div className="flex">
            <main className="flex-1">
               {children} 
            </main>
        </div>
    </>
  );
}