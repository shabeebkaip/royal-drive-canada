import React from 'react';

interface SEOContentProps {
  title: string;
  description: string;
  keywords?: string[];
  location?: string;
  serviceType?: string;
}

const SEOContent: React.FC<SEOContentProps> = ({ 
  title, 
  description, 
  keywords = [], 
  location = "Toronto", 
  serviceType = "Used Car Dealership" 
}) => {
  return (
    <div className="sr-only">
      {/* Screen reader only SEO content */}
      <h1>{title}</h1>
      <p>{description}</p>
      
      {/* Location-based SEO content */}
      <div>
        <h2>Serving {location} and Surrounding Areas</h2>
        <p>
          Royal Drive Canada proudly serves customers throughout the Greater Toronto Area, 
          including Scarborough, North York, Etobicoke, Mississauga, Markham, Richmond Hill, 
          Vaughan, and Brampton. As an OMVIC licensed dealer, we provide quality pre-owned 
          vehicles and exceptional customer service to all GTA residents.
        </p>
      </div>

      {/* Service-based SEO content */}
      <div>
        <h2>Professional {serviceType} Services</h2>
        <p>
          Our experienced team offers comprehensive automotive services including vehicle 
          sales, financing assistance, trade-in evaluations, and safety certifications. 
          All our pre-owned vehicles undergo thorough inspections and come with safety 
          certificates for your peace of mind.
        </p>
      </div>

      {/* Keywords for SEO */}
      {keywords.length > 0 && (
        <div>
          <h2>Related Services</h2>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Business credentials */}
      <div>
        <h2>Licensed and Certified</h2>
        <p>
          Royal Drive Canada is a fully licensed OMVIC (Ontario Motor Vehicle Industry Council) 
          dealer and member of UCDA (Used Car Dealers Association). We adhere to all provincial 
          regulations and industry best practices to ensure a transparent and trustworthy 
          car buying experience.
        </p>
      </div>
    </div>
  );
};

export default SEOContent;
