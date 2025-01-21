import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import styles from "../../styles/navbar.module.scss";
import common from "../../styles/common.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Button } from "react-bootstrap";
import { auth } from "../../../../firebase/firebaseConfig";
import AuthComponent from "../Auth/Auth";

function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut: () => void = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={classNames({
          "bg-body-tertiary": true,
          [common.medium]: true,
          [styles.whiteNav]: true,
        })}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={logo} alt="Roomers logo" width={60} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link
                href="/"
                className={classNames({
                  [styles.link]: true,
                  "nav-link": true,
                  active: pathname === "/",
                })}
              >
                Home
              </Link>
              <Link
                href="/review"
                className={classNames({
                  [styles.link]: true,
                  "nav-link": true,
                  active: pathname === "/review",
                })}
              >
                Browse Reviews
              </Link>

              {user ? (
                <>
                  <Link
                    href="/submit-review"
                    className={classNames({
                      [styles.link]: true,
                      "nav-link": true,
                      active: pathname === "/submit-review",
                    })}
                  >
                    Submit a Review
                  </Link>
                  <Button
                    variant="primary"
                    className={classNames({
                      [common.skyblue]: true,
                      [common.medium]: true,
                      [common.button]: true,
                    })}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <AuthComponent className="" login={true} />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <hr
          className={classNames({
            [styles.navLine]: true,
          })}
        />
      </Navbar>
      <hr
        className={classNames({
          [styles.navLine]: true,
        })}
      />
    </>
  );
}

export default NavbarComponent;
