import { useCallback } from "react";

const useParams = () => {
  const addParams = useCallback((page, search = "") => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", page);

    if (search) {
      currentUrl.searchParams.set("search", search);
    } else {
      currentUrl.searchParams.delete("search");
    }

    window.history.pushState({ path: currentUrl.href }, "", currentUrl.href);
  }, []);

  const getParams = useCallback(() => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get("page");
    const searchParam = url.searchParams.get("search");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    return {
      page,
      search: searchParam || "",
    };
  }, []);

  return { addParams, getParams };
};

export default useParams;
