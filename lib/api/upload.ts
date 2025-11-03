import { toast } from "sonner";

export interface ImageUploadResponse {
	success: boolean;
	message: string;
	timestamp?: string;
	data?: {
		url?: string;
		secureUrl?: string;
		publicId?: string;
		resourceType?: string;
		format?: string;
		bytes?: number;
		width?: number;
		height?: number;
		originalFilename?: string;
	};
}

const getApiBase = () => {
	// Prefer client-exposed env var when available
	if (typeof window !== 'undefined') {
		const base = process.env.NEXT_PUBLIC_API_BASE_URL;
		if (base) return base;
	}
	return process.env.API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1';
};

export async function uploadImage(file: File, folder: string = 'royal-drive/images'): Promise<string> {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('folder', folder);

	const uploadToast = toast.loading('Uploading image...', {
		description: `Uploading ${file.name}`,
	});

	try {
		const base = getApiBase();
		const res = await fetch(`${base}/uploads`, {
			method: 'POST',
			body: formData,
		});

		if (!res.ok) {
			toast.dismiss(uploadToast);
			toast.error('Upload failed', { description: res.statusText });
			throw new Error(`Upload failed: ${res.statusText}`);
		}

		const data: ImageUploadResponse = await res.json();
		const url = data?.data?.secureUrl || data?.data?.url;
		if (!data.success || !url) {
			toast.dismiss(uploadToast);
			toast.error('Upload failed', { description: data.message || 'Unknown error' });
			throw new Error(data.message || 'Upload failed');
		}

		toast.dismiss(uploadToast);
		toast.success('Image uploaded', { description: `${file.name} uploaded successfully` });
		return url;
	} catch (err) {
		if (uploadToast) toast.dismiss(uploadToast);
		if (err instanceof Error && !err.message.includes('Upload failed:')) {
			toast.error('Upload failed', { description: err.message });
		}
		throw err;
	}
}

