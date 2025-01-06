interface GtagParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  page_path?: string;
  page_title?: string;
  send_to?: string;
  anonymize_ip?: boolean;
}

type DataLayerArg = [
  command: 'event' | 'config' | 'js' | 'consent',
  action: string,
  params?: GtagParams | { [key: string]: string | boolean }
];

interface Window {
  dataLayer: (DataLayerArg | unknown[])[];
  gtag: (
    command: 'event' | 'config' | 'js' | 'consent',
    action: string,
    params?: GtagParams | {
      [key: string]: string | boolean;
    }
  ) => void;
}