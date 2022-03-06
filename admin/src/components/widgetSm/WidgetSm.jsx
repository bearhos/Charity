import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("products/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);
  
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Activity</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.fullname}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" onClick={() => window.open(user.img)}/>
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
