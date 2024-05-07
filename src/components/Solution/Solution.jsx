import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Solution = ({ post }) => {
    const [selectedStyle, setSelectedStyle] = useState(docco);

    const toggleStyle = () => {
        setSelectedStyle(selectedStyle === docco ? dark : docco);
    }

    return (
        <div className='my-8'>
            <div onClick={toggleStyle} className='cursor-pointer my-3 rounded-sm bg-white p-2 w-[110px]' >
                <p>Toggle Color</p>
            </div>
            <SyntaxHighlighter language="javascript" style={selectedStyle} >
                {post.Solution}
            </SyntaxHighlighter>
        </div>
    );
};

export default Solution;
