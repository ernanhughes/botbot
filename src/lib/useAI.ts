import { useEffect, useState } from "react";

export function useAI() {
    const [enabled, setEnabled] = useState(false);
    const [ai, setAI] = useState(null);

    useEffect(() => {
        const checkAI = async () => {
            // @ts-expect-error ai not available yet
            if (window.ai) {
                // @ts-expect-error ai not available yet
                const canCreate = await window.ai.canCreateTextSession();
                setEnabled(canCreate);
                if (canCreate) {
                    // @ts-expect-error ai not available yet
                    const session = await window.ai.createTextSession();
                    setAI(session);
                }
            }
        };
        checkAI();
    }, []);

    return [enabled, ai];
}