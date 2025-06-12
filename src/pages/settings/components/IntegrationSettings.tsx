import { DataSharingSettings } from './integrations/DataSharingSettings';
import { DataSourceSettings } from './integrations/DataSourceSettings';

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <DataSharingSettings />
      <DataSourceSettings />
    </div>
  );
}