import { NextPage } from "next";
import common from "../../styles/common.module.scss";
import styles from "../../styles/informationBox.module.scss";
import classNames from "classnames";
import { JSXElementConstructor, ReactElement } from "react";
import { Col } from "react-bootstrap";

interface Props {
  icon: ReactElement<string, JSXElementConstructor<number>>;
  title: string;
  info: string;
}

const InformationBox: NextPage<Props> = ({ icon, title, info }) => {
  return (
    <Col
      className={classNames({
        "border p-4 mx-2": true,
        [styles.rounded]: true,
      })}
    >
      <div>{icon}</div>
      <div className="mt-3">
        <span
          className={classNames({
            [common.medium]: true,
          })}
        >
          {title}
        </span>
        <br />
        <span className="text-muted">{info}</span>
      </div>
    </Col>
  );
};

export default InformationBox;
