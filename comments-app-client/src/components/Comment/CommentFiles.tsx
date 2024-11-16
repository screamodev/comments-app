import React from 'react';
import { CommentFile } from "../../config/types/commentFile";

interface CommentFilesProps {
    files?: CommentFile[];
}

const CommentFiles: React.FC<CommentFilesProps> = ({ files }) => {
    if (!files || files.length === 0) return null;

    const baseUrl = process.env.REACT_APP_API_KEY;

    return (
        <div className="mt-3">
            {files.map((file) => (
                file.fileType.startsWith('image/') ? (
                    <a
                        key={file.id}
                        href={baseUrl + file.url}
                        data-lightbox={`comment-${file.id}`}
                        data-title={file.filename}
                    >
                        <img
                            src={baseUrl + file.url}
                            alt={file.filename}
                            className="w-20 h-20 object-cover rounded-md mr-2 mb-2 cursor-pointer"
                        />
                    </a>
                ) : (
                    <a
                        key={file.id}
                        href={baseUrl + file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-500 underline mt-2"
                    >
                        {file.filename} ({(file.fileSize / 1024).toFixed(2)} KB)
                    </a>
                )
            ))}
        </div>
    );
};

export default CommentFiles;
