import axios from "axios";
import { setProjects } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";


function useGetAllProject() {
 useEffect(() => {
    const fetchProjects = async () => {
        try {
          const response = await axios.get(`${PROJECT_API_ENDPOINT}/get`);
          if (response?.data?.success) {
            dispatch(setProjects(response?.data?.user));
            toast.success(response?.data?.message);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      };

      fetchProjects()
 },[])
}

export default useGetAllProject
