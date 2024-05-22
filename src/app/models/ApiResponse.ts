export class ApiResponse {
    public success: boolean;
    public message: string | null;
    public result: any;

    constructor(_success: boolean, _message: string | null, _result: any){
      this.success = _success;
      this.message = _message;
      this.result = _result;
    }
  }