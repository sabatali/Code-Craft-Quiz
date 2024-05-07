import React, { useState, useEffect } from 'react';
import { createContext, useContext } from "react";
import runChat from "../conf/gemini";

const BardContext = createContext();

export const useBardContext = () => {
    return useContext(BardContext);
}

export const BardContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [resentPrompt, setResentPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (showResponse && result) {
    //         const words = result.split(' ');
    //         let currentIndex = 0;
    //         const interval = setInterval(() => {
    //             setResult(prevResult => prevResult + ' ' + words[currentIndex]);
    //             currentIndex++;
    //             if (currentIndex >= words.length) {
    //                 clearInterval(interval);
    //             }
    //         }, 300); // Adjust the interval as needed
    //     }
    // }, [showResponse, result]);

    const onset = async (prompt) => {
        setLoading(true)
        setShowResponse(true)
        const res = await runChat(input)
        const resArray = res.split("**");
        let newRes;
        for (let i = 0; i < resArray.length; i++) {
            if (i === 0 || i % 2 != i) {
                newRes += resArray[i];
            } else {
                newRes += "<b>" + resArray[i] + "</b>";
            }
        }
        let mainRes = newRes.split("*").join("</br>")
        setResentPrompt(input)
        setLoading(false)
        setResult(mainRes)
    }

    const value = {
        onset,
        setInput,
        result,
        loading,
        resentPrompt,
        showResponse,
    }

    return <BardContext.Provider value={value}>{children}</BardContext.Provider>
}
