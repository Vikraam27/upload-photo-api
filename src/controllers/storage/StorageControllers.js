const { ref, getDownloadURL, uploadBytesResumable } = require('@firebase/storage');
const storage = require('../../utils/firebaseConfig');

const InvariantError = require('../../exceptions/InvariantError');

class StorageControllers {
  constructor() {
    this._storage = storage;
  }

  async uploadProfilePhoto(data) {
    const filename = +new Date() + data.hapi.filename;
    const metadata = {
      contentType: data.hapi.headers['content-type'],
    };

    const storageRef = ref(this._storage, `profile/${filename}`);
    await uploadBytesResumable(storageRef, data._data, metadata);
    const downloadUrl = await getDownloadURL(storageRef);

    if (!downloadUrl) {
      throw new InvariantError('fail to upload images');
    }

    return downloadUrl;
  }
}

module.exports = StorageControllers;
