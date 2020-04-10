export interface IFollow {
  followed?: boolean;
}

export class Follow implements IFollow {
  constructor(public followed?: boolean) {}
}
