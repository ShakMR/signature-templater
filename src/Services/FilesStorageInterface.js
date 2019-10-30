// @flow

class FilesStorageInterface {
  constructor() {
    if (new.target.name === 'FilesStorageInterface') {
      throw new Error("An interface cannot be instantiated");
    }
  }
  save(filename: string, content: string): Promise<> {};
  get(filename: string): Promise<string> {};
  getAllFileNames(): Promise<Array<string>> {};
}

export default FilesStorageInterface;
