// Types for Car Submission API payload

export type VehicleCondition = "excellent" | "good" | "fair" | "poor";
export type BodyType = "sedan" | "suv" | "coupe" | "hatchback" | "truck" | "convertible" | "wagon" | "other";
export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric" | "other";
export type Transmission = "manual" | "automatic" | "cvt";
export type Drivetrain = "fwd" | "rwd" | "awd" | "4wd";
export type PreferredContact = "email" | "phone" | "either";
export type Source = "website" | "phone" | "referral" | "walk-in" | "social-media";

export interface CarSubmissionPayload {
	vehicle: {
		make: string;
		model: string;
		year: number;
		mileage: number;
		condition: VehicleCondition;
		bodyType?: BodyType;
		fuelType?: FuelType;
		transmission?: Transmission;
		drivetrain?: Drivetrain;
		exteriorColor?: string;
		interiorColor?: string;
		vin?: string;
	licensePlate?: string;
		trimLevel?: string;
		engineSize?: string;
	};
	pricing: {
		expectedPrice: number;
	currency?: string; // e.g., CAD
		priceFlexible?: boolean;
		reasonForSelling?: string;
	};
	owner: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		preferredContactMethod?: PreferredContact;
		preferredContactTime?: string;
		bestTimeToCall?: string;
		address?: {
			street?: string;
			city?: string;
			province?: string;
			postalCode?: string;
			country?: string; // default Canada
		};
	};
	history?: {
		previousOwners?: number;
		accidentHistory?: boolean;
		serviceHistory?: boolean;
	details?: string; // freeform notes
	serviceRecords?: string; // e.g., "Dealer serviced; last at 70,000km"
	};
	features?: {
	airConditioning?: boolean;
		sunroof?: boolean;
		leatherSeats?: boolean;
		navigation?: boolean;
		heatedSeats?: boolean;
		bluetooth?: boolean;
		backupCamera?: boolean;
		other?: string[];
	};
	media?: {
		images?: string[]; // URLs
	documents?: string[]; // document URLs (e.g., PDF)
	};
	source?: Source;
}

