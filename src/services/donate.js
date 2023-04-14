import axiosInstance from "configs/axiosInstance";

const donate = (payload) => {
  const {id, data} = payload;
  return axiosInstance.post(`/donation/${id}`, data);
}

export {
  donate,
};
