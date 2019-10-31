declare module 'types/storage' {
  declare class FilesStorage {
    save(fileName: string, content: string): Promise<any>;
    get(fileName: string): Promise<string>;
    getAllFileNames(): Promise<Array<string>>,
  }
}
