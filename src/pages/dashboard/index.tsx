import DashboardLayout from "@/modules/dashboard/shared/component/dashboard-layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { Roles } from "@/modules/shared/utils/roles";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <div />
      </main>
    </>
  );
};

export const DashboardPageLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

DashboardPage.getLayout = DashboardPageLayout;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ req, res }) => {
    const tokenPayload = getTokenPayload(true, req, res);

    if (tokenPayload?.role !== Roles.Admin) {
      return {
        props: {},
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: {} };
  });

export default DashboardPage;
