import React from 'react';
import { useForm } from 'react-hook-form';
import sanitizeHtml from 'sanitize-html';
import { CommentFormData } from "../../types/commentFormData";

interface CommentFormProps {
    parentId?: number;
    onSubmitComment: (data: CommentFormData, files?: File[]) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ parentId, onSubmitComment }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues } = useForm<CommentFormData>();

    const onSubmit = (data: CommentFormData) => {
        data.text = sanitizeHtml(data.text, {
            allowedTags: ['a', 'code', 'i', 'strong'],
            allowedAttributes: { a: ['href', 'title'] },
        });
        const files = getValues('files');

        onSubmitComment({ ...data, parentId }, files);
    };

    const appendTag = (tag: string) => {
        const currentText = getValues('text') || '';
        const newText = `${currentText}<${tag}></${tag}>`;
        setValue('text', newText);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    {...register('username', {required: true, pattern: /^[a-zA-Z0-9]+$/})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
                {errors.username && <span className="text-red-500 text-xs">Only alphanumeric characters allowed</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
                {errors.email && <span className="text-red-500 text-xs">Enter a valid email</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Home Page</label>
                <input
                    {...register('homePage', {pattern: /^https?:\/\/[^\s$.?#].[^\s]*$/})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">CAPTCHA</label>
                <input
                    {...register('captcha', {required: true})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
                {errors.captcha && <span className="text-red-500 text-xs">Captcha is required</span>}
            </div>
            <div className="flex space-x-2 mb-2">
                <button type="button" onClick={() => appendTag('i')} className="px-2 py-1 border rounded">[i]</button>
                <button type="button" onClick={() => appendTag('strong')}
                        className="px-2 py-1 border rounded">[strong]
                </button>
                <button type="button" onClick={() => appendTag('code')} className="px-2 py-1 border rounded">[code]
                </button>
                <button type="button" onClick={() => appendTag('a href="#"')} className="px-2 py-1 border rounded">[a]
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <textarea
                    {...register('text', {required: true})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
                {errors.text && <span className="text-red-500 text-xs">Text is required</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Files</label>
                <input
                    {...register('files')}
                    type="file"
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
            >
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;
