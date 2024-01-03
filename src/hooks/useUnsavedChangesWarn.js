import React, { useEffect, useState } from "react";

const useUnsavedChangesWarn = () => {
    const [isDirty, setDirty] = useState(false)
    useEffect(() => {
        if (!isDirty) return;
        //Detecting browser closing
        const handleOnBeforeUnload = (event) => {
            event.preventDefault();
            return (event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        }
    }, [isDirty])

    return [() => setDirty(true), () => setDirty(false)]

}

export default useUnsavedChangesWarn;