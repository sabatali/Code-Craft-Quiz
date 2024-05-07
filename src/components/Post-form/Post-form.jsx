import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input";
import RTE from "../RTE";
import Button from "../Button";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            Instruction: post?.Instruction || "",
            Note: post?.Note || "",
            Solution: post?.Solution || "",
            Examples: post?.Examples || "",
            difficltyLevel: post?.difficltyLevel || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* <Input
                    label="Note :"
                    placeholder="Note"
                    className="mb-4"
                    {...register("Note", { required: true })}
                /> */}

                <textarea
                    rows={5}
                    cols={60}
                    label="Solution :"
                    placeholder="Solution"
                    className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    {...register("Solution", { required: true })}
                />

                {/* <Input
                    label="Examples :"
                    placeholder="Examples"
                    className="mb-4"
                    {...register("Examples", { required: true })}
                /> */}

                <Input
                    label="difficultyLevel :"
                    placeholder="Difficulty Level"
                    className="mb-4"
                    {...register("difficultyLevel", { required: true })}
                />

                <RTE label="Instruction :" name="Instruction" control={control} defaultValue={getValues("Instruction")} />
            </div>
            <div className="w-1/3 px-2">
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
