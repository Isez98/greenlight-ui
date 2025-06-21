import React from 'react'
import { genreOptions } from '../../utils'
import InputField from '../InputField'
import { Form } from 'formik'

interface MovieFormProps extends React.HTMLAttributes<HTMLDivElement> {
  objectData: {
    year: number
    title: string
    runtime: string
    genres: string[]
    description: string
    poster: File | null
  }
  setObjectData: React.Dispatch<
    React.SetStateAction<{
      year: number
      title: string
      runtime: string
      genres: string[]
      description: string
      poster: File | null
    }>
  >
}

export const MovieForm: React.FC<MovieFormProps> = ({
  children,
  objectData,
  setObjectData,
}) => {
  return (
    <React.Fragment>
      <Form>
        <div className="mb-4">
          <InputField
            name="title"
            label="Title"
            onChange={(e) =>
              setObjectData({
                ...objectData,
                title: e.target.value,
              })
            }
            value={objectData.title}
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
              setObjectData({
                ...objectData,
                year: parseInt(e.target.value),
              })
            }
            value={objectData.year.toString()}
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
              setObjectData({
                ...objectData,
                runtime: `${e.target.value} mins`,
              })
            }
            value={objectData.runtime.split(' ')[0]}
          />
        </div>
        <div className="mb-6">
          <InputField
            name="genres"
            label="Genres"
            component="multiselect"
            onChange={(genre: any) =>
              setObjectData({
                ...objectData,
                genres: genre.map((genre: { label: string; value: string }) => {
                  return genre.value
                }),
              })
            }
            options={genreOptions}
            value={
              objectData.genres.map((item) => {
                return genreOptions[
                  genreOptions.findIndex((genre) => item === genre.value)
                ]
              }) as any
            }
          />
        </div>
        <div className="mb-6">
          <InputField
            name="description"
            label="Description"
            component="textarea"
            onChange={(e) =>
              setObjectData({
                ...objectData,
                description: e.target.value,
              })
            }
            value={objectData.description}
          />
        </div>
        <div className="mb-6">
          <InputField
            className="bg-white"
            label="Poster"
            name="poster"
            accept="image/*"
            multiple={false}
            type="file"
            onChange={(e) =>
              setObjectData({
                ...objectData,
                poster: e.target?.files?.[0] || null,
              })
            }
            // value={objectData.poster as any}
          />
        </div>
        {children}
        <div className="flex justify-between items-center"></div>
      </Form>
    </React.Fragment>
  )
}
