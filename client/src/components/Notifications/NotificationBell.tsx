"use client";

import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck, Trash2, X, BellOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchUnreadNotificationsThunk,
  fetchUnreadCountThunk,
  markAsReadThunk,
  markAllAsReadThunk,
  deleteNotificationThunk,
} from "@/redux/slices/notifications/thunks";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationBell() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Enable push notifications
  const { isSupported, subscription } = usePushNotifications();

  const { notifications, unreadCount, loading } = useAppSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    dispatch(fetchUnreadCountThunk());
    const interval = setInterval(() => {
      dispatch(fetchUnreadCountThunk());
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUnreadNotificationsThunk());
    }
  }, [isOpen, dispatch]);

  const handleMarkAsRead = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await dispatch(markAsReadThunk(id));
  };

  const handleNavigate = (notification: any) => {
    if (notification.redirectUrl) {
      router.push(notification.redirectUrl);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group/bell relative p-2 rounded-xl hover:bg-slate-100 transition-all duration-300 text-slate-600 active:scale-95"
      >
        <Bell size={22} className="group-hover/bell:text-blue-600 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* --- Notification Panel --- */}
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40 bg-black/5 md:bg-transparent" onClick={() => setIsOpen(false)} />
          
          <div className={cn(
            "absolute z-50 mt-3 flex flex-col overflow-hidden bg-white border border-slate-200 shadow-2xl transition-all duration-200 origin-top-right",
            "fixed inset-x-4 top-[70px] mx-auto w-auto max-w-[400px] rounded-2xl md:absolute md:right-0 md:left-auto md:top-full md:w-[380px]" // Responsive logic
          )}>
            
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-base font-bold text-slate-900">Notifications</h3>
                <p className="text-xs text-slate-500 font-medium">You have {unreadCount} unread items</p>
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
                    onClick={() => dispatch(markAllAsReadThunk())}
                  >
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                  <X size={16} />
                </Button>
              </div>
            </div>

            <Separator />

            {/* List */}
            <ScrollArea className="max-h-[450px] min-h-[150px]">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center italic text-slate-400">
                  <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mb-2" />
                  <span className="text-xs">Loading updates...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-16 px-10 text-center flex flex-col items-center">
                  <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <BellOff size={32} className="text-slate-300" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">No notifications yet</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    When you get notifications, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={cn(
                        "group relative px-5 py-4 transition-all hover:bg-slate-50 border-b border-slate-50 last:border-0",
                        !notification.isRead && "bg-blue-50/30"
                      )}
                    >
                      <div className="flex gap-4">
                        {/* Status Icon */}
                        <div className="mt-1 shrink-0">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full ring-4 ring-white shadow-sm",
                            !notification.isRead ? "bg-blue-600" : "bg-slate-300"
                          )} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1 pr-6">
                          <div 
                            className="cursor-pointer" 
                            onClick={() => handleNavigate(notification)}
                          >
                            <h4 className={cn(
                              "text-[13px] leading-tight mb-1",
                              !notification.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"
                            )}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {notification.message}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3 pt-1">
                            <span className="text-[10px] font-medium text-slate-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            {notification.classroomId?.name && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                {notification.classroomId.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions Area */}
                        <div className="flex flex-col gap-2 shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => handleMarkAsRead(e, notification._id)}
                              className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                              title="Mark as read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(deleteNotificationThunk(notification._id));
                            }}
                            className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator />
            
            {/* Footer */}
            <div className="p-3 text-center">
               <button 
                 onClick={() => setIsOpen(false)}
                 className="text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider"
               >
                 Close Notifications
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}