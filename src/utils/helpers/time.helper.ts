export class TimeHelper {
  async getCurrentDateTime(): Promise<string> {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}
