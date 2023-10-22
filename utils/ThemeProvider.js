import { createContext, useState } from "react";
const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [userTheme, setuserTheme] = useState('light')
    const [userPreference, setUserPreference] = useState('system')
    return (
        <ThemeContext.Provider value={{ userTheme, setuserTheme, userPreference, setUserPreference }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }