const Searchbar = () => {
  fetch("/api/journal/topics", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  return (
    <div>
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default Searchbar;
