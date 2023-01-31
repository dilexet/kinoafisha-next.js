import { googleAuthorizeAsync } from "@/modules/authorize/action";
import { AuthorizeButton } from "@/modules/authorize/component/authorize-button";
import { useAppDispatch } from "@/modules/shared/redux/hooks";

export default function AuthorizeButtonContainer({
                                                   isLoading,
                                                   buttonText,
                                                 }) {
  const dispatch = useAppDispatch();

  async function handleGoogleAuthorize(token: string) {
    await dispatch(googleAuthorizeAsync(token));
  }

  return (
    <AuthorizeButton buttonText={buttonText} isLoading={isLoading} handleGoogleAuthorize={handleGoogleAuthorize} />
  );
}