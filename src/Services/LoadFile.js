// @flow
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

  static async loadFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.FileReader) {
        return reject("Cannot read files with this browser")
      }
      const reader = new FileReader();
      let tick, tack;
      reader.onload = (evt) => {
        console.log(evt);
        if (!tick){
          console.log("Started loading file");
          tick = Date.now();
        }
        if (reader.readyState === 2) {
          tack = Date.now();
          console.log("File loaded in:", tack - tick, "milliseconds");
          resolve((reader.result || {}).toString());
        }
      };
      reader.readAsText(file);
    });
  }
}