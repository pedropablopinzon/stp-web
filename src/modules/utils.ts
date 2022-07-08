export const sortItems = (documents: any[]) => {
  documents.sort((a, b) => {
    let fa = a.name.toLowerCase();
    let fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};

export const updateItem = (items: any[], documentId: string, document: any) => {
  const updatedItems = items.map((obj) => (obj.documentId === documentId ? { ...obj, ...document } : obj));
  sortItems(updatedItems);
  return updatedItems;
};

export const addItem = (items: any[], document: any) => {
  items.push(document);
  sortItems(items);
};

export const deleteItem = (items: any[], documentId: string) => {
  return items.filter((obj, index, arr) => {
    return obj.documentId !== documentId;
  });
};
