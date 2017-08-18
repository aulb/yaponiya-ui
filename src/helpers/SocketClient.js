import io from 'socket.io-client';

const streamEndpoint = 'http://yaponiya.reblws.me:8080';

class SocketClient {
  constructor() {
    this.socket = null;
  }

  initialize() {
    this.socket = io(streamEndpoint);
  }

  // Open a socket connection to listen to tweet
  listenTweet(handler) {
    this.socket.on('tweet', handler);
  }

  unlistenTweet(handler) {
    if (!this.socket) {
      throw new Error('Cannot unlisten an undefined socket.');
    }
    this.socket.removeListener('tweet', handler);
  }

  close() {
    if (!this.socket) {
      throw new Error('Cannot disconnect an undefined socket.');
    }
    this.socket.disconnect();
    this.socket = null;
  }

  exists() {
    return this.socket !== null;
  }
}

export default new SocketClient();
