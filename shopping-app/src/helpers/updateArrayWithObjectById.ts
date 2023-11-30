const updateArrayWithObjectById = <T extends { id?: string }>(list: T[], ingredient: T) => {
  return list.map((item) => {
    return item?.id === ingredient?.id ? ingredient : item;
  });
};

export default updateArrayWithObjectById;
