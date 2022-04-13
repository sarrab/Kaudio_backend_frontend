export class User {
  constructor(
    public email: string,
    public password?: string,
    public age?: number,
    public country?: string,
    public city?: string,
    public picture?: string,
    public friends?: any[],
    public friends_ref?: string[],
    public createdAt?: string,
    public status?: string,
    public name?: string,
  ) {  }
}
