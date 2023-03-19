import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '@/typings'


export const modalState = atom({
  key: 'modalState',
  default: false,
})

// It can be any of the three types : Movie, Document Data or Null
export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})