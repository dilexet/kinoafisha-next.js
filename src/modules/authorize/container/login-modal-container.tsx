import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LoginFieldValues } from "@/modules/authorize/constants/login-field-values";
import loginValidationSchema from "@/modules/authorize/utils/login-validation-schema";
import { loginActionAsync } from "@/modules/authorize/action";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { clearErrors } from "@/modules/authorize/reducer";
import Loading from "@/modules/loading";
import LoginComponent from "@/modules/authorize/component/login";
import Modal from "@/modules/dashboard/shared/component/modal";

export default function LoginModalContainer({
                                              confirmOrder,
                                              openLoginModal,
                                              setOpenLoginModal,
                                              setOpenRegisterModal,
                                            }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function handleNavigateToSignUp() {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  }

  const handleCloseModal = () => {
    setOpenLoginModal(false);
  };

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
      confirmOrder();
    }
  }, [authState?.loadingStatus, confirmOrder, isSubmit]);

  useEffect(() => {
    if (isLoading === true) {
      dispatch(clearErrors());
      setIsLoading(false);
      setIsSubmit(false);
    }
  }, [dispatch, isLoading]);

  if (isLoading === true) {
    return <Loading />;
  } else {
    return (
      <Modal openModal={openLoginModal} handleCloseModal={handleCloseModal}>
        <LoginComponent
          setIsSubmit={setIsSubmit}
          authorizeState={authState}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleNavigateToSignUp={handleNavigateToSignUp}
          handleSubmitForm={handleSubmitForm}
        />
      </Modal>
    );
  }
}
