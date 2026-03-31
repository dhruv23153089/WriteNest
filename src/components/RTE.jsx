import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {Controller} from "react-hook-form";

const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;

export default function RTE({name, control, label, defaultValue=""}) {
    return (
        <div className='w-full'>
            {label && <label className='mb-2 inline-block pl-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({field: {onChange, value}})=>(
                    tinymceApiKey ? (
                        <Editor
                            apiKey={tinymceApiKey}
                            initialValue={defaultValue}
                            init={{
                                branding: false,
                                height: 500,
                                menubar: true,
                                toolbar_mode: "sliding",
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                mobile: {
                                    menubar: false,
                                    toolbar_mode: "sliding",
                                    toolbar:
                                        "undo redo | bold italic | alignleft aligncenter | bullist numlist | removeformat",
                                },
                            }}
                            value={value}
                            onEditorChange={onChange}
                        />
                    ) : (
                        <textarea
                            className="w-full min-h-[320px] rounded-[28px] border border-[color:var(--line)] bg-[rgba(255,255,255,0.06)] px-5 py-4 text-slate-100 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 sm:min-h-[500px]"
                            placeholder="Write your post content here..."
                            value={value || ""}
                            onChange={(event) => onChange(event.target.value)}
                        />
                    )
                )}
            />
        </div>
       
    )
}
