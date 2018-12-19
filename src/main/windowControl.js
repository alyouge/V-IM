import { shell, ipcRenderer } from 'electron';

const winControl = {
  openURL: function(url) {
    shell.openExternal(url);
  },
  flashFrame: function() {
    ipcRenderer.send('flashFrame');
  },
  min: function() {
    ipcRenderer.send('min');
  },
  max: function() {
    ipcRenderer.send('max');
  },
  close: function() {
    ipcRenderer.send('close');
  },
  flashIcon: function() {
    ipcRenderer.send('flashIcon');
  },
  clearFlashIcon: function() {
    ipcRenderer.send('clearFlashIcon');
  }
};
export default winControl;
