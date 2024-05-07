import React from 'react';
import { useBardContext } from '../../Context/Context';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Logo from '../Logo';

const AIHelper = () => {
    const {
        setInput,
        input,
        onset,
        result,
        loading: aiLoading,
        showResponse,
    } = useBardContext();

    const renderResult = () => {
        if (aiLoading) {
            return (
                <div className="animate-pulse flex space-x-4 ">
                    <div className="p-4 mx-auto">
                        <div className="animate-pulse space-x-4">
                            <div className="flex-1 space-y-6 py-1 justify-center align-middle w-[200px]">
                                <div className="h-2 w-[100%]  bg-orange-400 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 w-[100%] bg-orange-400 rounded col-span-2"></div>
                                        <div className="h-2 w-[100%] bg-orange-400 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 w-[100%] bg-orange-400 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (result) {
            const lines = result.split("\n");
            const formattedResult = [];

            let inCodeBlock = false;
            let codeLines = [];
            let language = null;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.startsWith("```")) {
                    if (inCodeBlock) {
                        formattedResult.push(
                            <SyntaxHighlighter language={language} style={docco}>
                                {codeLines.join("\n")}
                            </SyntaxHighlighter>
                        );
                        codeLines = [];
                        inCodeBlock = false;
                    } else {
                        language = line.slice(3).trim();
                        inCodeBlock = true;
                    }
                } else {
                    if (inCodeBlock) {
                        codeLines.push(line);
                    } else {
                        // Handle HTML tags and special characters
                        const cleanLine = line.replace(/<\/?[^>]+(>|$)/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                        formattedResult.push(<div>{cleanLine}</div>);
                    }
                }
            }

            return <div className='w-[100%] px-6'>{formattedResult}</div>;
        } else {
            return <div>No result available.</div>;
        }
    };

    return (
        <div>
            <div className="flex shadow-lg rounded-md p-4">
                <input
                    className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder="Enter your query and get details"
                />
                <button
                    className="bg-blue-500 px-3 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline"
                    onClick={() => onset(input)}
                >
                    Send
                </button>
            </div>
            <div className="flex container border width-[100%] gap-2 align-middle text-[#000] shadow-lg my-7 px-3 py-9">
                <div className="w-[90px]">
                    <Logo width="40px" />
                </div>
                <div className='text-[#fff] w-[100%]'>  {renderResult()}</div>
            </div>
        </div>
    );
};

export default AIHelper;
