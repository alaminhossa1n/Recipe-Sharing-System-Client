import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Footer from "./Navbar/Footer"

const MainContainer = () => {
	return (
		<div className="">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	)
}

export default MainContainer
