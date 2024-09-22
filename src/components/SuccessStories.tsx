import CountUp from "react-countup"

const SuccessStories = () => {
	const recipesCount = 1200
	const usersCount = 300

	return (
		<div className=" py-12">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-extrabold sm:text-4xl mb-8">
					Success Stories
				</h2>
				<p className="text-xl text-muted-foreground mb-8">
					Discover why thousands of users love our platform!
				</p>
				<div className="flex justify-center space-x-8">
					<div className="bg-secondary shadow-md rounded-lg p-8">
						<h3 className="text-2xl font-bold text-secondary-foreground mb-4">
							Recipes Count
						</h3>
						<p className="text-3xl text-blue-500">
							<CountUp end={recipesCount} duration={3} />
						</p>
					</div>
					<div className="bg-secondary shadow-md rounded-lg p-8">
						<h3 className="text-2xl font-bold text-secondary-foreground mb-4">
							Users Count
						</h3>
						<p className="text-3xl text-green-500">
							<CountUp end={usersCount} duration={3} />
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuccessStories
