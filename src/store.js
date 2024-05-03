import { writable } from 'svelte/store';

export const activeModal = writable("null");
export const modalHeader = writable("null");
export const modalText = writable("null");
export const modalButtonA = writable("null");
export const modalButtonB = writable("null");
export const modalButtonActionA = writable(() => console.log('Default action'));
export const modalButtonActionB = writable(() => console.log('Default action'));

export function setModal({
                             modal = "Default",
                             header = "Default",
                             body = "Default",
                             action = () => console.log('Default Action'),
                             buttonA = "null",
                             buttonB = "null",
                             actionA = () => console.log('Action A Default'),
                             actionB = () => console.log('Action B Default')
                         } = {}) {
    activeModal.set(modal);
    modalHeader.set(header);
    modalText.set(body);
    modalButtonA.set(buttonA);
    modalButtonB.set(buttonB);
    modalButtonActionA.set(actionA);
    modalButtonActionB.set(actionB);
}

export function closeModal() {
    activeModal.set("null");
    modalHeader.set("null");
    modalText.set("null");
    modalButtonA.set("null");
    modalButtonB.set("null");
    modalButtonActionA.set(() => console.log('Action A Default'));
    modalButtonActionB.set(() => console.log('Action B Default'));
}