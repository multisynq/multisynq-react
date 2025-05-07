import { useMultisynqContext } from "./useMultisynqContext";

export function useLeaveSession() {
    const { leaveSession } = useMultisynqContext()
    return leaveSession
}
