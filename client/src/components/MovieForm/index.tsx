import React from 'react'
import { genreOptions } from '../../utils'
import InputField from '../InputField'
import { Form } from 'formik'

interface MovieFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formData: {
    year: number
    title: string
    runtime: string
    genres: string[]
  }
  setFormData: React.Dispatch<
    React.SetStateAction<{
      year: number
      title: string
      runtime: string
      genres: string[]
    }>
  >
}

export const MovieForm: React.FC<MovieFormProps> = ({
  children,
  formData,
  setFormData,
}) => {
  return (
    <React.Fragment>
      <Form>
        <div className="mb-4">
          <InputField
            name="title"
            label="Title"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            value={formData.title}
          />
        </div>
        <div className="mb-4">
          <InputField
            name="year"
            label="Year"
            type="number"
            min={'1900'}
            max={'2040'}
            step={'1'}
            onChange={(e) =>
              setFormData({
                ...formData,
                year: parseInt(e.target.value),
              })
            }
            value={formData.year.toString()}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                runtime: `${e.target.value} mins`,
              })
            }
            value={formData.runtime.split(' ')[0]}
          />
        </div>
        <div className="mb-6">
          <InputField
            name="genres"
            label="Genres"
            multiselect
            onChange={(genre: any) =>
              setFormData({
                ...formData,
                genres: genre.map((genre: { label: string; value: string }) => {
                  return genre.value
                }),
              })
            }
            options={genreOptions}
            value={
              formData.genres.map((item) => {
                return genreOptions[
                  genreOptions.findIndex((genre) => item === genre.value)
                ]
              }) as any
            }
          />
        </div>
        {children}
        <div className="flex justify-between items-center"></div>
      </Form>
    </React.Fragment>
  )
}
