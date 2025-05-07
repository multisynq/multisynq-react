import { SyncedCallback } from '../MultisynqReactView'
import { useView } from './useView'

/**
 * Hook that sets up a callback for Multisynq.View.synced().
 *
 * The function will be called when Multisynq synced event occurs.
 */
export function useSyncedCallback(callback: SyncedCallback | null): void {
  const multisynqView = useView()
  if (multisynqView !== null) {
    multisynqView.syncedCallback = callback
  }
}
