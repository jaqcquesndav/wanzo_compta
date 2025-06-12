import { Tabs } from '../../components/ui/Tabs';
import { GeneralSettings } from './components/GeneralSettings';
import { AccountingSettings } from './components/AccountingSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { IntegrationSettings } from './components/IntegrationSettings';
import { AccountingLevelSettings } from '../../components/settings/accounting/AccountingLevelSettings';

export function SettingsPage() {
  const tabs = [
    { id: 'general', label: 'Général', content: <GeneralSettings /> },
    { 
      id: 'accounting', 
      label: 'Comptabilité', 
      content: (
        <div className="space-y-6">
          <AccountingSettings />
          <AccountingLevelSettings />
        </div>
      )
    },
    { id: 'security', label: 'Sécurité', content: <SecuritySettings /> },
    { id: 'notifications', label: 'Notifications', content: <NotificationSettings /> },
    { id: 'integrations', label: 'Intégrations', content: <IntegrationSettings /> }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Paramètres</h1>
      <div className="card">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}