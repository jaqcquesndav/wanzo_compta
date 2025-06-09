import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Toggle } from '../../../components/ui/Toggle';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newEntries: false,
    entryValidation: false,
    bankReconciliation: false,
    taxDeadlines: false,
    treasuryAlerts: false
  });

  const [notificationPreference, setNotificationPreference] = useState('realtime');

  const handleEmailNotificationChange = (key: keyof typeof emailNotifications) => (checked: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Saving notifications settings:', {
      emailNotifications,
      notificationPreference
    });
  };

  return (
    <div className="space-y-6">
      <Card title="Notifications">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
            <div className="space-y-2">
              <Toggle
                label="Nouvelles écritures comptables"
                checked={emailNotifications.newEntries}
                onChange={handleEmailNotificationChange('newEntries')}
              />
              <Toggle
                label="Validation des écritures"
                checked={emailNotifications.entryValidation}
                onChange={handleEmailNotificationChange('entryValidation')}
              />
              <Toggle
                label="Rapprochements bancaires"
                checked={emailNotifications.bankReconciliation}
                onChange={handleEmailNotificationChange('bankReconciliation')}
              />
              <Toggle
                label="Échéances fiscales"
                checked={emailNotifications.taxDeadlines}
                onChange={handleEmailNotificationChange('taxDeadlines')}
              />
              <Toggle
                label="Alertes de trésorerie"
                checked={emailNotifications.treasuryAlerts}
                onChange={handleEmailNotificationChange('treasuryAlerts')}
              />
            </div>

            <h3 className="text-sm font-medium text-gray-900 pt-4">Préférences de notification</h3>
            <div className="space-y-2">
              <Radio
                name="notification-preference"
                label="Temps réel"
                value="realtime"
                checked={notificationPreference === 'realtime'}
                onChange={(e) => setNotificationPreference(e.target.value)}
              />
              <Radio
                name="notification-preference"
                label="Résumé quotidien"
                value="daily"
                checked={notificationPreference === 'daily'}
                onChange={(e) => setNotificationPreference(e.target.value)}
              />
              <Radio
                name="notification-preference"
                label="Résumé hebdomadaire"
                value="weekly"
                checked={notificationPreference === 'weekly'}
                onChange={(e) => setNotificationPreference(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Enregistrer les préférences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}