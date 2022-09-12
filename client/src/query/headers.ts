const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `${localStorage.getItem("token")}`,
});

export default headers;