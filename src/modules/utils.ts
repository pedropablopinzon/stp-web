export const sortItemsString = (documents: any[], fieldSort: string = 'name') => {
  documents.sort((a, b) => {
    let fa = a[fieldSort].toLowerCase();
    let fb = b[fieldSort].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};

export const sortItems = (documents: any[], fieldSort: string = 'name', sortType: string = 'asc') => {
  documents.sort((a, b) => (sortType === 'asc' ? a[fieldSort] - b[fieldSort] : b[fieldSort] - a[fieldSort]));
};

export const updateItem = (
  items: any[],
  documentId: string,
  document: any,
  fieldSort: string = 'name',
  fieldSortType: string = 'string',
  sortType: string = 'asc'
) => {
  const updatedItems = items.map((obj) => (obj.documentId === documentId ? { ...obj, ...document } : obj));
  if (fieldSortType === 'string') {
    sortItemsString(updatedItems, fieldSort);
  }
  if (fieldSortType === 'number') {
    sortItems(updatedItems, fieldSort, sortType);
  }
  return updatedItems;
};

export const addItem = (
  items: any[],
  document: any,
  fieldSort: string = 'name',
  fieldSortType: string = 'string',
  sortType: string = 'asc'
) => {
  items.push(document);
  if (fieldSortType === 'string') {
    sortItemsString(items, fieldSort);
  }
  if (fieldSortType === 'number') {
    sortItems(items, fieldSort, sortType);
  }
};

export const deleteItem = (items: any[], documentId: string) => {
  return items.filter((obj, index, arr) => {
    return obj.documentId !== documentId;
  });
};

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const fixDate = (value: any): string => {
  if (value) {
    const d = Date.parse(value);
    if (!isNumeric(d)) {
      let time = value;
      const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

      if (fireBaseTime) {
        return fireBaseTime.toISOString();
      }
    } else {
      return value;
    }
  }
  return '';
};
