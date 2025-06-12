import { ArrowLeft, BarChart, Shield, Users, Briefcase, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function DataSharingBenefitsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        asChild
      >
        <Link to="../..">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux paramètres
        </Link>
      </Button>

      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Pourquoi partager vos données comptables ?
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="lead text-lg text-text-secondary">
          Le partage sécurisé de vos données comptables permet d'obtenir un meilleur accès aux solutions de financement et des conseils personnalisés adaptés à votre entreprise.
        </p>

        <div className="bg-info-50 border border-info-200 rounded-lg p-6 my-8">
          <h2 className="text-xl font-semibold text-text-primary flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Notre engagement envers vous
          </h2>
          <p className="mt-2">
            Vos données ne seront jamais utilisées à des fins qui vont à l'encontre des intérêts de votre entreprise. Elles sont protégées, anonymisées lors des analyses globales, et vous gardez le contrôle total sur ce que vous partagez.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-6">
          Avantages du partage de données
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <BarChart className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-lg font-medium">Meilleur accès au financement</h3>
            </div>
            <p>
              En partageant vos données de transactions, nous pouvons évaluer plus précisément la santé financière de votre entreprise, ce qui facilite l'accès aux crédits, leasing d'équipements et autres solutions financières.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-lg font-medium">Analyse personnalisée</h3>
            </div>
            <p>
              Nos analystes peuvent vous fournir des conseils spécifiques à votre situation, identifier des opportunités d'optimisation et vous recommander des stratégies adaptées à votre secteur et à votre stade de développement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-lg font-medium">Conseils financiers avancés</h3>
            </div>
            <p>
              Notre assistant Adha utilise des modèles d'intelligence artificielle pour vous offrir des conseils financiers, fiscaux, juridiques et en R&D adaptés à votre entreprise, basés sur l'analyse de données réelles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <LockKeyhole className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-lg font-medium">Sécurité et contrôle</h3>
            </div>
            <p>
              Vous gardez le contrôle total sur les données que vous partagez et avec qui. Vous pouvez révoquer les accès à tout moment et toutes les données sont traitées selon les normes de sécurité les plus strictes.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary mt-10 mb-6">
          Comment nous utilisons vos données
        </h2>

        <p>
          Nous utilisons des algorithmes de machine learning pour évaluer la cote de crédit de votre entreprise à travers ses transactions, au lieu de tout baser sur les états financiers traditionnels. Cette approche permet:
        </p>

        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Une évaluation plus juste et complète de votre activité</li>
          <li>La prise en compte des tendances et de la régularité des transactions</li>
          <li>Une analyse prédictive de votre capacité de remboursement</li>
          <li>L'identification de solutions de financement adaptées à votre profil</li>
        </ul>

        <p className="mt-6">
          Vos données contribuent également à l'entraînement de nos modèles d'intelligence artificielle, ce qui améliore la qualité des conseils fournis par notre assistant Adha et bénéficie à l'ensemble de la communauté des entrepreneurs.
        </p>

        <div className="mt-10 pt-6 border-t border-border">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Retourner aux paramètres
          </h3>
          <Button asChild>
            <Link to="../..">
              Configurer mes paramètres de partage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
