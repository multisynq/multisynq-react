import { ReactModel } from '../ReactModel'
import { useMultisynqContext } from './useMultisynqContext'
/** Hook that gives access to the root Model of this Multisynq session.
 * Can be used to read Model properties (including other referenced Models),
 * and to publish events to the Model or to subscribe to Model events using the other hooks.
 */
export function useModelRoot<M extends ReactModel>(): M | null {
  const { model } = useMultisynqContext<M>()
  return model
}
