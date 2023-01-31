import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { loginActionAsync } from "@/modules/authorize/action";
import LoginComponent from "@/modules/authorize/component/login";
import loginValidationSchema from "@/modules/authorize/utils/login-validation-schema";
import { LoginFieldValues } from "@/modules/authorize/constants/login-field-values";
import { clearErrors } from "@/modules/authorize/reducer";

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
                        handleSubmitForm={handleSubmitForm} />
      </main>
    </>
  );
}