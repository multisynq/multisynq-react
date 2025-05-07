import { UpdateCallback } from '../MultisynqReactView'
import { useView } from './useView'

/**
 * Hook that sets up a callback for Multisynq.View.update().
 *
 * The function will be called at each simulation cycle.
 */
export function useUpdateCallback(callback: UpdateCallback | null): void {
  const multisynqView = useView()
  if (multisynqView !== null) {
    multisynqView.updateCallback = callback
  }
}
