export const fetchNumberOfIssues = async (params) => {
  const { REACT_APP_API_URL } = process.env;
  const res = await fetch(
    `${REACT_APP_API_URL}/randomNumbers/random?limit=1&min=0&max=30`
  );
  const json = await res.json();
  return json;
};
