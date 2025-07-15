import DashboardHeader from "@/components/layout/dashboard-header";
import { RootFooter } from "@/components/layout/root-footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <DashboardHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <RootFooter />
    </div>
  );
};

export default DashboardLayout;
