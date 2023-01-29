import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { registerActionAsync } from "@/authorize/action";

export default function Register() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const onRegisterClick = async () => {
    await dispatch(registerActionAsync({ name: "test", email: "test@gmail.com", password: "test" }));
  };

  const onRegisterErrorClick = async () => {
    await dispatch(registerActionAsync({ name: "admin", email: "admin@gmail.com", password: "root" }));
  };

  return (
    <>
      <Head>
        <title>Register page</title>
      </Head>
      <main>
        <div>Register page</div>
        <button onClick={onRegisterClick}>Success</button>
        <button onClick={onRegisterErrorClick}>Error</button>
      </main>
    </>
  );
}