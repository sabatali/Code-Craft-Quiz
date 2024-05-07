import React from 'react';
import { Link } from 'react-router-dom';

function QuizCard({ $id, title, Instruction, difficultyLevel }) {
    console.log("🚀 ~ PostCard ~ title:", title);

    console.log(typeof Instruction, Instruction);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full px-10 my-4 py-6 rounded-lg shadow-xl border">
                <div className="flex justify-between items-center">
                    <span className="font-light bg-green-600 px-2 py-1 rounded text-white">{difficultyLevel}</span>
                    <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">C++</a>
                </div>
                <div className="mt-2 text-left">
                    <a className="text-2xl text-[#fff] font-bold hover:text-gray-400" href="#">{title}</a>
                    <p className="mt-2 text-blue-200" dangerouslySetInnerHTML={{ __html: Instruction }}></p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <a className="text-blue-600 hover:underline" href="#">Solve</a>
                    <div>
                        <a className="flex items-center" href="#">
                            <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar" />
                            <h1 className="text-[#fff] font-bold">Khatab wedaa</h1>
                        </a>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default QuizCard;
