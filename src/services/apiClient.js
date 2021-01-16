export const fetchNumberOfIssues = async (params) => {
  const res = await fetch(
    "http://localhost:8000/randomNumbers/random?limit=1&min=0&max=99"
  );
  const json = await res.json();
  return json;
};
