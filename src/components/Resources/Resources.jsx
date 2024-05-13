import React, { useState } from 'react';
import axios from 'axios';
import Input from '../Input';

const Resources = ({ post }) => {
    const [searchText, setSearchText] = useState(post.title);
    const [searchResults, setSearchResults] = useState([]);
    console.log("🚀 ~ Resources ~ searchResults:", searchResults)
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when starting the search
        try {
            const response = await axios.post('http://localhost:3000/search', { text: searchText });
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false); // Set loading to false when search completes (or fails)
        }
    };

    return (
        <div>
            <h1 className='text-[#fff] px-5'>Get Resources</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex shadow-lg rounded-md p-4">
                    <Input
                        className="mb-0   rounded-none"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <button
                        className="bg-blue-500 px-3 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Loading...' : 'Get'}
                    </button>
                </div>
            </form>
            {searchResults.length > 0 && (
                <div>
                    <h2 className='text-[#fff] px-5 mb-3'>Resources:</h2>
                    <ul className='px-5 text-[#000] m-5 bg-white border py-5'>
                        {searchResults.map((result, index) => (
                            <li key={index}>
                                <a className='text-[#00a]' href={result.url} target="_blank" rel="noopener noreferrer">{result.title || "Click Me"}</a>
                                <p>{result.Content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Resources;
