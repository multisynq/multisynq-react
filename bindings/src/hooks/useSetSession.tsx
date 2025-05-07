import { useMultisynqContext } from './useMultisynqContext'

/** This hook returns a function that changes the MultisynqSession the user is joined to
 * @param name
 * @param password
 */
export function useSetSession() {
  const { setSession } = useMultisynqContext()
  return setSession
}
