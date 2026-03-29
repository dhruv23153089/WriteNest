import React, {useCallback, useEffect, useState} from 'react'
import { useForm, useWatch } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import service from '../../appwrite/config'
import authService from '../../appwrite/auth'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({post}) {
    const [uploadMessage, setUploadMessage] = useState("");
    const {register, handleSubmit, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const title = useWatch({
        control,
        name: "title",
    });

    const submit= async (data) => {
        setUploadMessage("");

        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            
            if(file){
                setUploadMessage("Image uploaded successfully.");
                await service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, 
                {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                }
            );
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const currentUser = userData || await authService.getCurrentUser();

            if (!currentUser?.$id) {
                return;
            }

            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if(file){
                setUploadMessage("Image uploaded successfully.");
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId: currentUser.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }else{
            return "";
        }
    }, []);

    useEffect(() => {
        setValue("slug", slugTransform(title || ""), {shouldValidate: true});
    }, [title, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,360px)]">
            <div className="glass-panel rounded-[36px] p-5 sm:p-7">
                <div className="mb-6">
                    <p className="page-eyebrow">{post ? "Edit story" : "Compose story"}</p>
                    <h2 className="page-title mt-4 text-4xl text-slate-300">{post ? "Polish your post details" : "Shape your next article"}</h2>
                    <p className="page-copy mt-3 max-w-2xl">Keep the content workflow exactly the same, now with a calmer writing surface and a clearer publishing sidebar.</p>
                </div>
                <div className="space-y-5">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="space-y-6">
                <div className="glass-panel rounded-[36px] p-5 sm:p-6">
                    <p className="page-eyebrow mb-4">Publishing</p>
                    <div className="space-y-5">
                        <Input
                            label="Featured Image :"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {uploadMessage && (
                            <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {uploadMessage}
                            </p>
                        )}
                        {post && (
                            <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-[rgba(30,107,111,0.08)] sm:aspect-video lg:aspect-[4/3]">
                                <img
                                    src={service.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="h-full w-full object-contain"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = service.getFileView(post.featuredImage);
                                    }}
                                />
                            </div>
                        )}
                        <Select
                            options={[
                                { label: "Active", value: "active" },
                                { label: "Inactive", value: "inactive" },
                            ]}
                            label="Status"
                            {...register("status", { required: true })}
                        />
                        <Button
                            type="submit"
                            bgColor={post ? "bg-[linear-gradient(135deg,var(--teal),#25545f)]" : "bg-[linear-gradient(135deg,var(--accent),var(--accent-deep))]"}
                            className="w-full"
                        >
                            {post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
                <div className="glass-panel-strong rounded-[32px] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Writing tips</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                        <li>Use a clear title so readers can identify your topic at a glance.</li>
                        <li>The slug updates automatically, but you can still fine-tune it before publishing.</li>
                        <li>A featured image helps the post stand out in list and detail views.</li>
                    </ul>
                </div>
            </div>
        </form>
    );
}
 
