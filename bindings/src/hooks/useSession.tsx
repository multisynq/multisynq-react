import { MultisynqSession } from '@multisynq/client'
import { MultisynqReactView } from '../MultisynqReactView'
import { useMultisynqContext } from './useMultisynqContext'
import { ReactModel } from '../ReactModel'

/** Hook that gives access to the Multisynq Session the user is currently joined to.
 */
export function useSession<M extends ReactModel>(): MultisynqSession<MultisynqReactView<M>> | null {
  const { session } = useMultisynqContext<M>()
  return session
}
