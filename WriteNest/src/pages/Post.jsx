import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

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
        <div className="py-4 sm:py-8">
            <Container>
                <article className="glass-panel rounded-[40px] overflow-hidden">
                    <div className="relative overflow-hidden border-b border-[color:var(--line)] bg-[rgba(30,107,111,0.08)]">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="aspect-[16/10] w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = appwriteService.getFileView(post.featuredImage);
                            }}
                        />

                        <div className="absolute inset-0 hidden bg-gradient-to-t from-[rgba(18,26,38,0.55)] via-transparent to-transparent sm:block" />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6 sm:gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-white/90" textColor="text-slate-900" className="px-4 py-2 sm:px-5 sm:py-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-[linear-gradient(135deg,#ef4444,#dc2626)]" className="px-4 py-2 sm:px-5 sm:py-3" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="border-b border-[color:var(--line)] px-5 py-5 sm:px-10 sm:py-8">
                        <p className="page-eyebrow">Article Detail</p>
                        <h1 className="page-title mt-4 max-w-4xl break-words text-3xl text-slate-100 sm:text-4xl lg:text-5xl xl:text-6xl">
                            {post.title}
                        </h1>
                    </div>
                    <div className="px-6 py-8 sm:px-10 sm:py-10">
                        <div className="browser-css prose max-w-none prose-headings:font-serif prose-headings:text-slate-100 prose-p:text-slate-200 prose-strong:text-white prose-li:text-slate-200">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}
