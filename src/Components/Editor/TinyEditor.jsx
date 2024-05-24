import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller, useController } from 'react-hook-form';


export default function TinyEditor( { name, control, label, defaultValue = "", required, error } ) {

    window.addEventListener( 'storage', () => {
        console.log( "Change to local storage!" );
        // ...
    } )
    useController( {
        name,
        control,
        rules: {
            required: required ? "Write your content " : false,
            // we can also use regex for validation
            // required : true,
            // pattern: {
            //     value: /“< (“ ”]”|' [^’]’| [^'”>])>”;&]/,
            //     message: "Please Enter a Valid Title",
            // }
        },
    } )
    return (
        <div className='w-full'>
            {label && <label className='block mb-2 font-medium text-gray-900 dark:text-white'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}

                render={( { field: { onChange } } ) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
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
                            skin: `${localStorage.getItem( 'themeMode' ) === 'dark' ? 'oxide-dark' : 'oxide'}`,
                            content_css: `${localStorage.getItem( 'themeMode' ) || 'default'}`
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
            <p className='text-red-500 h-6 text-sm mt-[4px]'>{error}</p>

        </div>
    )
}