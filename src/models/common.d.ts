import { Effect } from 'umi'

export interface BasicEffect {
  fetch: Effect;
  searchEmployee:Effect;
  removeAndInsert:Effect;
  // remove:Effect;
  update:Effect;
  deleteUser:Effect
}
