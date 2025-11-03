"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "./ImageUpload";
import { CarSubmissionPayload } from "@/types/car-submission";
import { createCarSubmission } from "@/lib/api/car-submission";
import { Car, DollarSign, User, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

type FieldErrors = Partial<Record<string, string>>;

export default function CarSubmissionForm() {
  const [form, setForm] = useState<CarSubmissionPayload>({
    vehicle: { make: "", model: "", year: new Date().getFullYear(), mileage: 0, condition: "good" },
    pricing: { expectedPrice: 0, priceFlexible: true, currency: 'CAD' },
    owner: { firstName: "", lastName: "", email: "", phone: "" },
    media: { images: [] },
    source: "website",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setField = (path: (keyof CarSubmissionPayload | string)[], value: string | number | boolean | string[] | undefined) => {
    setForm((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as CarSubmissionPayload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = copy;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        obj = obj[key] ||= {};
      }
      obj[path[path.length - 1]] = value;
      return copy;
    });
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!form.vehicle.make) e["vehicle.make"] = "Required";
    if (!form.vehicle.model) e["vehicle.model"] = "Required";
    if (!form.vehicle.year || form.vehicle.year < 1950) e["vehicle.year"] = "Enter a valid year";
    if (form.vehicle.mileage === undefined || form.vehicle.mileage < 0) e["vehicle.mileage"] = "Enter mileage";
    if (!form.pricing.expectedPrice || form.pricing.expectedPrice < 0) e["pricing.expectedPrice"] = "Enter price";
    if (!form.owner.firstName) e["owner.firstName"] = "Required";
    if (!form.owner.lastName) e["owner.lastName"] = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.owner.email)) e["owner.email"] = "Valid email required";
    if (!/^[0-9+()\-\s]{7,}$/.test(form.owner.phone)) e["owner.phone"] = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await createCarSubmission(form);
      if (res?.success) {
        toast.success("Successfully Submitted!", {
          description: "Your car submission has been received. Our team will contact you soon.",
          duration: 5000,
        });
        setSuccessMsg("Thanks! Your car submission was received. We'll contact you shortly.");
        // Reset the entire form
        setForm({
          vehicle: { make: "", model: "", year: new Date().getFullYear(), mileage: 0, condition: "good" },
          pricing: { expectedPrice: 0, priceFlexible: true, currency: 'CAD' },
          owner: { firstName: "", lastName: "", email: "", phone: "" },
          media: { images: [] },
          source: "website",
        });
        setErrors({});
      } else {
        toast.error("Submission Failed", {
          description: "Please try again later.",
        });
        setErrorMsg("Submission failed. Please try again later.");
      }
    } catch (err) {
      const error = err as Error;
      toast.error("Submission Failed", {
        description: error?.message || "Please try again later.",
      });
      setErrorMsg(error?.message || "Submission failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const err = (k: string) => errors[k];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="text-center mb-8 pb-8 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Sell Your Car</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Get a fair cash offer for your vehicle. Fill out the details below and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        {successMsg && (
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 sm:p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Submission Received!</h3>
            <p className="text-sm text-green-700">{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 sm:p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Submission Failed</h3>
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
        )}

        {/* Vehicle Information */}
        <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Vehicle Information</h2>
              <p className="text-sm text-gray-600">Tell us about your car</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
              <Input 
                placeholder="e.g., Toyota" 
                value={form.vehicle.make} 
                onChange={(e) => setField(["vehicle","make"], e.target.value)} 
                aria-invalid={!!err("vehicle.make")}
                className="h-11"
              />
              {err("vehicle.make") && <p className="text-xs text-red-600 mt-1.5">{err("vehicle.make")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
              <Input 
                placeholder="e.g., Corolla" 
                value={form.vehicle.model} 
                onChange={(e) => setField(["vehicle","model"], e.target.value)} 
                aria-invalid={!!err("vehicle.model")}
                className="h-11"
              />
              {err("vehicle.model") && <p className="text-xs text-red-600 mt-1.5">{err("vehicle.model")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <Input 
                type="number" 
                placeholder="2020" 
                value={form.vehicle.year} 
                onChange={(e) => setField(["vehicle","year"], Number(e.target.value))} 
                aria-invalid={!!err("vehicle.year")}
                className="h-11"
              />
              {err("vehicle.year") && <p className="text-xs text-red-600 mt-1.5">{err("vehicle.year")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
              <Input 
                type="number" 
                placeholder="50000" 
                value={form.vehicle.mileage} 
                onChange={(e) => setField(["vehicle","mileage"], Number(e.target.value))} 
                aria-invalid={!!err("vehicle.mileage")}
                className="h-11"
              />
              {err("vehicle.mileage") && <p className="text-xs text-red-600 mt-1.5">{err("vehicle.mileage")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
              <Select value={form.vehicle.condition} onValueChange={(v) => setField(["vehicle","condition"], v)}>
                <SelectTrigger className="w-full h-11"><SelectValue placeholder="Select condition" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VIN (Optional)</label>
              <Input 
                placeholder="1HGBH41JXMN109186" 
                value={form.vehicle.vin || ""} 
                onChange={(e) => setField(["vehicle","vin"], e.target.value)}
                className="h-11"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
              <p className="text-sm text-gray-600">What&apos;s your asking price?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (CAD) *</label>
              <Input 
                type="number" 
                placeholder="15000" 
                value={form.pricing.expectedPrice} 
                onChange={(e) => setField(["pricing","expectedPrice"], Number(e.target.value))} 
                aria-invalid={!!err("pricing.expectedPrice")}
                className="h-11"
              />
              {err("pricing.expectedPrice") && <p className="text-xs text-red-600 mt-1.5">{err("pricing.expectedPrice")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flexible on Price?</label>
              <Select value={String(form.pricing.priceFlexible ?? true)} onValueChange={(v) => setField(["pricing","priceFlexible"], v === "true")}>
                <SelectTrigger className="w-full h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes, I&apos;m flexible</SelectItem>
                  <SelectItem value="false">No, firm price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Selling (Optional)</label>
              <Input 
                placeholder="e.g., Upgrading to a larger vehicle" 
                value={form.pricing.reasonForSelling || ''} 
                onChange={(e) => setField(["pricing","reasonForSelling"], e.target.value)}
                className="h-11"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Contact Information</h2>
              <p className="text-sm text-gray-600">How can we reach you?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <Input 
                placeholder="John" 
                value={form.owner.firstName} 
                onChange={(e) => setField(["owner","firstName"], e.target.value)} 
                aria-invalid={!!err("owner.firstName")}
                className="h-11"
              />
              {err("owner.firstName") && <p className="text-xs text-red-600 mt-1.5">{err("owner.firstName")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <Input 
                placeholder="Doe" 
                value={form.owner.lastName} 
                onChange={(e) => setField(["owner","lastName"], e.target.value)} 
                aria-invalid={!!err("owner.lastName")}
                className="h-11"
              />
              {err("owner.lastName") && <p className="text-xs text-red-600 mt-1.5">{err("owner.lastName")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <Input 
                type="email" 
                placeholder="john.doe@example.com" 
                value={form.owner.email} 
                onChange={(e) => setField(["owner","email"], e.target.value)} 
                aria-invalid={!!err("owner.email")}
                className="h-11"
              />
              {err("owner.email") && <p className="text-xs text-red-600 mt-1.5">{err("owner.email")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <Input 
                type="tel" 
                placeholder="+1 (647) 555-0123" 
                value={form.owner.phone} 
                onChange={(e) => setField(["owner","phone"], e.target.value)} 
                aria-invalid={!!err("owner.phone")}
                className="h-11"
              />
              {err("owner.phone") && <p className="text-xs text-red-600 mt-1.5">{err("owner.phone")}</p>}
            </div>
          </div>
        </section>

        {/* Photos */}
        <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100">
              <ImageIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Vehicle Photos</h2>
              <p className="text-sm text-gray-600">Add photos to help us evaluate your car</p>
            </div>
          </div>
          <ImageUpload
            value={form.media?.images || []}
            onChange={(urls) => setField(["media","images"], urls)}
            max={10}
          />
        </section>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Get Your Free Quote"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
