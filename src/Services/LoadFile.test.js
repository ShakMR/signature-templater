import fs from 'fs';
import nock from 'nock';

import LoadFile from './LoadFile';

jest.mock('fs');

describe('LoadFile', () => {
  describe('loadFromFile', () => {
    it('should return content from file', async () => {
      const fileContent = 'content';
      const file = new File([fileContent], 'file.txt');

      await expect(LoadFile.loadFromFile(file)).resolves.toEqual(fileContent);
    });

    it('should reject if error', async () => {
      fs.readFile.mockImplementation((_, f) => f(new Error('error')));

      await expect(LoadFile.loadFromFile('file')).rejects.toEqual(new Error('error'));
    });
  });

  describe('loadFromURL', () => {
    it('should return content from url', async () => {
      const mockFileContent = 'content';
      nock('http://localhost')
        .get('/file')
        .reply(200, mockFileContent);

      await expect(LoadFile.loadFromURL('http://localhost/file')).resolves.toEqual(mockFileContent);
    });
  });
});
