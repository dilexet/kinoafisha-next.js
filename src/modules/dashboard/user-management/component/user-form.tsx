import { GridTextFieldsType } from "@/modules/dashboard/shared/types/grid-items-type";
import {
  UserFieldCreateType,
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { UserManagementState } from "@/modules/dashboard/user-management/reducer";
import {
  userCreateValidationSchemaType,
  userUpdateValidationSchemaType,
} from "@/modules/dashboard/user-management/utils/user-validation-schema";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { Form, Formik } from "formik";
import { Box, Grid } from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import FormButtonGroup from "@/modules/dashboard/shared/component/form-button-group";
import RoleContainer from "@/modules/roles/container";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export interface UserFormProps {
  title: string;
  initialValues: UserFieldCreateType | UserFieldUpdateType;
  textFields: GridTextFieldsType[];
  handleSubmit: (values: UserFieldCreateType | UserFieldUpdateType) => void;
  handleCancel: () => void;
  userState: UserManagementState;
  validationSchema: userCreateValidationSchemaType | userUpdateValidationSchemaType;
}

export default function UserForm({
                                   title, userState,
                                   initialValues, handleSubmit,
                                   handleCancel, textFields,
                                   validationSchema,
                                 }: UserFormProps) {
  if (initialValues && textFields) {
    return (
      <ModalLayout title={title} error={userState?.errorInfo?.message}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {
            ({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
             }) => (
              <Box component={Form} sx={{ mt: 3 }} onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  {
                    textFields?.map((value, index) => (
                      <Grid item key={index}>
                        <FormTextField
                          id={value.id}
                          type={value.type}
                          label={value.label}
                          name={value.name}
                          value={values[value.name]}
                          variant="outlined"
                          margin="normal"
                          outlinedInputStyle={{ borderRadius: "20px" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          formControlStyle={{ width: "350px" }}
                          {...handleErrors(errors, touched, value?.name)}
                        />
                      </Grid>
                    ))
                  }
                  <Grid item>
                    <RoleContainer values={values} setFieldValue={setFieldValue} />
                  </Grid>
                </Grid>
                <FormButtonGroup handleCancel={handleCancel} isLoading={
                  userState?.loadingStatusCreate === LOADING_STATUSES.LOADING ||
                  userState?.loadingStatusUpdate === LOADING_STATUSES.LOADING
                } />
              </Box>
            )
          }
        </Formik>
      </ModalLayout>

    );
  }
}