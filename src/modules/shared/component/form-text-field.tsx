import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function FormTextField({
                                        error,
                                        helperText,
                                        value,
                                        onChange,
                                        onBlur,
                                        variant,
                                        size,
                                        margin,
                                        inputProps,
                                        outlinedInputStyle,
                                        formControlStyle,
                                        required = true,
                                        ...props
                                      }: any) {
  return (
    <FormControl
      variant={variant}
      size={size}
      margin={margin}
      required={required}
      fullWidth={true}
      style={formControlStyle}
      error={error}
    >
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        disabled={props.disabled}
        id={props.id}
        label={props.label}
        name={props.name}
        type={props.type}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        inputProps={inputProps}
        value={value}
        style={outlinedInputStyle}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <FormHelperText style={{ minWidth: "150px", minHeight: "20px" }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
