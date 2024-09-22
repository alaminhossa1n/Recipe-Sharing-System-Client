import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { useContext, useEffect, useState } from "react"
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
<<<<<<< HEAD
  const token: Partial<TUser> | null = useAppSelector(
    (state) => state.auth.user
  );
  const { data } = useGetSingleUserQuery({ email: token?.email });
  const currentUser = data?.data;
  const { handleGoogleSignIn, handleSignOut } = useContext(AuthContext)!;
  const navigate = useNavigate();
=======
	const token: Partial<TUser> | null = useAppSelector(
		(state) => state.auth.user,
	)
	const { data } = useGetSingleUserQuery({ email: token?.email })
	const currentUser = data?.data as TUser
	console.log(currentUser)
	const { handleSignOut } = useContext(AuthContext) as AuthContextType

	return (
		<nav
			className={`bg-secondary py-5 z-50 transition-all duration-300 font-bold w-full`}
		>
			<div className="container mx-auto flex items-center gap-2">
				<span className="text-2xl font-bold">Recipe Sharing</span>
>>>>>>> 35b46118acd7d95eda81d50f6c1a27b3c5e4b2ba

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
							<Button variant="outline" size="sm">
								<CoinsIcon className="mr-2" />
								<span>{currentUser.coin || 0} coins</span>
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
						<Button variant="secondary" asChild>
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

<<<<<<< HEAD
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddRecipes = () => {
    if (currentUser) {
      navigate("/add-recipe");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className={`navbar fixed top-0 z-50 transition-all duration-300 text-white font-bold py-4 w-full ${
        isScrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="navbar-start">
        <Link to={"/"}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </div>

      <div className="navbar-center  lg:flex gap-5">
        <Link to={"/recipes"}>
          <button className="btn btn-neutral">Recipes</button>
        </Link>
        {token && (
          <button onClick={handleAddRecipes} className="btn btn-neutral">
            Add Recipes
          </button>
        )}
        {token && (
          <Link to={"/buy-coin"}>
            <button className="btn btn-neutral">Buy Coin</button>
          </Link>
        )}
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-5">
          <div className="flex items-center space-x-2 text-white bg-green-500 p-3 rounded-md">
            <FaCoins className="text-yellow-400 text-2xl" />
            <CountUp
              end={currentUser?.coin}
              duration={1}
              className="text-xl font-semibold"
            />
          </div>
          <img
            className="size-14 rounded-full"
            src={currentUser?.photoURL}
            alt="User photo"
          />
          {currentUser ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignOut}
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
=======
export default Navbar
>>>>>>> 35b46118acd7d95eda81d50f6c1a27b3c5e4b2ba
