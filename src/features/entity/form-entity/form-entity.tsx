import { useQuery } from "@tanstack/react-query"
import { FC, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import { useGeneral } from "@features/general-provider"

import { api } from "@services/api"

import Button from "@shared/ui/button"
import { showToast } from "@shared/ui/toastify"
import { Typography } from "@shared/ui/typography"
import { withBackendHost } from "@shared/utils/env"
import { isAxiosError } from "@shared/utils/error-handler"

import { Field } from "./field"
import { FormEntityProps } from "./form.types"

const FormEntity: FC<FormEntityProps> = ({ variant, id }) => {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const itemId = searchParams.get("id")
  const { general } = useGeneral()
  const form = general?.[variant]?.find(form => form.id === id)
  const parsedParams = form?.api_parameters && JSON.parse(form.api_parameters)

  const { data, isError, error } = useQuery({
    queryKey: ["form", form?.route_to_fill_form, itemId],
    queryFn: () => api.get<{ data: any }>(withBackendHost(`${form?.route_to_fill_form}${itemId}`)),
    select: data => data.data,
    enabled: !!form?.route_to_fill_form,
    retry: false,
  })

  const methods = useForm({
    shouldFocusError: false,
    defaultValues: data,
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods

  const onUpdateSubmit = async (data: any) => {
    if (form?.api_route) {
      try {
        const response = await fetch(withBackendHost(`${form.api_route}${itemId}`), {
          ...parsedParams,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          showToast("Сутність успішно оновлено!", { type: "success" })
        } else {
          showToast("Не вдалось оновити сутність!", { type: "error" })
        }
      } catch {
        showToast("Не вдалось оновити сутніть сутність!", { type: "error" })
      }
    }
  }

  const onAddSubmit = async (data: any) => {
    if (form?.api_route) {
      try {
        const response = await fetch(withBackendHost(form.api_route), {
          ...parsedParams,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          reset()
          showToast("Сутність успішно створено!", { type: "success" })
        } else {
          showToast("Не вдалось створити сутність!", { type: "error" })
        }
      } catch {
        showToast("Не вдалось створити сутність!", { type: "error" })
      }
    }
  }

  const onSubmit = async (data: any) => {
    if (form?.route_to_fill_form) {
      await onUpdateSubmit(data)
    } else {
      await onAddSubmit(data)
    }
  }

  useEffect(() => {
    reset({})

    if (data) reset(data)

    return () => reset({})
  }, [data, reset])

  if (isError) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message
      showToast(message, { type: "error" })
    } else {
      showToast("Не вдалось завантажити дані!", { type: "error" })
    }
  }

  if (!form) {
    return null
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="box box--stacked space-y-8 p-5">
        <Typography as="h3" variant="sectionTitle">
          {form.title}
        </Typography>
        {form.containers.map((container, key) => {
          return (
            <div key={key} className="space-y-3">
              <Typography as="h5" variant="sectionSubtitle">
                {container.title}
              </Typography>
              {container.fields.map((field, key) => {
                return <Field key={key} {...field} />
              })}
            </div>
          )
        })}
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
export default FormEntity
