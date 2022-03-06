import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward, CardGiftcardOutlined} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import NumberFormat from 'react-number-format';


export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [incomePresent, setIncomePresent] = useState([]);
  const [perc, setPerc] = useState(0);
  

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("donors/income");
        const respresent = await userRequest.get("products/income");
        setIncome(res.data);
        setIncomePresent(respresent.data)
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);
 

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Donations</span>
        <div className="featuredMoneyContainer">
        <span className="featuredMoney">
        <NumberFormat value={income[0]?.total} displayType={'text'} thousandSeparator={true} suffix={'$'} />  </span>
        </div>
        <span className="featuredSub">Sum Charity</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Charity Present</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{Math.floor(income[0]?.total / 10 )} <CardGiftcardOutlined/></span>
        </div>
        <span className="featuredSub">1 present equal 10$ </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Charity present have been sent</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomePresent[0]?.total}</span>
          
        </div>
      </div>
    </div>
  );
}
