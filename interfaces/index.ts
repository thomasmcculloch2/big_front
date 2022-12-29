

  export interface IUserRegister {
    email: string;
    name: string;
    password: string;
    confirm_password: string;
    type: string;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    info: IInfo;
    roles: IRoles[];
    email_verified_at: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}



export interface ISubmission {
  id: number;
  title: string;
  doctor: IDoctor;
  symptoms: string;
  status: string;
  patient: IPatient;
  created_at: string;
  prescription: string
}

export interface IPatient {
  name: string;
  email: string;
  id: number;
  info: IInfo;
  roles: IRoles[];
}

export interface IRoles {
  name: string;
}

export interface IDoctor {
  name: string;
  email: string;
  id:number;
}

export interface IInfo {
  phone: string;
  weight: string;
  height: string;
  info: string;
}

export interface INewSubmission {
  title: string;
  symptoms: string;
}

export interface IUploadFile {
  uploadedFile: File;
}

export interface IFileUploadResponse {
  message: string;
  file: string;
}