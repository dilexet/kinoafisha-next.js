import DashboardLayout from "@/modules/dashboard/shared/component/dashboard-layout";
import Head from "next/head";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <div>
          This is dashboard
        </div>
      </main>
    </>
  );
};

export const DashboardPageLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

DashboardPage.getLayout = DashboardPageLayout;

export default DashboardPage;