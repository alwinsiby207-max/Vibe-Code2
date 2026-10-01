import React from 'react';
import { NotificationItem } from '../types';

interface AlertsViewProps {
  notifications: NotificationItem[];
  onOpenAction: (action: string) => void;
  onMarkAllRead: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  notifications,
  onOpenAction,
  onMarkAllRead,
}) => {
  return (
    <div className="flex flex-col w-full pb-24 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b5a2b]">
            Campus Broadcasts
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1b16]">Alerts & Notices</h2>
        </div>
        <button
          onClick={onMarkAllRead}
          className="text-xs font-semibold text-[#8b5a2b] hover:text-[#6f4315]"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => item.linkAction && onOpenAction(item.linkAction)}
            className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
              item.isRead
                ? 'bg-[#ffffff] border-[#d5c3b6]/40 opacity-80'
                : 'bg-[#fff9ef] border-[#8b5a2b]/40 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1d1b16] flex items-center gap-1.5">
                {!item.isRead && <span className="w-2 h-2 rounded-full bg-[#8b5a2b]" />}
                <span>{item.title}</span>
              </h4>
              <span className="text-[11px] font-medium text-[#71594f]">{item.timeAgo}</span>
            </div>

            <p className="text-xs text-[#51443a] leading-relaxed">{item.message}</p>

            {item.linkAction && (
              <div className="pt-1 flex items-center gap-1 text-xs font-bold text-[#8b5a2b]">
                <span>
                  {item.linkAction === 'faculty-share'
                    ? 'Open Faculty Broadcast Portal →'
                    : item.linkAction === 'idea-review'
                    ? 'View Your Idea Review →'
                    : 'View Event Details →'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
