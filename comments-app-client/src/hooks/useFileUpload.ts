import { useState } from 'react';
import { preUploadFiles } from '../api/commentApi';

export const useFileUpload = () => {
    const [preUploadedFiles, setPreUploadedFiles] = useState<{ file: File}[]>([]);
    const [jobIds, setJobIds] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const jwtToken = localStorage.getItem('token') || '';

        if (!files) return;

        setIsUploading(true);
        try {
            const { uploadedFiles, jobIds: newJobIds } = await preUploadFiles(Array.from(files), jwtToken);

            setPreUploadedFiles((prev) => [...prev, ...uploadedFiles]);
            setJobIds((prevJobIds) => [...prevJobIds, ...newJobIds]);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = (index: number) => {
        setPreUploadedFiles((prev) => prev.filter((_, i) => i !== index));
        setJobIds((prev) => prev.filter((_, i) => i !== index));
    };

    return { preUploadedFiles, jobIds, handleFileChange, removeFile, isUploading };
};
