import React from 'react'
import parse from "html-react-parser";


const Instruction = ({ post }) => {
    console.log("🚀 ~ Instruction ~ post:", post)
    return (
        <div className="my-7 bg-transparent border rounded-lg shadow-md p-6 text-[#fff]">
            <h2 className="text-2xl font-medium mb-2">{post.title}</h2>
            <p className="">{parse(post.Instruction)}</p>
        </div>

    )
}

export default Instruction
