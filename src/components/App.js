import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (isFetching) {
      fetchUsers();
    }
  }, [isFetching]);

  const fetchUsers = async () => {
    const response = await fetch("https://content.newtonschool.co/v1/pr/main/users");
    const data = await response.json();
    setUsers(data);
    setIsFetching(false);
  };

  const sortUsers = () => {
    if (isAscending) {
      setUsers([...users].sort((a, b) => a.name.length - b.name.length));
      setIsAscending(false);
    } else {
      setUsers([...users].sort((a, b) => b.name.length - a.name.length));
      setIsAscending(true);
    }
  };

  return (
    <div>
      <h1>Fetch Users Data</h1>
      <button onClick={() => setIsFetching(true)}>Fetch User Data</button>
      <button className="sort-btn" onClick={sortUsers}>
        {isAscending ? "Sort by name length (ascending)" : "Sort by name length (descending)"}
      </button>
      {isFetching && <div className="loader">Loading...</div>}
      {!isFetching && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <div className="id-section">{user.id}</div>
              <p className="name">{user.name}</p>
              <p className="email">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
