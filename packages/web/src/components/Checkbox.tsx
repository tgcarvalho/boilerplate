import * as React from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { Box, Checkbox as CCheckbox, CheckboxProps, Flex, FormControl } from "@chakra-ui/react"

import { InlineInputError, InputError } from "./InputError"
import { InlineInputLabel, InputLabel } from "./InputLabel"

interface Props extends CheckboxProps {
  name: string
  label?: string
  subLabel?: string
}

export const Checkbox = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  React.useEffect(() => {
    return () => unregister(props.name)
  }, [props.name, unregister])
  const value = watch(props.name) as boolean
  return (
    <FormControl isInvalid={!!fieldError} mb={0}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <Box>
        <CCheckbox
          {...register(props.name)}
          isChecked={value}
          onChange={() => setValue(props.name, !value)}
          mb={0}
          colorScheme="purple"
          size="lg"
          {...props}
        />
      </Box>
      <InputError error={fieldError} />
    </FormControl>
  )
}
export const InlineCheckbox = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  React.useEffect(() => {
    return () => unregister(props.name)
  }, [props.name, unregister])

  const value = watch(props.name) as boolean

  return (
    <FormControl isInvalid={!!fieldError} mb={0}>
      <Flex align="center">
        <InlineInputLabel label={label} subLabel={subLabel} name={props.name} />
        <Box>
          <CCheckbox
            {...register(props.name)}
            isChecked={value}
            onChange={() => setValue(props.name, !value)}
            mb={0}
            colorScheme="purple"
            size="lg"
            {...props}
          />
        </Box>
      </Flex>
      <InlineInputError error={fieldError} />
    </FormControl>
  )
}
