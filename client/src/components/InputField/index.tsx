import React, { InputHTMLAttributes } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useField } from 'formik'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  component?: 'normal' | 'multiselect' | 'textarea'
  options?: { value: string; label: string }[]
}

const animatedComponents = makeAnimated()

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  component = 'normal',
  options = [{}],
  ...props
}) => {
  const [field, { error }] = useField(props)

  const serveComponet = () => {
    switch (component) {
      case 'multiselect':
        return (
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            {...field}
            {...(props as StateManagedSelect)}
            className={`focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-2 px-3 leading-tight text-gray-700 shadow disabled:bg-gray-200
        ${error ? 'border-red-500' : ''}`}
            id={field.name}
          />
        )
      case 'textarea':
        return (
          <textarea
            {...field}
            {...(props as InputHTMLAttributes<HTMLTextAreaElement>)}
            className={`focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-2 px-3 leading-tight text-gray-700 shadow disabled:bg-gray-200
        ${error ? 'border-red-500' : ''}`}
            id={field.name}
          />
        )
      case 'normal':
        return (
          <input
            {...field}
            {...props}
            className={`focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-2 px-3 leading-tight text-gray-700 shadow disabled:bg-gray-200
        ${error ? 'border-red-500' : ''}`}
            id={field.name}
          />
        )
    }
  }

  return (
    <div>
      <label className="block mb-2 text-" htmlFor={field.name}>
        {label}
      </label>
      {serveComponet()}
      {error ? <p className="text-xs italic text-red-500">{error}</p> : null}
    </div>
  )
}

export default InputField
