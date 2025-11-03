import React from "react";
import { VehicleDetail } from "@/types/vehicle";
import { 
  Calendar, 
  Car, 
  Palette, 
  Users, 
  Gauge, 
  Zap,
  Shield,
} from "lucide-react";

interface SpecificationsProps {
  vehicle: VehicleDetail;
}

interface SpecItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const Specifications: React.FC<SpecificationsProps> = ({ vehicle }) => {


  // Organize specifications into categories
  const basicSpecs: SpecItem[] = [
    { label: "Year", value: vehicle.year, icon: <Calendar className="w-4 h-4 text-blue-600" /> },
    { label: "Make", value: vehicle.make.name, icon: <Car className="w-4 h-4 text-blue-600" /> },
    { label: "Model", value: vehicle.model.name },
    ...(vehicle.trim ? [{ label: "Trim", value: vehicle.trim }] : []),
    { label: "Body Type", value: vehicle.type.name },
    { label: "Condition", value: vehicle.condition, highlight: vehicle.condition === "certified" },
  ];

  const exteriorSpecs: SpecItem[] = [
    { label: "Exterior Color", value: vehicle.specifications.exteriorColor, icon: <Palette className="w-4 h-4 text-purple-600" /> },
    { label: "Interior Color", value: vehicle.specifications.interiorColor, icon: <Palette className="w-4 h-4 text-purple-600" /> },
    { label: "Doors", value: vehicle.specifications.doors },
    { label: "Seating", value: `${vehicle.specifications.seatingCapacity} passengers`, icon: <Users className="w-4 h-4 text-green-600" /> },
  ];

  const engineSpecs: SpecItem[] = [
    { label: "Engine Size", value: `${vehicle.engine.size}L`, icon: <Zap className="w-4 h-4 text-orange-600" /> },
    { label: "Cylinders", value: vehicle.engine.cylinders },
    { label: "Horsepower", value: `${vehicle.engine.horsepower} HP`, highlight: true },
  ];

  const historySpecs: SpecItem[] = [
    { 
      label: "Previous Owners", 
      value: vehicle.numberOfPreviousOwners,
      icon: vehicle.numberOfPreviousOwners === 1 ? <Shield className="w-4 h-4 text-purple-600" /> : undefined,
      highlight: vehicle.numberOfPreviousOwners === 1 
    },
  ];

  const SpecRow: React.FC<SpecItem> = ({ label, value, icon, highlight }) => (
    <div className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
      highlight ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 hover:bg-gray-100'
    }`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className={`text-sm ${highlight ? 'font-medium text-blue-900' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>
      <span className={`text-sm font-semibold ${highlight ? 'text-blue-900' : 'text-gray-900'} capitalize`}>
        {value}
      </span>
    </div>
  );

  const SpecCategory: React.FC<{ title: string; specs: SpecItem[]; icon: React.ReactNode }> = ({ title, specs, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">
        {specs.map((spec, index) => (
          <SpecRow key={`${title}-${index}`} {...spec} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-600" />
        Specifications
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpecCategory 
          title="Basic Information"
          specs={basicSpecs}
          icon={<Car className="w-4 h-4 text-blue-600" />}
        />
        
        <SpecCategory 
          title="Exterior & Interior"
          specs={exteriorSpecs}
          icon={<Palette className="w-4 h-4 text-purple-600" />}
        />
        
        <SpecCategory 
          title="Engine Performance"
          specs={engineSpecs}
          icon={<Zap className="w-4 h-4 text-orange-600" />}
        />
        
        <SpecCategory 
          title="Vehicle History"
          specs={historySpecs}
          icon={<Shield className="w-4 h-4 text-green-600" />}
        />
      </div>
    </div>
  );
};

export default Specifications;
