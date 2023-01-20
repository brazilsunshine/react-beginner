import {useState} from "react";

/**
 * Custom Hook useToggle
 *
 * It toggles the visibility of features one and features two
 *
 * It is being used on TaskList.jsx
 */
function useToggle (initialState = true)
{
    const [isVisible, setIsVisible] = useState(initialState)

    function toggle() {
        setIsVisible(prevVisible => !prevVisible) // set the value to the opposite of the current state
    }

    return [isVisible, toggle];

}

export default useToggle