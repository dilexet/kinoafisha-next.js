import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { authorize } from "@/modules/shared/constants/app-routes";
import { userProfileGetActionAsync } from "@/modules/user-profile/action";
import { useCallback, useEffect, useState } from "react";
import UserProfileComponent from "@/modules/user-profile/component";
import Loading from "@/modules/loading";
import { TabsValue } from "@/modules/user-profile/constants/tabs";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function UserProfile({ tokenPayload }) {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((x) => x.user_profile_reducer);

  const [isLoading, setIsLoading] = useState(true);
  const [tabsValue, setTabsValue] = useState(TabsValue.tickets);

  const handleChange = (event, newTabValue) => {
    setTabsValue(newTabValue);
  };

  const fetch = useCallback(async () => {
    await dispatch(userProfileGetActionAsync(tokenPayload?.userProfileId));
  }, [dispatch, tokenPayload?.userProfileId]);

  useEffect(() => {
    if (isLoading === true && tokenPayload !== null) {
      fetch().catch(console.error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [fetch, isLoading, tokenPayload]);

  return (
    <>
      <Head>
        <title>{`Profile: ${profileState?.profile?.name ?? ""}`}</title>
      </Head>
      <main>
        {isLoading === true ||
        profileState?.loadingStatusGet === LOADING_STATUSES.LOADING ? (
          <Loading />
        ) : (
          <UserProfileComponent
            tabsValue={tabsValue}
            handleChange={handleChange}
            profileState={profileState}
          />
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ req, res }) => {
    const tokenPayload = getTokenPayload(true, req, res);

    if (!tokenPayload?.userProfileId) {
      return {
        props: { tokenPayload: null },
        redirect: {
          destination: authorize.Login,
          permanent: false,
        },
      };
    }

    return { props: { tokenPayload } };
  });
