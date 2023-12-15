const deleteObjectWithIdFromArray = <T extends { id?: string }>(list: T[], id: string) => {
  return list.filter((a) => {
    return a.id === id ? null : a;
  });
};

export default deleteObjectWithIdFromArray;
