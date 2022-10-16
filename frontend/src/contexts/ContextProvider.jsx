import React, { createContext, useContext, useState} from "react";

const StateContext = createContext()
// const initialState = {
//     chat: false,
//     cart: false,
//     userProfile: false,
//     notif: false
// }

export const ContextProvider = ({children}) => {

    const [activeSign, setActiveSign] = useState(false)

    // const [activeMenu, setActiveMenu] = useState(true)
    // const [isClick, setIsClick] = useState(initialState)
    // const [screenSize, setScreenSize] = useState(undefined)
    // const [currentColor, setCurrentColor] = useState('#03C9D7')
    // const [currentMode, setCurrentMode] = useState('Light')
    // const [themeSettings, setThemeSettings] = useState(false)

    // const setMode = (e) => {
    //     setCurrentMode(e.target.value)

    //     localStorage.setItem('themeMode', e.target.value)
    // }
    // const setColor = (color) => {
    //     setCurrentColor(color)
    //     localStorage.setItem('colorMode', color)
    // }


    // const handleClick = (click) => setIsClick({ ...initialState, [click] : true})

    return (
    <StateContext.Provider
        value={{  
            // currentColor, currentMode, 
            // activeMenu, setActiveMenu,
            // screenSize, setScreenSize, 
            // handleClick, 
            // isClick, initialState, setIsClick,
            // setColor, setCurrentColor, 
            // setCurrentMode, setMode, 
            // themeSettings, setThemeSettings
            activeSign, setActiveSign
        }}
    >
        {children}
    </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)