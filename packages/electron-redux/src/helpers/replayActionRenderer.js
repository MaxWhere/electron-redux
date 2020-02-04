import { ipcRenderer } from 'electron';

export default function replayActionRenderer(store, opts = {}) {
  ipcRenderer.on(`redux-action-${opts.storeid || 'all'}`, (event, payload) => {
    store.dispatch(payload);
  });
}
