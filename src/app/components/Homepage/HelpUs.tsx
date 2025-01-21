import { NextPage } from "next";
import { Button } from "react-bootstrap";
import common from "../../styles/common.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import AuthComponent from "../Auth/Auth";

interface Props {
  className: string;
}

const HelpUs: NextPage<Props> = ({}) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null); // State to hold the user object

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // User is signed out
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div className="mt-5">
      <div>
        <h4>Help Us Build a Better Community!</h4>
        <span className="lead">
          <b>
            Share your experiences with landlords and help others make informed
            decisions about their next rental. Your honest feedback can make a
            big difference for the entire community.
          </b>
        </span>
      </div>
      {user && (
        <Button
          variant="primary"
          className={classNames({
            [common.skyblue]: true,
            [common.button]: true,
            "mt-3": true,
          })}
          onClick={() => {
            router.push("/submit-review");
          }}
        >
          Submit a review
        </Button>
      )}
      <div className="mt-3">
        {!user && <AuthComponent className="" login={false} />}
      </div>
    </div>
  );
};

export default HelpUs;
