declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
interface Result<T> {
  isSuccess: boolean;
  message?: string;
  data: T;
  errorCode: number;
}

interface PageData<T> {
  item: T[];
}

interface User {
  AID: number;
  WSAlias: string;
  EnglishName: string;
  ChineseName: string;
  ManagerId: number;
  DeliverySite: string;
  SubTeam: string;
  WorkStatus: string;
  RoleDescription: string;
  PrimarySupportLanguage: string;
  SecondarySupportLanguage: string;
  AgentJoinDate: string;
  AgentProductionDate: string;
  MSAlias: string;
  IsAdministrator: Boolean;

}



interface SearchUserProps<T> {
  onSearch: (payload: T) => void;
  onReset: () => void;
}

