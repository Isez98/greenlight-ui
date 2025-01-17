import { useState } from 'react'
import { useAPI } from '../../utils.ts'
import HTTPMethods from '../../enums.ts'

type Login = (email: string, password: string) => void

export const useLogin: Login = (email, password) => {}
