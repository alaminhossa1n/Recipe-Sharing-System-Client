import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { useContext } from "react"
import { AuthContext, type AuthContextType } from "../../Providers/AuthProvider"
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi"
import type { TUser } from "../../interface/interface"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CoinsIcon, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
	const token: Partial<TUser> | null = useAppSelector(
		(state) => state.auth.user,
	)
	const { data } = useGetSingleUserQuery({ email: token?.email })
	const { handleSignOut } = useContext(AuthContext) as AuthContextType

	const currentUser = data?.data as TUser

	return (
		<nav
			className={`bg-secondary py-5 z-50 transition-all duration-300 font-bold w-full`}
		>
			<div className="container mx-auto flex items-center gap-2">
				<span className="text-2xl font-bold">Recipe Sharing</span>

				<div className="ml-auto flex gap-5 items-center">
					<NavigationMenu>
						<NavigationMenuList className="gap-5">
							<NavigationMenuItem>
								<NavigationMenuLink>
									<Link to="/">Home</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink>
									<Link to="/recipes">Recipe</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink>
									<Link to="/add-recipe">Add Recipe</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{currentUser && (
						<div>
							<Button size="sm" asChild>
								<Link to="/buy-coin">
									<CoinsIcon className="mr-2" />
									<span>{currentUser.coin || 0} coins</span>
								</Link>
							</Button>
						</div>
					)}

					{currentUser ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar>
									<AvatarImage src={currentUser.photoURL} />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onSelect={() => handleSignOut()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button asChild>
							<Link to="/login">
								<UserIcon className="mr-2" size={15} /> Login
							</Link>
						</Button>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
