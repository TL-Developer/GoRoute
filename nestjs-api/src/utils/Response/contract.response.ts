export class ResultResponse<T> {
  public success({
    output,
    message,
    success = true,
  }: {
    success?: boolean;
    output: T;
    message: string;
  }) {
    return {
      message,
      output,
      success,
    };
  }
}
