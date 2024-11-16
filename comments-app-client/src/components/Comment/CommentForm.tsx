import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFileUpload } from '../../hooks/useFileUpload';
import { CommentFormData } from '../../config/types/commentFormData';
import { sanitizeText } from "../../utils/sanitize";
import { isHtmlValid } from "../../utils/isHtmlValid";
import TextInput from "../Form/TextInput/TextInput";
import FormatButtons from "../Form/FormatButtons/FormatButtons";
import TextareaInput from "../Form/TextareaInput/TextareaInput";
import FileUpload from "../Form/FileUpload/FileUpload";

interface CommentFormProps {
    onSubmitComment: (data: CommentFormData) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmitComment }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        setError,
        clearErrors,
    } = useForm<CommentFormData>();

    const { preUploadedFiles, jobIds, handleFileChange, removeFile, isUploading } = useFileUpload();

    const [previewMode, setPreviewMode] = useState(false);
    const [previewContent, setPreviewContent] = useState<string>("");

    const onSubmit = (data: CommentFormData) => {
        const textContent = data.text || '';

        if (!isHtmlValid(textContent)) {
            setError('text', { type: 'validate', message: 'Your text contains invalid or unclosed HTML tags.' });
            return;
        } else {
            clearErrors('text');
        }

        data.text = sanitizeText(textContent);
        onSubmitComment({ ...data, jobIds });
    };

    const appendTag = (tag: string) => {
        const currentText = getValues('text') || '';
        const newText = `${currentText}<${tag}></${tag}>`;
        setValue('text', newText);
    };

    const togglePreview = () => {
        if (!previewMode) {
            const textContent = getValues('text') || '';
            if (!isHtmlValid(textContent)) {
                setError('text', { type: 'validate', message: 'Your text contains invalid or unclosed HTML tags.' });
                return;
            }
            setPreviewContent(sanitizeText(textContent));
        }
        setPreviewMode(!previewMode);
    };

    return (
        <div>
            {previewMode ? (
                <div className="border rounded-md p-4 bg-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Comment Preview</h2>
                    <div
                        className="text-gray-800 mb-4"
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                    ></div>
                    <div className="mt-4">
                        <h3 className="font-medium text-gray-600">Attached Files:</h3>
                        <div className="flex flex-wrap mt-2">
                            {preUploadedFiles.map((fileItem, index) =>
                                fileItem.file.type.startsWith('image/') ? (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(fileItem.file)}
                                        alt={fileItem.file.name}
                                        className="w-20 h-20 object-cover rounded-md mr-2 mb-2"
                                    />
                                ) : (
                                    <a
                                        key={index}
                                        href={URL.createObjectURL(fileItem.file)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-blue-500 underline mr-2 mb-2"
                                    >
                                        {fileItem.file.name} ({(fileItem.file.size / 1024).toFixed(2)} KB)
                                    </a>
                                )
                            )}
                        </div>
                        <button
                            onClick={togglePreview}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mt-4"
                        >
                            Edit Comment
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput
                        label="Username"
                        name="username"
                        register={register}
                        errors={errors.username}
                        validation={{ required: true, pattern: /^[a-zA-Z0-9]+$/ }}
                        errorMessage="Only alphanumeric characters allowed"
                    />

                    <TextInput
                        label="Email"
                        name="email"
                        register={register}
                        errors={errors.email}
                        validation={{
                            required: true,
                            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        }}
                        errorMessage="Enter a valid email"
                    />

                    <TextInput
                        label="Home Page"
                        name="homePage"
                        register={register}
                        validation={{ pattern: /^https?:\/\/[^\s$.?#].[^\s]*$/ }}
                    />

                    <TextInput
                        label="CAPTCHA"
                        name="captcha"
                        register={register}
                        errors={errors.captcha}
                        validation={{ required: true }}
                        errorMessage="Captcha is required"
                    />

                    <FormatButtons appendTag={appendTag} />

                    <TextareaInput
                        label="Text"
                        name="text"
                        register={register}
                        errors={errors.text}
                        validation={{ required: true }}
                    />

                    <FileUpload
                        handleFileChange={handleFileChange}
                        preUploadedFiles={preUploadedFiles}
                        removeFile={removeFile}
                        isUploading={isUploading}
                    />

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={togglePreview}
                            className="w-full py-2 px-4 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
                            disabled={isUploading}
                        >
                            Add Comment
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CommentForm;
