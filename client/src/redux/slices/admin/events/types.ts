import { IEvent, IMaterial } from "@/types/event";

export interface AdminEventsStatus {
  [eventId: string]: {
    fetching?: boolean;
    creating?: boolean;
    deleting?: boolean;
    updating?: boolean;
    error?: string;
  };
}

export interface AdminEventsState {
  events: IEvent[];
  status: AdminEventsStatus;
}
