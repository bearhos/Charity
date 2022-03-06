import "./landingpage.css"
import Rellax from 'rellax'
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);
	const [incomePresent, setIncomePresent] = useState([]);
    const products = useSelector((state) => state.product.products);
    const donors = useSelector((state) => state.donor.donors);
	console.log(products.length)

    useEffect(() => {
        const getIncome = async () => {
          try {
            const res = await userRequest.get("donors/income");
			const respresent = await userRequest.get("products/income");
            setIncome(res.data);
            setPerc((res.data[1].total * 100) / res.data[0].total - 100);
          } catch {}
        };
        getIncome();
      }, []);




    new Rellax(".animate", { // <---- Via class name
        speed: -7,
        center: false,
        wrapper: null,
        round: false,
        vertical: true,
        horizontal: true
      });
      new Rellax(".foot", { // <---- Via class name
        speed: -2,
        center: false,
        wrapper: null,
        round: false,
        vertical: false,
        horizontal: false
      });
    return (
       
        <div className="landingContainer">
            <section class="section section-top">
			<div class="content rellax" data-rellax-speed="5">
				<h1>Chartity Fund</h1>
			
			</div>
		</section>

		<section class="section section-stream">
			<img
				class="play rellax animate "
				src="https://i.ibb.co/TvdbMhQ/play-button.png"
				alt=""
				data-rellax-speed="-1" data-rellax-xs-speed="-5"
			/>
			<div class="content rellax" >
				<div>
					<h2 class="secondary-text">I need support from the fund</h2>
					<Link to="/newhelp"><button className="btn">Click here</button></Link>
				</div>
				<div>
					<h2 class="secondary-text">I want to contribute to the fund</h2>
					<p>
						Pls contact with us
					</p>
				</div>
			</div>
		</section>

		<section class="section section-grid">
			<div class="rellax" data-rellax-speed="1" data-rellax-xs-speed="3">
				<i class="fas fa-video fa-3x secondary-text"></i>
				<h2>Total Money <span class="secondary-text dot">.</span></h2>
				<p className="secondary-text-sub"> 
                <NumberFormat value={income[0]?.total} displayType={'text'} thousandSeparator={true} suffix={'$'} />
				</p>
			</div>
			<div class="rellax" data-rellax-speed="4" data-rellax-xs-speed="3">
				<i class="fas fa-users fa-3x secondary-text"></i>
				<h2>Present have sent<span class="secondary-text dot">.</span></h2>
				<p className="secondary-text-sub" >
					{products.length}
				</p>
			</div>
			<div class="rellax" data-rellax-speed="7" data-rellax-xs-speed="3">
				<i class="fas fa-book fa-3x secondary-text"></i>
				<h2>Total Donor<span class="secondary-text dot">.</span></h2>
				<p className="secondary-text-sub">
                    {donors.length}
				</p>
			</div>
    </section>
    
</div>

        )
}
