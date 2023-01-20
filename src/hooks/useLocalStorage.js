import {useEffect, useState} from "react";

function useLocalStorage (key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)

        return item ? JSON.parse(item) : initialValue;
        // if item exists/true then JSON.parse the item
        // if item doesn't exist/false then return the initial value
    });

    /**
     * useEffect tells React that your component needs to do something when the component is mounted.
     *
     * Update the value 'name' in localStorage whenever the name changes
     *
     * Second parameter [value] which tells when useEffect should run
     */
    useEffect(() => { // localStorage does not support JSON, so we need to stringify it
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue];
}

export default useLocalStorage