import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const handleToggle = (e: any) => {
    const tag = e.target.tagName;
    const classes = tag === "BUTTON" ? e.target.className : "";
    const isMatch = classes && classes.substring(0, 6) === "Header";

    if (tag === "svg" || tag === "path") {
      setToggle(prev => !prev);
    } else if (tag === "BUTTON" && isMatch) {
      setToggle(prev => !prev);
    } else {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleToggle);
  }, []);

  return (
    <>
      <HeaderBlock>
        <Title>
          <Link href="/">
            <a>Movie App</a>
          </Link>
        </Title>
        <MenuList isSmall={toggle} onClick={handleToggle}>
          <Menu isActive={router.pathname === "/"}>
            <Link href="/">
              <a>Popular</a>
            </Link>
          </Menu>
          <Menu isActive={router.pathname === "/now_playing"}>
            <Link href="/now_playing">
              <a>Now Playing</a>
            </Link>
          </Menu>
          <Menu isActive={router.pathname === "/top_rated"}>
            <Link href="/top_rated">
              <a>Top Rated</a>
            </Link>
          </Menu>
          <Menu isActive={router.pathname === "/upcoming"}>
            <Link href="/upcoming">
              <a>Upcoming</a>
            </Link>
          </Menu>
        </MenuList>
        <HamburgerButton>
          {/* <HamburgerButton onClick={handleToggle}> */}
          <GiHamburgerMenu />
        </HamburgerButton>
      </HeaderBlock>
      <Space />
    </>
  );
}

export default Header;

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Title = styled.h1`
  margin-right: 80px;
  color: #2d81e7;
  font-weight: 700;
`;

const MenuList = styled.ul<{ isSmall: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: ${({ isSmall }) => (isSmall ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
  }
`;

const Menu = styled.li<{ isActive: boolean }>`
  > a {
    position: relative;
    display: block;
    padding: 20px;
    font-size: 14px;
    color: rgba(90, 90, 90, 0.7);

    ::after {
      content: "";
      position: absolute;
      bottom: 10%;
      left: 50%;
      width: 50%;
      height: 2px;
      transition: transform 0.3s ease-in-out;
      transform: translateX(-50%)
        ${({ isActive }) => (isActive ? " scaleX(1)" : "scaleX(0)")};
      background-color: rgba(90, 90, 90, 0.3);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    background-color: #fff;

    > a::after {
      content: none;
    }

    :hover {
      box-shadow: inset 0px 0px 15px 8px rgb(0 0 0 / 10%);
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  margin-left: auto;
  color: rgba(90, 90, 90, 0.7);
  font-size: 24px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Space = styled.div`
  height: 70px;
`;
