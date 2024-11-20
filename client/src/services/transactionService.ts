const BASE_URL: string = 'http://localhost:5002';

export const getTransactions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/transactions`);
    return await res.json();
  } catch (err) {
    return console.log(err, 'something went wrong');
  }
};