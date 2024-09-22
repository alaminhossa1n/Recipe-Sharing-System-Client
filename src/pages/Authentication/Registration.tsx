<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setToken } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const Registration = () => {
  const [registration] = useRegistrationMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
=======
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRegistrationMutation } from "../../redux/features/auth/authApi"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch } from "../../redux/hooks"
import { setToken } from "../../redux/features/auth/authSlice"
import { toast } from "sonner"

const Registration = () => {
	const [registration] = useRegistrationMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
>>>>>>> 35b46118acd7d95eda81d50f6c1a27b3c5e4b2ba

	const onSubmit = async (data) => {
		try {
			const res = await registration(data).unwrap()

<<<<<<< HEAD
      if (res.success) {
        console.log(res.data.token);
        toast.success("Registration Successful.");
        const userDecoded = jwtDecode(res.data.token);
        dispatch(setToken({ user: userDecoded, token: res.data.token }));
      } else {
        console.log("Unexpected response:", res.data);
      }
    } catch (error) {
      // Handle 409 Conflict error
      if (error.status === 409) {
        console.log("Error: This email is already registered.");
        // Display error message to the user or handle it accordingly
        toast.error("This email is already registered.");
      } else {
        console.error("Error:", error);
        // Display a general error message if it's not a 409 error
        alert("Something went wrong. Please try again later.");
      }
    }
  };
=======
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
>>>>>>> 35b46118acd7d95eda81d50f6c1a27b3c5e4b2ba

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Register Your Account
				</h2>

				{/* Registration Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Name Field */}
					<div>
						<label className="block text-gray-700">Name</label>
						<input
							type="text"
							{...register("displayName", { required: "Name is required" })}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
							placeholder="Enter your name"
						/>
						{errors.displayName && (
							<p className="text-red-500 text-sm mt-1">
								{errors.displayName.message}
							</p>
						)}
					</div>

					{/* Email Field */}
					<div>
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							{...register("email", { required: "Email is required" })}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
							placeholder="Enter your email"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password Field */}
					<div>
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
					>
						Register
					</button>
				</form>

				{/* Already have an account */}
				<p className="text-center text-gray-600 mt-4">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-blue-500 hover:underline transition duration-300"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Registration
