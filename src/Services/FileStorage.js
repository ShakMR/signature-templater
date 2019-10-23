// @flow

export default class {
  static filesIndex: string = 'index';

  static save(fileName: string, content: string): void {
    localStorage.setItem(fileName, content);
    let filesIndexContent: string = localStorage.getItem(this.filesIndex) || '';
    if (!filesIndexContent) {
      localStorage.setItem(this.filesIndex, fileName);
    } else {
      if (filesIndexContent.indexOf(fileName) === -1) {
        filesIndexContent = `${filesIndexContent},${fileName}`;
      }
      localStorage.setItem(this.filesIndex, filesIndexContent);
    }
  }

  static get(fileName: string): string {
    return localStorage.getItem(fileName) || '';
  }

  static getAllFileNames(): Array<string> {
    return (localStorage.getItem(this.filesIndex) || '').split(',');
  }
};
