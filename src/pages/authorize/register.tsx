import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { registerActionAsync } from "@/modules/authorize/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegisterComponent from "@/modules/authorize/component/register";
import { RegisterFieldValues } from "@/modules/authorize/constants/register-field-values";
import registerValidationSchema from "@/modules/authorize/utils/register-validation-schema";
import { clearErrors } from "@/modules/authorize/reducer";
import { authorize } from "@/modules/shared/constants/app-routes";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { Roles } from "@/modules/shared/utils/roles";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function handleNavigateToSignIn() {
    router.push(authorize.Login);
  }

  async function handleSubmitForm(values: typeof RegisterFieldValues) {
    if (await registerValidationSchema.isValid(values)) {
      await dispatch(
        registerActionAsync({ data: values, rememberMe: rememberMe }),
      );
      setIsSubmit(true);
    }
  }

  useEffect(() => {
    if (
      authState?.loadingStatus === LOADING_STATUSES.IDLE &&
      isSubmit === true
    ) {
      router.push("/");
    }
  }, [authState?.loadingStatus, isSubmit, router]);

  useEffect(() => {
    if (isLoading === true) {
      dispatch(clearErrors());
      setIsLoading(false);
      setIsSubmit(false);
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <Head>
        <title>Register page</title>
      </Head>
      <main>
        <RegisterComponent
          handleSubmitForm={handleSubmitForm}
          handleNavigateToSignIn={handleNavigateToSignIn}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          authorizeState={authState}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ req, res }) => {
    const tokenPayload = getTokenPayload(true, req, res);

    if (!tokenPayload) {
      return { props: {} };
    }

    if (tokenPayload?.role === Roles.Admin) {
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  });
