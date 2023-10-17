const fetchIngredients = async (url: string) => {
  return await fetch(url, {
    method: "GET",
  });
};

export default fetchIngredients;
