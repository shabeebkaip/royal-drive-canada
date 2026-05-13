import React from "react";
import { VehicleDetail } from "@/types/vehicle";
import { Gauge, Fingerprint } from "lucide-react";

interface SpecificationsProps {
  vehicle: VehicleDetail;
}

interface SpecRow {
  label: string;
  value: string | number | null | undefined;
}

function SpecTable({ title, rows }: { title: string; rows: SpecRow[] }) {
  const visible = rows.filter(
    (r) => r.value !== null && r.value !== undefined && r.value !== "" && r.value !== 0
  );
  if (visible.length === 0) return null;
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{title}</h3>
      <div className="rounded-lg border border-gray-100 overflow-hidden">
        {visible.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex justify-between items-center px-4 py-3 text-sm ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold text-gray-900 capitalize text-right max-w-[55%] break-words">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Specifications: React.FC<SpecificationsProps> = ({ vehicle }) => {
  const formatMileage = (v: number) => new Intl.NumberFormat("en-CA").format(v);

  const basicRows: SpecRow[] = [
    { label: "Year", value: vehicle.year },
    { label: "Make", value: vehicle.make?.name },
    { label: "Model", value: vehicle.model?.name },
    { label: "Trim", value: vehicle.trim },
    { label: "Body Type", value: vehicle.type?.name },
    { label: "Condition", value: vehicle.condition === "certified-pre-owned" ? "Certified Pre-Owned" : vehicle.condition === "new" ? "New" : "Used" },
    { label: "VIN", value: vehicle.vin },
    { label: "Stock #", value: vehicle.stockNumber },
  ];

  const exteriorRows: SpecRow[] = [
    { label: "Exterior Color", value: vehicle.specifications?.exteriorColor },
    { label: "Interior Color", value: vehicle.specifications?.interiorColor },
    { label: "Doors", value: vehicle.specifications?.doors },
    { label: "Seating Capacity", value: vehicle.specifications?.seatingCapacity ? `${vehicle.specifications.seatingCapacity} passengers` : undefined },
  ];

  const mechanicalRows: SpecRow[] = [
    { label: "Engine Size", value: vehicle.engine?.size ? `${vehicle.engine.size}L` : undefined },
    { label: "Cylinders", value: vehicle.engine?.cylinders },
    { label: "Horsepower", value: vehicle.engine?.horsepower ? `${vehicle.engine.horsepower} HP` : undefined },
    { label: "Fuel Type", value: vehicle.engine?.fuelType?.name },
    { label: "Transmission", value: vehicle.transmission?.type?.name },
    { label: "Drivetrain", value: vehicle.drivetrain?.name },
    { label: "Mileage", value: vehicle.odometer?.value ? `${formatMileage(vehicle.odometer.value)} ${vehicle.odometer.unit ?? "km"}` : undefined },
  ];

  const historyRows: SpecRow[] = [
    { label: "Previous Owners", value: vehicle.numberOfPreviousOwners },
    { label: "Accident History", value: vehicle.accidentHistory ? "Reported" : "None Reported" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SpecTable title="Basic Information" rows={basicRows} />
      <SpecTable title="Exterior & Interior" rows={exteriorRows} />
      <SpecTable title="Engine & Drivetrain" rows={mechanicalRows} />
      <SpecTable title="Ownership History" rows={historyRows} />
    </div>
  );
};

export default Specifications;
