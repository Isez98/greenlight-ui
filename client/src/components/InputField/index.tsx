import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <div>
      <label className="block mb-2 text-" htmlFor={field.name}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-2 px-3 leading-tight text-gray-700 shadow disabled:bg-gray-200
        ${error ? 'border-red-500' : ''}`}
        id={field.name}
      />
      {error ? <p className="text-xs italic text-red-500">{error}</p> : null}
    </div>
  )
}

export default InputField
