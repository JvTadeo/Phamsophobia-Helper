import mitt from 'mitt';

type EventData = {
    [key: string]: any
}

export const eventBus = mitt<EventData>();