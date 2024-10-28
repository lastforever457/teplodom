import axios from "axios";

const useFetchWithQueries = () => {
  const fetchWithQueries = async (queries: string) => {
    try {
      const res = await axios.get(`https://dummyjson.com${queries}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchWithQueries };
};

export default useFetchWithQueries;
