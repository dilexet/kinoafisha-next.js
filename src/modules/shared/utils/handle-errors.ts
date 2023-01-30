export function handleErrors(errors, touched, name) {
  if (errors[name] && touched[name]) {
    return (
      ((errors[name] && touched[name]) && {
        error: true,
        helperText: errors[name],
      })
    );
  }
}