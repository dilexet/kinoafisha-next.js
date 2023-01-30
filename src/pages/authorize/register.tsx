import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { googleAuthorizeAsync, registerActionAsync } from "@/modules/authorize/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegisterComponent from "@/modules/authorize/component/register";
import { RegisterFieldValues } from "@/modules/authorize/constants/register-field-values";
import registerValidationSchema from "@/modules/authorize/utils/register-validation-schema";
import { clearErrors } from "@/modules/authorize/reducer";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handleNavigateToSignIn() {
    router.push("/authorize");
  }

  async function handleSubmitForm(values: typeof RegisterFieldValues) {
    if (await registerValidationSchema.isValid(values)) {
      await dispatch(registerActionAsync({ data: values, rememberMe: rememberMe }));
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
        <title>Register page</title>
      </Head>
      <main>
        <RegisterComponent
          handleSubmitForm={handleSubmitForm}
          handleNavigateToSignIn={handleNavigateToSignIn}
          rememberMe={rememberMe} setRememberMe={setRememberMe}
          authorizeState={authState} handleGoogleAuthorize={handleGoogleAuthorize}
        />
      </main>
    </>
  );
}