import { createContext, useState } from 'react';

const TakeAttendanceContext = createContext();

function TakeAttendance({ children }) {
    const [active, setActive] = useState(false);

    const handleShow = () => {
        setActive(!active);
    };

    const value = {
        active,
        handleShow,
    };

    return <TakeAttendanceContext.Provider value={value}>{children}</TakeAttendanceContext.Provider>;
}

export { TakeAttendanceContext, TakeAttendance };
