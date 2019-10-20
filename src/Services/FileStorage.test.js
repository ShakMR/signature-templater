import FileStorage from './FileStorage';

describe('FileStorage', () => {
  afterEach(() => {
    localStorage.clear();
    localStorage.setItem.mockClear();
    localStorage.getItem.mockClear();
  });

  describe('save', () => {
    const filename = 'filename';
    const filename2 = 'filename2';
    const content = 'content';
    const content2 = 'content2';

    it('should store the file content and name on save', () => {
      FileStorage.save(filename, content);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      const calls = localStorage.setItem.mock.calls;
      expect(calls[0][0]).toEqual(filename);
      expect(calls[0][1]).toEqual(content);
      expect(calls[1][1]).toEqual([filename]);
    });

    it('should add to the index a new filename if the index already exists', () => {
      FileStorage.save(filename, content);
      FileStorage.save(filename2, content);
      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
      expect(localStorage.setItem.mock.calls[3][1]).toEqual('filename,filename2');
    });

    it('should override already existing file', () => {
      FileStorage.save(filename, content);
      FileStorage.save(filename, content2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
      expect(localStorage.setItem.mock.calls[3][1]).toEqual('filename');
      expect(localStorage.getItem(filename)).toEqual(content2);
    });
  });

  describe('get', () => {
    it('should return content stored', () => {
      const filename = 'filename';
      const content = 'content';
      FileStorage.save(filename, content);
      expect(FileStorage.get(filename)).toEqual(content);
    });
  });

  describe('getAllFileNames', () => {
    it('should return content stored', () => {
      const filename = 'filename';
      const content = 'content';
      FileStorage.save(filename, content);
      expect(FileStorage.getAllFileNames()).toEqual([filename]);
    });
  });
});
