// @flow
import FilesStorageInterface from './FilesStorageInterface';

class FilesStorage extends FilesStorageInterface {
  filesIndex: string = 'index';
  storage: Storage;

  constructor(storage: Storage) {
    super();
    this.storage = storage;
  }

  async save(fileName: string, content: string): Promise<> {
    this.storage.setItem(fileName, content);
    let filesIndexContent: string = this.storage.getItem(this.filesIndex) || '';
    if (!filesIndexContent) {
      this.storage.setItem(this.filesIndex, fileName);
    } else {
      if (filesIndexContent.indexOf(fileName) === -1) {
        filesIndexContent = `${filesIndexContent},${fileName}`;
      }
      this.storage.setItem(this.filesIndex, filesIndexContent);
    }
  }

  async get(fileName: string): Promise<string> {
    return this.storage.getItem(fileName) || '';
  }

  async getAllFileNames(): Promise<Array<string>> {
    return (this.storage.getItem(this.filesIndex) || '').split(',');
  }
}

export default FilesStorage;
