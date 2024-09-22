import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRegistrationMutation } from "../../redux/features/auth/authApi"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch } from "../../redux/hooks"
import { setToken } from "../../redux/features/auth/authSlice"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"

const loginSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
})

const Registration = () => {
	const [registration] = useRegistrationMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data) => {
		try {
			const res = await registration(data).unwrap()

			if (res.success) {
				console.log(res.data.token)
				toast.success("Registration Successful.")
				navigate("/")
				const userDecoded = jwtDecode(res.data.token)
				dispatch(setToken({ user: userDecoded, token: res.data.token }))
			} else {
				console.log("Unexpected response:", res.data)
			}
		} catch (error) {
			// Handle 409 Conflict error
			if (error.status === 409) {
				console.log("Error: This email is already registered.")
				// Display error message to the user or handle it accordingly
				toast.error("This email is already registered.")
			} else {
				console.error("Error:", error)
				// Display a general error message if it's not a 409 error
				alert("Something went wrong. Please try again later.")
			}
		}
	}

	return (
		<div className="min-h-[60vh]">
			<div className="w-full max-w-md mx-auto rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Register Your Account
				</h2>

				{/* Registration Form */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mt-5">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder=""
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mt-5">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder=""
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password Field */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mt-5">
									<FormLabel>Passsword</FormLabel>
									<FormControl>
										<Input
											value={field.value}
											onChange={field.onChange}
											placeholder=""
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Register
						</Button>
					</form>
				</Form>

				{/* Already have an account */}
				<p className="text-center text-muted-foreground mt-5">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-indigo-500 hover:underline transition duration-300"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Registration
