import { DetachCallback } from '../MultisynqReactView'
import { useView } from './useView'

/** Hook that sets up a callback for Multisynq.View.detach().
 * The function will be called when the root View is detached.
 */
export function useDetachCallback(callback: DetachCallback | null): void {
  const multisynqView = useView()
  if (multisynqView !== null) {
    multisynqView.detachCallback = callback
  }
}
