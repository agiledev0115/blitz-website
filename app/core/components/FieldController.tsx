import { Controller, useForm } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import React, { FunctionComponent } from "react"
import { TextField } from "@mui/material"

interface FieldControllerProps {
  name: string
  label: string
  defaultValue?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const FieldController: FunctionComponent<FieldControllerProps> = ({
  name,
  label,
  defaultValue = "",
  outerProps,
}) => {
  const {
    formState: { isSubmitting, errors },
    control,
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]

  return (
    <div {...outerProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          console.log(value)
          return (
            <TextField
              label={label}
              variant="outlined"
              disabled={isSubmitting}
              value={value}
              onChange={onChange}
            />
          )
        }}
      />
      {error && (
        <div role="alert" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  )
}
