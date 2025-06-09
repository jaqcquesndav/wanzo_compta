export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  legalForm: string;
  capital: string;
  currency: string;
  logo?: string;
  industry?: string;
  description?: string;
  productsAndServices?: {
    products: Array<{
      name: string;
      description: string;
      category: string;
    }>;
    services: Array<{
      name: string;
      description: string;
      category: string;
    }>;
  };
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday?: string;
    sunday?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}