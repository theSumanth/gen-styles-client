const PRODUCT_IDS_KEY = "product_ids";

export const getViewedProdIds = () => {
  const stored = sessionStorage.getItem(PRODUCT_IDS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveViewedProdIds = (ids) => {
  sessionStorage.setItem(PRODUCT_IDS_KEY, JSON.stringify(ids));
};
