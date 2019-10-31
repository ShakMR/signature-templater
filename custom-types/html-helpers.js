declare module 'html-helpers' {
  declare type ScrollComponents = HTMLElement & {
    scrollLeft: number,
    scrollTop: number,
  };

  declare type HTMLDocument = Document & {
    documentElement: ScrollComponents | null,
  };

  declare type UploadFileEvent = {
    target: {
      files: FileList,
    },
  };
}
