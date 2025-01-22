import React from 'react'
import { useAPI } from '../../utils.ts'
import HTTPMethods from '../../enums.ts'

interface CreateMovieProps {}

export const CreateMovie: React.FC<CreateMovieProps> = ({}) => {
  // const []
  const { queryData: createMovieRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/movies',
    null,
    'login',
    false
  )

  return (
    <React.Fragment>
      <p className="font-bold underline">Create Movie</p>
      <div>
        <span>
          <label htmlFor="title">Title: </label>
          <input id="title" name="title" type="text" />
        </span>
      </div>
      <div>
        <span>
          <label htmlFor="year">Year:</label>
          <input type="number" name="year" id="year" />
        </span>
      </div>
      <div>
        <span>
          <label htmlFor="runtime">Runtime:</label>
          <input type="number" name="runtime" id="runtime" />
        </span>
      </div>
      <div>
        <span>
          <label htmlFor="genres">Genres:</label>
          <input type="text" name="genres" id="genres" />
        </span>
      </div>
      <button>Submit</button>
    </React.Fragment>
  )
}
