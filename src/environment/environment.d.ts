export interface Environment {
  baseUrl: string;
  GetAllEmployeesUrl?:string,
  GetEmployeesByConditionUrl?: string;
  RemoveAndInsertUrl?:String;
  UpdateUrl?:string;
  DeleteUrl?:string;
  GetByAliasUrl?:string;
}