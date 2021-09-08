import { environment } from "@/environment/environment";
import * as service from './service'

export async function GetEmployeesByCondition(payload: User): Promise<Result<PageData<User>>> {
  return await service.GetEmployeesByCondition(`${environment.GetEmployeesByConditionUrl}`, payload);
}

export async function searchEmployee(alias: string): Promise<Result<PageData<User>>> {
  return await service.searchEmployee(`${environment.GetByAliasUrl}?alias=${alias}`);
}

export async function removeAndInsert(payload: User): Promise<Result<PageData<User>>> {
  return await service.removeAndInsert(`${environment.RemoveAndInsertUrl}`, payload);
}

export async function deleteUser(alias: any): Promise<Result<PageData<User>>> {
  return await service.deleteUser(`${environment.DeleteUrl}?alias=${alias}`);
}

export async function update(user: User): Promise<Result<PageData<User>>> {
  return await service.update(`${environment.UpdateUrl}`, user);
}


