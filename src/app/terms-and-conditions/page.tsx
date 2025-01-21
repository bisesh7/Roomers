"use client";

import NavbarComponent from "../components/Common/Navbar";
import { Container } from "react-bootstrap";
import Footer from "../components/Common/Footer";

const Page = ({}) => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h3>Terms and Conditions</h3>
        <p>
          <strong>Last updated:</strong> August 20, 2023
        </p>

        <h4>Introduction</h4>
        <p>
          Welcome to Roomers.space. These terms and conditions outline the rules
          and regulations for the use of our website and services. By accessing
          or using Roomers.space, you agree to comply with and be bound by these
          terms.
        </p>

        <h4>Use of the Website</h4>
        <p>
          By accessing Roomers.space, you warrant that you are at least 18 years
          old and that you will use the website in compliance with these terms
          and all applicable laws.
        </p>

        <h4>User Accounts</h4>
        <p>
          To access certain features of the platform, you may be required to
          create an account. You are responsible for maintaining the
          confidentiality of your account credentials and for any activity that
          occurs under your account.
        </p>

        <h4>Prohibited Activities</h4>
        <p>Users of Roomers.space agree not to:</p>
        <ul>
          <li> Post false or misleading reviews</li>
          <li> Use the platform for illegal purposes</li>
          <li> Harass or harm other users</li>
          <li> Attempt to gain unauthorized access to the platform</li>
        </ul>

        <h4>Content Ownership</h4>
        <p>
          All content and materials available on Roomers.space, including text,
          graphics, and logos, are the intellectual property of Roomers.space.
          You are granted a limited license to use the platform for personal,
          non-commercial purposes.
        </p>

        <h4>Termination</h4>
        <p>
          We may suspend or terminate your access to Roomers.space at any time,
          without prior notice or liability, for any reason whatsoever,
          including if you breach these terms.
        </p>

        <h4>Limitation of Liability</h4>
        <p>
          Roomers.space is provided &quot;as is&quot; and &quot;as
          available.&quot; We make no warranties, express or implied, regarding
          the site&apos;s operation or the information provided. Roomers.space
          will not be liable for any damages arising from your use of the
          platform.
        </p>

        <h4>Governing Law</h4>
        <p>
          These terms are governed by and construed in accordance with the laws
          of Canada, and any disputes relating to these terms will be subject to
          the jurisdiction of the courts in British Columbia.
        </p>

        <h4>Changes to These Terms</h4>
        <p>
          Roomers.space reserves the right to update these terms and conditions
          at any time. If we make significant changes, we will notify you by
          posting the updated terms on our platform.
        </p>

        <h4>Contact Information</h4>
        <p>
          If you have any questions or concerns about these terms, please
          contact us at support@roomers.space.
        </p>

        <Footer className="" />
      </Container>
    </>
  );
};

export default Page;
