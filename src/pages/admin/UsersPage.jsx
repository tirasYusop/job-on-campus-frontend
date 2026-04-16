import { useEffect, useState } from "react";
import api from "../../api";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>👤 All Users</h2>

      {users.map(u => (
        <div key={u.id}>
          <p>
            {u.username} ({u.role}) - {u.verified ? "✅ Verified" : "❌"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;