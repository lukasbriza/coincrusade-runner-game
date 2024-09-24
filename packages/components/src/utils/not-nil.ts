import { isNil } from './is-nil.js'

export const notNil = <T>(type: T): type is NonNullable<T> => !isNil(type)
