import { useEffect, useState, useRef, useCallback } from 'react'
import { MultisynqSession, App } from '@multisynq/client'
import { MultisynqReactView } from '../MultisynqReactView'
import { setSyncedCallback } from '../MultisynqReactView'
import { MultisynqContext } from './MultisynqContext'
import { createMultisynqSession, MultisynqReactSessionParameters } from '../createMultisynqSession'
import { ReactModel } from '../ReactModel'

export interface ReactSessionParameters<M extends ReactModel> extends Omit<MultisynqReactSessionParameters<M>, 'name'> {
  name?: string
  password?: string
}

interface MultisynqRootProps<M extends ReactModel> {
  sessionParams: ReactSessionParameters<M>
  children: React.ReactElement | React.ReactElement[] | null
  showChildrenWithoutSession?: boolean
  deferSession?: boolean
}

interface SessionParamsState<M extends ReactModel> extends ReactSessionParameters<M> {
  join: boolean
}

/** MultisynqRoot component implements the default implementation of the logic described for createMultisynqSession function.
 */
export function MultisynqRoot<M extends ReactModel>({
  sessionParams,
  children,
  showChildrenWithoutSession = false,
  deferSession = false,
}: MultisynqRootProps<M>): JSX.Element | null {
  // Make sure we only create a new session once, even with strict mode
  const multisynqSessionRef = useRef<MultisynqSession<MultisynqReactView<M>> | 'joining' | null>(null)

  // Used for smooth session transitioning
  const nextSessionRef = useRef<MultisynqSession<MultisynqReactView<M>> | null>(null)

  const [multisynqSession, setMultisynqSession] = useState<MultisynqSession<MultisynqReactView<M>> | null>(null)
  const [multisynqView, setMultisynqView] = useState<MultisynqReactView<M> | null>(null)
  const [currentSessionParams, setCurrentSessionParams] = useState<SessionParamsState<M>>(() => {
    if(!deferSession) {
      if(!sessionParams.name) {
        sessionParams.name = App.randomSession()
      }
      if(!sessionParams.password) {
        sessionParams.password = App.randomPassword()
      }
    }
    return { ...sessionParams, join: !deferSession }
  })

  // This function updates the state (session, view)
  const updateState = useCallback(
    (session: MultisynqSession<MultisynqReactView<M>> | null) => {
      setMultisynqSession(session)
      setMultisynqView(session?.view ?? null)
    },
    [setMultisynqSession, setMultisynqView]
  )

  // Update currentSessionParams when props change
  useEffect(
    () => setCurrentSessionParams({ ...sessionParams, join: !deferSession }),
    [sessionParams, deferSession, setCurrentSessionParams]
  )

  // Session management
  // When joining a new session, we should setup view callbacks
  // Before joining a new session, we should leave the current one
  useEffect(() => {
    async function join(): Promise<void> {
      // If already joined, do nothing
      if (multisynqSessionRef.current) return

      // If explicitly told to not join, do not join
      if (!currentSessionParams.join) return

      if (nextSessionRef.current) {
        // We are already joined to the next session
        multisynqSessionRef.current = nextSessionRef.current
        nextSessionRef.current = null
      } else {
        multisynqSessionRef.current = 'joining'
        multisynqSessionRef.current = await createMultisynqSession<M>(currentSessionParams as any)
      }
      const session = multisynqSessionRef.current

      updateState(session)

      setSyncedCallback((flag) => {
        const session = multisynqSessionRef.current
        if (session !== null && session !== 'joining') {
          if (flag) updateState(session)
          if (session.view) {
            session.view.detachCallback = () => {
              setMultisynqView(null)
            }
          }
        }
      })
    }

    join()

    return () => {
      const session = multisynqSessionRef.current
      if (session !== null && session !== 'joining') {
        multisynqSessionRef.current = null
        session.leave()
      }
    }
  }, [currentSessionParams, updateState])

  const setSession = useCallback(
    async (params: Partial<Omit<ReactSessionParameters<M>, 'model'>>) => {
      // Smooth session transitioning: Only update state
      // after we joined the next session
      const newParams = {
        ...currentSessionParams,
        ...params,
        join: true,
      }

      if(!newParams.name) {
        newParams.name = App.randomSession()
      }
      if(!newParams.password) {
        newParams.password = App.randomPassword()
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { join, ...args } = newParams

      createMultisynqSession(args).then((newSession) => {
        nextSessionRef.current = newSession
        setCurrentSessionParams(newParams)
      })
    },
    [setCurrentSessionParams, currentSessionParams]
  )

  const leaveSession = useCallback(() => {
    setCurrentSessionParams((prev) => ({ ...prev, join: false }))
    updateState(null)
  }, [setCurrentSessionParams, updateState])

  if ((currentSessionParams.join && multisynqView) || showChildrenWithoutSession) {
    const contextValue = {
      sessionParams: currentSessionParams,
      session: multisynqSession,
      view: multisynqView,
      model: multisynqView?.model || null,
      setSession,
      leaveSession
    }
    return (
      <MultisynqContext.Provider value={contextValue}>
        {children}
      </MultisynqContext.Provider>
    )
  }
  return null
}
