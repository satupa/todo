import { useContext } from 'react'
import { userContext } from './userContext.js'

export const useUser  = () => {
    return useContext(userContext)
}