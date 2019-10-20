// @flow
import fs from 'fs';

export default class {
  static loadFromURL(url: string): Promise<string> {
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Origin: window.location.origin,
      },
    })
      .then(resp => resp.text())
  }

  static async loadFromFile(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}