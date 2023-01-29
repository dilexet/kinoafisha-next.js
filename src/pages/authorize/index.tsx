import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { loginActionAsync } from "@/authorize/action";
import Head from "next/head";

export default function Login() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const onLoginClick = async () => {
    await dispatch(loginActionAsync({ email: "admin@gmail.com", password: "root" }));
  };

  const onLogin2Click = async () => {
    await dispatch(loginActionAsync({ email: "test@gmail.com", password: "test" }));
  };

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <main>
        <div>Login page</div>
        <button onClick={onLoginClick}>Success</button>
        <button onClick={onLogin2Click}>Error</button>
      </main>
    </>
  );
}