import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Container from "../components/Container/Container";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import AIHelper from "../components/AIHelper/AIHelper";
import Instruction from "../components/Instruction/Instruction";
import "../assets/AppPost.css"
import Solution from "../components/Solution/Solution";
import Resources from "../components/Resources/Resources";

export default function Post() {
    const [selectedComponent, setSelectedComponent] = useState("youtube")
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    console.log("🚀 ~ Post ~ slug:", slug)
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const handleComponent = (component) => {
        setSelectedComponent(component);
    }

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="grid-bg ba-grid anim">
            <Container>
                <div className="w-full flex z-20 justify-center mb-4 relative p-2">
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-30 mb-70 relative z-[999]">
                    <button
                        className={`shadow-lg px-4 py-2 ${selectedComponent === "instruction" ? "bg-red-600 text-white" : "bg-white text-red-600"} hover:bg-red-600 hover:text-white`}
                        onClick={() => handleComponent("instruction")}
                    >
                        instruction
                    </button>
                    <button
                        className={`shadow-lg px-4 py-2 ${selectedComponent === "codeEditor" ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white" : "bg-white text-pink-600"} hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-500 hover:text-white`}
                        onClick={() => handleComponent("codeEditor")}
                    >
                        codeEditor
                    </button>
                    <button
                        className={`shadow-lg px-4 py-2 ${selectedComponent === "Resources" ? " bg-[#fff] text-blue-800" : "bg-white text-black"} hover:bg-blue-700 hover:text-white`}
                        onClick={() => handleComponent("Resources")}
                    >
                        Resources
                    </button>
                    <button
                        className={`shadow-lg px-4 py-2 ${selectedComponent === "AIHelper" ? "bg-black text-white" : "bg-white text-black"} hover:bg-black hover:text-white`}
                        onClick={() => handleComponent("AIHelper")}
                    >
                        AIHelper
                    </button>
                    <button
                        className={`shadow-lg px-4 py-2 ${selectedComponent === "Solution" ? " bg-[#fff] text-green-800" : "bg-white text-black"} hover:bg-green-700 hover:text-white`}
                        onClick={() => handleComponent("Solution")}
                    >
                        Solution
                    </button>

                </div>

                <div className="r relative z-[99]">
                    {selectedComponent === "instruction" && <Instruction post={post} />}
                    {selectedComponent === "codeEditor" && <CodeEditor />}
                    {selectedComponent === "AIHelper" && <AIHelper />}
                    {selectedComponent === "Solution" && <Solution post={post} />}
                    {selectedComponent === "Resources" && <Resources post={post} />}
                </div>
            </Container>
        </div>
    ) : null;
}
