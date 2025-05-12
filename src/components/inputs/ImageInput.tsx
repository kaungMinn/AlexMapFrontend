import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type ImageUploadProps = {
    maxSizeMB?: number;
    onFileChange: (file: FileWithPath | null) => void; // Changed to single file
};

const ImageInput = ({
    maxSizeMB = 5,
    onFileChange,
}: ImageUploadProps) => {
    const [file, setFile] = useState<FileWithPath | null>(null); // Single file state
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[], rejectedFiles: unknown[]) => {
            setError(null);

            if (rejectedFiles.length > 0) {
                setError(
                    `File rejected. Max size: ${maxSizeMB}MB, allowed types: JPEG/PNG`
                );
                return;
            }

            // Always take the first file (single upload)
            const newFile = acceptedFiles[0] || null;
            setFile(newFile);
            onFileChange(newFile); // Notify parent
        },
        [maxSizeMB, onFileChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        maxSize: maxSizeMB * 1024 * 1024,
        maxFiles: 1, // Enforce single file
        multiple: false, // Disable multi-select
    });

    const removeFile = () => {
        setFile(null);
        onFileChange(null); // Notify parent
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
                        className={`text-3xl ${isDragActive ? 'text-blue-500' : 'text-gray-400'
                            }`}
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

            {/* Thumbnail */}
            <AnimatePresence>
                {file && (
                    <div
                        className="relative group rounded-lg overflow-hidden border border-gray-200   mx-auto"
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-48 object-contain"
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
                                {file.name.substring(0, 30)}
                                {file.name.length > 30 && '...'}
                            </p>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!file && (
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