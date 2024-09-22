import { useContext } from "react"
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import { AuthContext, type AuthContextType } from "../../Providers/AuthProvider"
import { Link } from "react-router-dom"
import { useLoginMutation } from "../../redux/features/auth/authApi"
import { jwtDecode } from "jwt-decode"
import { setToken } from "../../redux/features/auth/authSlice"
import { useAppDispatch } from "../../redux/hooks"
import { z } from "zod"
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
import { toast } from "sonner"

const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
})

const Login = () => {
	const { handleGoogleSignIn } = useContext(AuthContext) as AuthContextType
	const [login] = useLoginMutation()
	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data) => {
		const res = await login(data).unwrap()
		if (res.success === true) {
			toast.success("Login Successful.")

			const userDecoded = jwtDecode(res.data.data.token)
			dispatch(setToken({ user: userDecoded, token: res.data.data.token }))
		}
	}

	return (
		<div className="min-h-[60vh]">
			<div className="w-full max-w-md mx-auto mt-20 p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Login to Your Account
				</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						{/* Email Field */}
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

						<Button className="w-full">Login</Button>
					</form>
				</Form>
				{/* Login Form */}

				{/* Divider */}
				<div className="flex items-center justify-between my-4">
					<hr className="w-full border-t border-zinc-700" />
					<span className="px-2 text-zinc-500">or</span>
					<hr className="w-full border-t border-zinc-700" />
				</div>

				{/* Google Login Button */}
				<Button
					onClick={handleGoogleSignIn}
					className="w-full"
					variant="secondary"
				>
					<FaGoogle className="mr-2" /> Login with Google
				</Button>

				{/* Register Link */}
				<p className="text-center text-muted-foreground mt-4">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-indigo-500 hover:underline transition duration-300"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	)
}
export default Login
