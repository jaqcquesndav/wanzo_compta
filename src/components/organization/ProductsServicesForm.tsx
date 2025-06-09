import React from 'react';
import { FormField, Input, Textarea } from '../ui/Form';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  category: string;
}

interface Service {
  name: string;
  description: string;
  category: string;
}

interface ProductsServicesFormProps {
  products: Product[];
  services: Service[];
  onProductsChange: (products: Product[]) => void;
  onServicesChange: (services: Service[]) => void;
}

export function ProductsServicesForm({
  products,
  services,
  onProductsChange,
  onServicesChange
}: ProductsServicesFormProps) {
  const addProduct = () => {
    onProductsChange([...products, { name: '', description: '', category: '' }]);
  };

  const removeProduct = (index: number) => {
    onProductsChange(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    onProductsChange(
      products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const addService = () => {
    onServicesChange([...services, { name: '', description: '', category: '' }]);
  };

  const removeService = (index: number) => {
    onServicesChange(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    onServicesChange(
      services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Produits */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Produits</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={addProduct}
          >
            Ajouter un produit
          </Button>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Produit {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Nom">
                  <Input
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  />
                </FormField>

                <FormField label="Catégorie">
                  <Input
                    value={product.category}
                    onChange={(e) => updateProduct(index, 'category', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <Textarea
                  value={product.description}
                  onChange={(e) => updateProduct(index, 'description', e.target.value)}
                  rows={3}
                />
              </FormField>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Services</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={addService}
          >
            Ajouter un service
          </Button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Service {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Nom">
                  <Input
                    value={service.name}
                    onChange={(e) => updateService(index, 'name', e.target.value)}
                  />
                </FormField>

                <FormField label="Catégorie">
                  <Input
                    value={service.category}
                    onChange={(e) => updateService(index, 'category', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={3}
                />
              </FormField>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}