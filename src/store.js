import { writable } from 'svelte/store';

export const activeModal = writable("null");
export const modalHeader = writable("null");
export const modalText = writable("null");
export const modalAction = writable(() => console.log('Default action'))
export const modalButtonA = writable("null");
export const modalButtonAAction = writable(() => console.log('Default action'));
export const modalButtonB = writable("null");
export const modalButtonBAction = writable(() => console.log('Default action'));

// Define and export your setModal function
export function setModal(modal = "Default", header = "Default", body = "Default", action = () => console.log('Default Action')) {
    activeModal.set(modal);
    modalHeader.set(header);
    modalText.set(body);
    modalAction.set(action);
}

export function killModal() {
    activeModal.set("null");
    modalHeader.set("null");
    modalText.set("null");
    modalAction.set(() => console.log('Default action'));
}