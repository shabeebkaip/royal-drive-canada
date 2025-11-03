import { apiClient } from './client';
import { CarSubmissionPayload } from '@/types/car-submission';

interface CarSubmissionResponse {
	success: boolean;
	message: string;
	timestamp?: string;
	data?: {
		id?: string;
	};
}

export async function createCarSubmission(payload: CarSubmissionPayload) {
	// Public endpoint per requirements: POST /car-submissions
	return apiClient.post<CarSubmissionResponse>('/car-submissions', payload);
}

