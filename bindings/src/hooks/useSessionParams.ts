import { useMultisynqContext } from "./useMultisynqContext"

export function useSessionParams() {
    const { sessionParams } = useMultisynqContext()
    return sessionParams
}
