import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"
import NumberFormat from 'react-number-format';
export default function WidgetLg() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const getDonors = async () => {
      try {
        const res = await userRequest.get("donors/?new=true");
        setDonors(res.data);
      } catch {}
    };
    getDonors();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
 
  return (
    
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Donor</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {donors.map((donor) => (
          
          <tr className="widgetLgTr" key={donor._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{donor.username}</span>
            </td>
            <td className="widgetLgDate">{format(donor.createdAt)}</td>
            <td className="widgetLgAmount">
            <NumberFormat value={donor.amount} displayType={'text'} thousandSeparator={true} suffix={'$'} />
            </td>
            <td className="widgetLgStatus">
              <Button type={donor.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
