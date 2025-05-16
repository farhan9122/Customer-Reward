export const fetchTransactionData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/mock data/transactions.json")
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }, 1000);
  });
};
