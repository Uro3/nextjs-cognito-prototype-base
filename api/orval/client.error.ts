export class ApiError extends Error {
  public readonly messages: string[];

  constructor(messages: string[]) {
    super(messages.join(', '));

    this.name = 'ApiError';
    this.messages = messages;
  }
}
