import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { loginActionAsync } from "@/modules/authorize/action";
import LoginComponent from "@/modules/authorize/component/login";
import loginValidationSchema from "@/modules/authorize/utils/login-validation-schema";
import { LoginFieldValues } from "@/modules/authorize/constants/login-field-values";
import { clearErrors } from "@/modules/authorize/reducer";
import { authorize } from "@/modules/shared/constants/app-routes";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { Roles } from "@/modules/shared/utils/roles";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function handleNavigateToSignUp() {
    router.push(authorize.Register);
  }

  async function handleSubmitForm(values: typeof LoginFieldValues) {
    if (await loginValidationSchema.isValid(values)) {
      await dispatch(
        loginActionAsync({ data: values, rememberMe: rememberMe }),
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
        <title>Login page</title>
      </Head>
      <main>
        <LoginComponent
          authorizeState={authState}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleNavigateToSignUp={handleNavigateToSignUp}
          handleSubmitForm={handleSubmitForm}
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
