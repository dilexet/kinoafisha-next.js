import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { googleAuthorizeAsync, loginActionAsync } from "@/authorize/action";
import LoginComponent from "@/authorize/component/login";
import loginValidationSchema from "@/authorize/utils/login-validation-schema";
import { LoginFieldValues } from "@/authorize/constants/login-field-values";
import { clearErrors } from "@/authorize/reducer";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handleNavigateToSignUp() {
    router.push("/authorize/register");
  }

  async function handleSubmitForm(values: typeof LoginFieldValues) {
    if (await loginValidationSchema.isValid(values)) {
      await dispatch(loginActionAsync({ data: values, rememberMe: rememberMe }));
    }
  }

  async function handleGoogleAuthorize() {
    await dispatch(googleAuthorizeAsync());
  }

  useEffect(() => {
    if (isLoading === true && (authState?.errorInfo?.message || authState?.errorInfo?.error)) {
      dispatch(clearErrors());
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [authState?.errorInfo?.error, authState?.errorInfo?.message, dispatch, isLoading]);

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <main>
        <LoginComponent authorizeState={authState}
                        rememberMe={rememberMe} setRememberMe={setRememberMe}
                        handleNavigateToSignUp={handleNavigateToSignUp}
                        handleSubmitForm={handleSubmitForm}
                        handleGoogleAuthorize={handleGoogleAuthorize} />
      </main>
    </>
  );
}