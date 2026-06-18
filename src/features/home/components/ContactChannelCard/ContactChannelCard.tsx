import { type LucideIcon } from 'lucide-react';
import { IconWell } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface ContactChannel {
  type: string;
  label: string;
  description: string;
}

export interface ContactChannelCardProps {
  channel: ContactChannel;
  icon: LucideIcon;
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Contact row: external profile or obfuscated email (handled by parent `href` / `onClick`).
 */
export const ContactChannelCard = ({
  channel,
  icon: Icon,
  href,
  onClick,
}: ContactChannelCardProps) => {
  const isEmail = channel.type === 'email';

  return (
    <a
      href={href}
      onClick={onClick}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-lg border border-border-subtle',
        'hover:border-accent bg-surface/30 hover:bg-surface/50 transition-all'
      )}
      aria-label={isEmail ? 'Contact via Email' : `${channel.label} profile`}
    >
      <IconWell
        variant={isEmail ? 'contactEmail' : 'contactExternal'}
        className="flex items-center justify-center"
      >
        <Icon size={20} />
      </IconWell>
      <div>
        <div className="font-medium text-text-primary">{channel.label}</div>
        <div className="text-sm text-text-muted">{channel.description}</div>
      </div>
    </a>
  );
};
