import {useQuery} from "react-query";
import axiosInstance from "configs/axiosInstance";

const useCampaign = (id) => {
  return useQuery("campaign", async () => {
    const {data} = await axiosInstance.get(`/campaigns/${id}`);
    return data;
  });
};

const useCampaigns = () => {
  return useQuery("campaigns", async () => {
    const {data} = await axiosInstance.get("/campaigns");
    return data;
  });
};

export {
  useCampaigns,
  useCampaign,
};