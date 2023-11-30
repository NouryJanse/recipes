const fetchURL = async (url: string) => {
  return await fetch(url, {
    method: "GET",
  });
};

export default fetchURL;
