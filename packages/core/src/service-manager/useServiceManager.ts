import useDatabase from "../database/useDatabase";
import { defHook } from "../hub";

export default defHook(function useServiceManager() {
  const { serviceRepo } = useDatabase();

  const ps = () => {
    return serviceRepo().findAll();
  };

  return {
    ps,
  };
});
