import { IEvent } from "@/types/event";

export interface IClientEventsStatus {
  [eventId: string]: {
    fetching?: boolean;
    creating?: boolean;
    adding?: boolean;
    deleting?: boolean;
    updating?: boolean;
    error?: string;
  };
}

export interface IInitialState {
  events: IEvent[];
  status: IClientEventsStatus;
}