import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { registerActionAsync } from "@/modules/authorize/action";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { clearErrors } from "@/modules/authorize/reducer";
import Loading from "@/modules/loading";
import Modal from "@/modules/dashboard/shared/component/modal";
import registerValidationSchema from "@/modules/authorize/utils/register-validation-schema";
import { RegisterFieldValues } from "@/modules/authorize/constants/register-field-values";
import RegisterComponent from "@/modules/authorize/component/register";

export default function RegisterModalContainer({
                                                 confirmOrder,
                                                 openRegisterModal,
                                                 setOpenLoginModal,
                                                 setOpenRegisterModal,
                                               }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((x) => x.authorize_reducer);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function handleNavigateToSignIn() {
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  }

  const handleCloseModal = () => {
    setOpenRegisterModal(false);
  };

  async function handleSubmitForm(values: typeof RegisterFieldValues) {
    if (await registerValidationSchema.isValid(values)) {
      await dispatch(
        registerActionAsync({ data: values, rememberMe: rememberMe }),
      );
      setIsSubmit(true);
    }
  }

  useEffect(() => {
    if (authState?.loadingStatus === LOADING_STATUSES.IDLE && isSubmit === true) {
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
    return (<Loading />);
  } else {
    return (
      <Modal openModal={openRegisterModal} handleCloseModal={handleCloseModal}>
        <RegisterComponent
          handleSubmitForm={handleSubmitForm}
          handleNavigateToSignIn={handleNavigateToSignIn}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          authorizeState={authState}
        />
      </Modal>
    );
  }
}