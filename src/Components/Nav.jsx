import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import teknokrat from "../public/logo.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Menu", "About Us", "Feature"];

  return (
    <Navbar
      isTransparent
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link
            className="w-full font-extralight text-white"
            href="/"
            size="lg"
          >
            <img src={teknokrat} alt="Logo Teknokrat" width="60" height="60" />
            <p className="font-extralight text-white ml-4 text-inherit">
              TEKNOKRAT
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="relative font-extralight text-white before:content-[''] before:block before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
          >
            Menu
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="#"
            aria-current="page"
            className="relative font-extralight text-white before:content-[''] before:block before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
          >
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="relative font-extralight text-white before:content-[''] before:block before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
          >
            Feature
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            className="font-extralight text-white"
            color="primary"
            href="#"
            variant="flat"
          >
            Our Team
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-transparent">
        {" "}
        {/* Mengatur latar belakang menu menjadi transparan */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full font-extralight text-white"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
