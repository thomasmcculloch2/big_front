import axios from "axios";
import { IInfo, INewSubmission } from "../../interfaces";
import { IUploadFile } from "../../interfaces/index";

export const acceptSubmission = async (id: number) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const response = await axios.post(
    `http://localhost/api/submissions/${id}/assignments`,
    {},
    {
      headers,
    }
  );

  return response.data;
};

export const finishSubmission = async (id: number) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const response = await axios.post(
    `http://localhost/api/finish/${id}`,
    {},
    {
      headers,
    }
  );

  return response.data;
};

export const fetchSubmission = async (id: string | string[] | undefined) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };

  const response = await axios.get(`http://localhost/api/submissions/${id}`, {
    headers,
  });
  
  return response.data;
};

export const getUploadedFile = async (id: number) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const response = await axios.post(
    `http://localhost/api/preview/${id}`,
    {},
    {
      headers,
    }
  );
  return response.data;
};

export const newSubmission = async (submission: INewSubmission) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const response = await axios.post(
    "http://localhost/api/submissions",
    submission,
    {
      headers,
    }
  );
  return response.data;
};

export const patientInfo = async (info: IInfo) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const response = await axios.post("http://localhost/api/info", info, {
    headers,
  });
  return response.data;
};

export const logoutUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await axios.post(
    "http://localhost/api/logout",
    null,
    config
  );
  return response.data;
};

export const uploadFile = async (obj: any) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"), //+ localStorage.getItem('token')
  };
  const data = new FormData();
  data.append("uploadedFile", obj.data);
  const response = await axios.post(
    `http://localhost/api/upload/${obj.id}`,
    data,
    {
      headers,
    }
  );
  return response.data;
};
