import { NextPage } from "next";
import { Row } from "react-bootstrap";
import InformationBox from "./InformationBox";
import {
  BsChat,
  BsGlobe2,
  BsHeart,
  BsList,
  BsShieldCheck,
} from "react-icons/bs";

interface Props {
  className: string;
}

const WhyRoomers: NextPage<Props> = ({}) => {
  return (
    <div className="mt-5">
      <h4>Why Roomers.space?</h4>
      <Row className="mt-4">
        <InformationBox
          icon={<BsChat size={24} />}
          title={"Share Honest Feedback"}
          info={"Write reviews based on your experiences"}
        />
        <InformationBox
          icon={<BsShieldCheck size={24} />}
          title={"Discover Reliable Landlords"}
          info={
            "Find trustworthy landlords based on feedback from the community"
          }
        />
        <InformationBox
          icon={<BsHeart size={24} />}
          title={"Help Others Find Great Homes"}
          info={"Your review can help others find a great home"}
        />
        <InformationBox
          icon={<BsList size={24} />}
          title={"Community-Driven"}
          info={"Our platform is built on trust and collaboration"}
        />
        <InformationBox
          icon={<BsGlobe2 size={24} />}
          title={"Completely Free"}
          info={"We don't charge fees to read or write reviews"}
        />
      </Row>
    </div>
  );
};

export default WhyRoomers;
