import { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Img } from 'react-image';
import Loader from '@/icons/animatedIcons/Loader';

type ImageUploadProps = {
    maxSizeMB?: number;
    initialImageUrl?: string | null; // Add prop for existing image URL
    onFileChange: (file: FileWithPath | null) => void;
};

const ImageInput = ({
    maxSizeMB = 5,
    initialImageUrl = null,
    onFileChange,
}: ImageUploadProps) => {
    const [file, setFile] = useState<FileWithPath | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // For displaying URLs
    const [error, setError] = useState<string | null>(null);

    // Initialize with existing image URL
    useEffect(() => {
        if (initialImageUrl) {
            setImageUrl(initialImageUrl);
        }
    }, [initialImageUrl]);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[], rejectedFiles: unknown[]) => {
            setError(null);

            if (rejectedFiles.length > 0) {
                setError(
                    `File rejected. Max size: ${maxSizeMB}MB, allowed types: JPEG/PNG`
                );
                return;
            }

            const newFile = acceptedFiles[0] || null;
            setFile(newFile);
            setImageUrl(newFile ? URL.createObjectURL(newFile) : null); // Clear URL when removing file
            onFileChange(newFile);
        },
        [maxSizeMB, onFileChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        maxSize: maxSizeMB * 1024 * 1024,
        maxFiles: 1,
        multiple: false,
    });

    const removeFile = () => {
        setFile(null);
        setImageUrl(null);
        onFileChange(null);
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
          ${isDragActive
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
          ${error ? 'animate-shake border-red-500' : ''}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-3">
                    <FiUpload
                        className={`text-3xl ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
                    />
                    <p className="text-gray-600">
                        {isDragActive
                            ? 'Drop your image here'
                            : 'Drag & drop an image, or click to browse'}
                    </p>
                    <p className="text-xs text-gray-400">
                        JPEG/PNG, max {maxSizeMB}MB
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center"
                >
                    {error}
                </motion.p>
            )}

            {/* Thumbnail - Shows either uploaded file or existing URL */}
            <AnimatePresence>
                {(file || imageUrl) && (
                    <div className="relative group rounded-lg overflow-hidden border border-gray-200 mx-auto">
                        <Img
                            src={file ? URL.createObjectURL(file) : imageUrl || ''}
                            alt={file?.name || "Uploaded image"}
                            className="w-full h-48 object-contain"
                            loader={<div className='h-48 flex items-center justify-center'><div className='w-[14rem]'><Loader /></div> </div>}
                        />
                        <button
                            type="button"
                            onClick={removeFile}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FiX size={14} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-xs truncate">
                                {file?.name.substring(0, 30) || "Existing image"}
                                {file?.name && file.name.length > 30 && '...'}
                            </p>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!file && !imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-gray-400"
                >
                    <FiImage className="text-4xl mb-2" />
                    <p>No image selected</p>
                </motion.div>
            )}
        </div>
    );
};

export default ImageInput;