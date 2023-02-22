import { useEffect, useState } from "react";

const PREFIX = 'messaging-app-';

export const useLocalStorage = (key: string, initialValue?: string | string[] | (() => void)): string | any[] => {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue !== 'undefined' && jsonValue !== null) return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    });

    useEffect(() => {
        if(!value) return
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value]);


    return [value, setValue];

};