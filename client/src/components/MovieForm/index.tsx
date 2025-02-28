import React from 'react'
import { genreOptions } from '../../utils'
import InputField from '../InputField'
import { Form } from 'formik'

interface MovieFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setFieldValue: any
}

export const MovieForm: React.FC<MovieFormProps> = ({
  setFieldValue,
  children,
}) => {
  return (
    <React.Fragment>
      <Form>
        <div className="mb-4">
          <InputField name="title" label="Title" />
        </div>
        <div className="mb-4">
          <InputField
            name="year"
            label="Year"
            type="number"
            min={'1900'}
            max={'2040'}
            step={'1'}
          />
        </div>
        <div className="mb-4">
          <InputField
            name="runtime"
            label="Runtime (mins.)"
            type="number"
            min={'30'}
            max={'300'}
            step={'1'}
          />
        </div>
        <div className="mb-6">
          <InputField
            name="genres"
            label="Genres"
            multiselect
            onChange={(genre) => setFieldValue('genres', genre)}
            options={genreOptions}
          />
        </div>
        {children}
        <div className="flex justify-between items-center"></div>
      </Form>
    </React.Fragment>
  )
}
