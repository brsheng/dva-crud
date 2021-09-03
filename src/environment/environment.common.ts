import { Environment } from './environment.d'

const baseUrl: string = 'http://localhost'

export const environment: Environment = {
  baseUrl,
  GetAllEmployeesUrl:`${baseUrl}/api/agent/GetAllEmployees`,
  GetEmployeesByConditionUrl: `${baseUrl}/api/agent/GetEmployeesByCondition`,
  RemoveAndInsertUrl:`${baseUrl}/api/agent/RemoveAndInsert`,
  UpdateUrl:`${baseUrl}/api/emp/Update`,
  DeleteUrl:`${baseUrl}/api/agent/Delete`,
  GetByAliasUrl:`${baseUrl}/api/emp/GetByAlias`
}