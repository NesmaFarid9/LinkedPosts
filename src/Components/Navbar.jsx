import {
    Navbar as NavbarHeroUi,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./../Context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("token");
        setIsLoggedIn(null);
        setUserData(null);
        navigate("/login");
    }

    return (
        <NavbarHeroUi
            maxWidth="xl"
            isBordered
            className="bg-white shadow-sm px-6 py-2 sticky top-0 z-50"
        >
            {/* Brand / Logo */}
            <NavbarBrand>
                <NavLink
                    to="/"
                    className="font-bold text-xl text-blue-600 hover:text-blue-700 transition tracking-tight"
                >
                    Linked<span className="text-gray-900">Posts</span>
                </NavLink>
            </NavbarBrand>

            {/* Menu Items */}
            <NavbarContent justify="end" className="gap-6">
                {isLoggedIn ? (
                    <>
                        <NavbarItem>
                            <NavLink
                                to="/profile"
                                className="text-gray-700 font-medium hover:text-blue-600 transition"
                            >
                                Profile
                            </NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                onPress={logOut}
                                color="danger"
                                variant="flat"
                                size="sm"
                                className="rounded-full px-6 font-medium"
                            >
                                Logout
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <NavLink
                                to="/login"
                                className="text-gray-700 font-medium hover:text-blue-600 transition"
                            >
                                Login
                            </NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={NavLink}
                                to="/register"
                                color="primary"
                                size="sm"
                                className="rounded-full px-6 font-medium shadow-sm"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </NavbarHeroUi>
    );
}
