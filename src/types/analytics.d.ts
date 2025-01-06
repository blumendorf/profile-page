interface GtagParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  page_path?: string;
  page_title?: string;
  send_to?: string;
  anonymize_ip?: boolean;
}

interface DataLayerEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
}

interface Window {
  dataLayer: DataLayerEvent[];
  gtag: (
    command: 'event' | 'config' | 'js' | 'consent',
    action: string,
    params?: GtagParams | {
      [key: string]: string | boolean;
    }
  ) => void;
}