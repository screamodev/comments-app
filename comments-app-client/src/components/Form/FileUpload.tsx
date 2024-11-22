import React from 'react'
import { truncateFilename } from '../../utils/truncateFilename'

interface FileUploadProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    preUploadedFiles: { file: File }[]
    removeFile: (index: number) => void
    isUploading: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({
    handleFileChange,
    preUploadedFiles,
    removeFile,
    isUploading,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            Upload Files
        </label>
        <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            disabled={isUploading || preUploadedFiles.length >= 2}
        />
        {preUploadedFiles.map((file, index) => (
            <div key={index} className="mt-2 flex items-center space-x-2">
                <span>{truncateFilename(file.file.name)}</span>
                <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </div>
        ))}
        {preUploadedFiles.length >= 2 && (
            <p className="text-xs text-gray-500">
                You can only upload up to 2 files.
            </p>
        )}
    </div>
)

export default FileUpload
