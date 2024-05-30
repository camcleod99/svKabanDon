import { writable } from 'svelte/store';

export const activeModal = writable("");
export const activeId = writable("");
export const modalHeader = writable("");
export const modalText = writable("null");
export const modalButtonA = writable("null");
export const modalButtonB = writable("null");
export const modalButtonActionA = writable(() => console.log('Default action'));
export const modalButtonActionB = writable(() => console.log('Default action'));

export function setModal({
                           modal = "Default",
                           id = "",
                           header = "Default",
                           body = "Default",
                           buttonA = "null",
                           buttonB = "null",
                           actionA = () => console.log('Action A Default'),
                           actionB = () => console.log('Action B Default')
                         } = {}) {
  activeModal.set(modal);
  activeId.set(id);
  modalHeader.set(header);
  modalText.set(body);
  modalButtonA.set(buttonA);
  modalButtonB.set(buttonB);
  modalButtonActionA.set(actionA);
  modalButtonActionB.set(actionB);
}

export function closeModal() {
  activeModal.set("");
  activeId.set("");
  modalHeader.set("");
  modalText.set("");
  modalButtonA.set("");
  modalButtonB.set("");
  modalButtonActionA.set(() => console.log('Action A Default'));
  modalButtonActionB.set(() => console.log('Action B Default'));
}