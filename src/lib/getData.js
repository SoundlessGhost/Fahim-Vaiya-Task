export const getLocalData = () => {
  try {
    const serializedState = localStorage.getItem("customer_address");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
