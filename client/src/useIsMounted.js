/**
 * Custom hook to check if component is mounted or not
 *
 * @credit https://codesandbox.io/s/58979309checking-if-a-component-is-unmounted-using-react-hooks-x1q3t?file=/src/useIsMounted.ts
 */
import { useCallback, useEffect, useRef } from "react";

export default function useIsMounted() {
    const isMountedRef = useRef(true);
    const isMounted = useCallback(() => isMountedRef.current, []);

    useEffect(() => {
        return () => void (isMountedRef.current = false);
    }, []);

    return isMounted;
}