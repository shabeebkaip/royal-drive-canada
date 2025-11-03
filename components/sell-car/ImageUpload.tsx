"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/api/upload";

type ImageUploadProps = {
	value: string[];
	onChange: (urls: string[]) => void;
	label?: string;
	max?: number; // max images
	maxSize?: number; // bytes, default 5MB
	className?: string;
};

export default function ImageUpload({ value, onChange, label = "Vehicle Photos", max = 10, maxSize = 5 * 1024 * 1024, className = "" }: ImageUploadProps) {
	const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
	const [isAnyUploading, setIsAnyUploading] = useState(false);

	const remainingSlots = Math.max(0, max - value.length);

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		if (!acceptedFiles?.length || remainingSlots === 0) return;
		const files = acceptedFiles.slice(0, remainingSlots);
		setIsAnyUploading(true);
		try {
			const uploaded: string[] = [];
			for (let i = 0; i < files.length; i++) {
				const f = files[i];
				setUploadingIndex(value.length + i);
				const url = await uploadImage(f);
				uploaded.push(url);
			}
			onChange([...value, ...uploaded]);
		} finally {
			setUploadingIndex(null);
			setIsAnyUploading(false);
		}
	}, [remainingSlots, onChange, value]);

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		multiple: true,
		accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
		maxSize,
		disabled: isAnyUploading || remainingSlots === 0,
	});

	const removeAt = (idx: number) => {
		const next = value.filter((_, i) => i !== idx);
		onChange(next);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const canAddMore = remainingSlots > 0;

	return (
		<div className={`space-y-4 ${className}`}>
			{label && <label className="block text-sm font-medium text-gray-900">{label}</label>}

			{/* Preview Grid */}
			{value.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{value.map((src, idx) => (
						<div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={src} alt={`photo-${idx + 1}`} className="w-full h-full object-cover" />
							<button
								type="button"
								onClick={() => removeAt(idx)}
								className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs shadow-md"
								aria-label="Remove image"
								disabled={isAnyUploading}
							>
								<X className="h-4 w-4" />
							</button>
							{uploadingIndex === idx && (
								<div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
									<div className="bg-white rounded-full p-2"><Loader2 className="h-5 w-5 text-blue-600 animate-spin" /></div>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{/* Dropzone */}
			{canAddMore && (
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} ${isAnyUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					<input {...getInputProps()} />
					{isAnyUploading ? (
						<div className="py-6">
							<Loader2 className="h-6 w-6 text-blue-600 animate-spin mx-auto mb-2" />
							<p className="text-sm font-medium text-gray-900">Uploading...</p>
						</div>
					) : (
						<div className="py-6">
							{isDragActive ? (
								<Upload className="h-10 w-10 text-blue-600 mx-auto mb-3" />
							) : (
								<ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
							)}
							<h3 className="text-sm font-medium text-gray-900 mb-2">
								{isDragActive ? 'Drop your images here' : 'Upload images'}
							</h3>
							<p className="text-xs text-gray-500 mb-3">Drag and drop or click to browse</p>
							<div className="text-xs text-gray-400">PNG, JPG, GIF, WEBP • Max {formatFileSize(maxSize)}</div>
							<div className="text-xs text-gray-400">You can add {remainingSlots} more</div>
						</div>
					)}
				</div>
			)}

			{/* File Rejection Errors */}
			{fileRejections.length > 0 && (
				<div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
					<div className="space-y-2">
						<p className="font-medium text-red-800">File validation errors:</p>
						<ul className="space-y-2">
							{fileRejections.map(({ file, errors }) => (
								<li key={file.name} className="bg-white rounded-md p-3 border border-red-100">
									<p className="font-medium text-gray-900">{file.name}</p>
									<ul className="mt-1 space-y-1">
										{errors.map((error) => (
											<li key={error.code} className="text-red-600 text-xs">
												• {error.code === 'file-too-large' ? `File is too large. Maximum size is ${formatFileSize(maxSize)}` : error.message}
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

