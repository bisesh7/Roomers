"use client";

import NavbarComponent from "../components/Common/Navbar";
import { Button, Col, Container, Form } from "react-bootstrap";
import searchbarStyles from "../styles/searchbar.module.scss";
import authStyles from "../styles/auth.module.scss";
import common from "../styles/common.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "../styles/review.module.scss";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Field, FormikHelpers } from "formik";
import {
  addDoc,
  collection,
  DocumentReference,
  FirestoreError,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const reviewSchema = Yup.object().shape({
  landlordName: Yup.string(), // Optional field
  propertyAddress: Yup.string().required("Property address is required"),
  detailedFeedback: Yup.string().required("Detailed feedback is required"),
  overallRating: Yup.number()
    .min(1, "Please rate from 1 to 5")
    .max(5, "Please rate from 1 to 5")
    .required("Overall rating is required"),
  keywords: Yup.string(), // Optional field
});

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 1;
  }
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
interface FileWithPreview {
  name: string;
  preview: string; // Assuming preview is a URL string
  file: File;
}
interface ReviewFormValues {
  reviewerName?: string;
  landlordName?: string;
  propertyAddress: string;
  overallRating: number;
  detailedFeedback: string;
  keywords?: string;
}

const Page = () => {
  const [reviewerName, setReviewerName] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setReviewerName(user.displayName);
      }
    });
  }, []);

  const [starHoverNumber, setStarHoverNumber] = useState<number>(0);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    disabled: false,
    onDrop: (acceptedFiles: File[]) => {
      // Map each file to an object that includes the file, its name, and a preview URL
      const updatedFiles = [
        ...files,
        ...acceptedFiles.map((file) => ({
          file: file,
          name: file.name,
          preview: URL.createObjectURL(file),
        })),
      ];

      // Optionally restrict to the first 12 files
      if (updatedFiles.length > 12) {
        setFiles(updatedFiles.slice(0, 12));
        alert("Only the first 12 files have been uploaded.");
      } else {
        setFiles(updatedFiles);
      }
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = (index: number) => {
    // Create a new array excluding the file at the specified index
    const newFiles = files.filter((_, idx) => idx !== index);

    // Update the state with the new array
    setFiles(newFiles);

    // If you are using object URLs (from createObjectURL), make sure to revoke them to avoid memory leaks
    URL.revokeObjectURL(files[index].preview);
  };

  const thumbs = files.map((file, index) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Image
          src={file.preview}
          alt={file.name}
          width={100}
          height={100}
          layout="responsive"
        />
        <Overlay onClick={() => removeFile(index)}>
          <Text>Remove</Text>
        </Overlay>
      </ThumbInner>
    </Thumb>
  ));

  // Normalize the address to lower case
  const normalizeAddress = (address: string): string =>
    address.trim().toLowerCase();

  // Function to check or create property based on the address
  async function getPropertyRef(address: string): Promise<DocumentReference> {
    const normalizedAddress = normalizeAddress(address);
    const propertiesCollection = collection(db, "properties");
    const q = query(
      propertiesCollection,
      where("address", "==", normalizedAddress)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].ref;
    } else {
      const newPropertyRef = await addDoc(propertiesCollection, {
        address: normalizedAddress,
      });
      return newPropertyRef;
    }
  }

  // Function to upload images and return their download URLs
  async function uploadImages(files: FileWithPreview[]): Promise<string[]> {
    const storage = getStorage();
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `reviews/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file.file);
      return getDownloadURL(snapshot.ref);
    });
    return Promise.all(uploadPromises);
  }

  // Function to post review to Firestore
  async function postReviewToFirestore(
    values: ReviewFormValues,
    imageUrls: string[]
  ): Promise<void> {
    try {
      const propertyRef = await getPropertyRef(values.propertyAddress);
      await addDoc(collection(db, "reviews"), {
        landlordName: values.landlordName || "",
        propertyAddress: propertyRef,
        overallRating: values.overallRating,
        detailedFeedback: values.detailedFeedback,
        keywords: values.keywords || "",
        reviewerName,
        images: imageUrls,
        createdAt: new Date(),
      });
    } catch (error) {
      const e = error as FirestoreError;
      console.error("Error adding document: ", e.message);
    }
  }

  // When submitting the form
  const handleSubmit = async (
    values: ReviewFormValues,
    {
      resetForm,
      setSubmitting,
    }: FormikHelpers<{
      landlordName: string;
      propertyAddress: string;
      overallRating: number;
      detailedFeedback: string;
      keywords: string;
    }>
  ) => {
    // First, upload the images and get their URLs
    const imageUrls = await uploadImages(
      files.map((file) => ({ file: file.file, name: file.name, preview: "" }))
    );

    // Then, post the review data with image URLs to Firestore
    await postReviewToFirestore(values, imageUrls);

    resetForm();
    setFiles([]);
    setStarHoverNumber(0);
    setSubmitting(false);
  };

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        <div>
          <h4>Submit a review</h4>
          <span>
            You feedback helps other make informed decisions. Please be honest
            and respectful.
          </span>
        </div>

        <Formik
          initialValues={{
            landlordName: "",
            propertyAddress: "",
            overallRating: 0,
            detailedFeedback: "",
            keywords: "",
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
            actions.setSubmitting(false);
          }}
        >
          {({ handleSubmit, touched, errors, setFieldValue }) => (
            <Form noValidate onSubmit={handleSubmit} className="mt-4">
              <div className="w-50">
                <Form.Group>
                  <Form.Label>Landlord Name</Form.Label>
                  <Form.Control
                    as={Field}
                    name="landlordName"
                    className={classNames(
                      searchbarStyles.searchInput,
                      authStyles.input,
                      "ps-2"
                    )}
                    placeholder="Landlord Name"
                    isInvalid={touched.landlordName && !!errors.landlordName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.landlordName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Property Address</Form.Label>
                  <Form.Control
                    as={Field}
                    name="propertyAddress"
                    className={classNames(
                      searchbarStyles.searchInput,
                      authStyles.input,
                      "ps-2"
                    )}
                    placeholder="Property Address"
                    isInvalid={
                      touched.propertyAddress && !!errors.propertyAddress
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.propertyAddress}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Overall Rating</Form.Label>
                  <Form.Control
                    as={Col}
                    isInvalid={touched.overallRating && !!errors.overallRating}
                  >
                    <span>
                      {starHoverNumber < 1 ? (
                        <RiStarLine
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 1);
                            setStarHoverNumber(1);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      ) : (
                        <RiStarFill
                          onMouseEnter={() => {
                            setStarHoverNumber(1);
                            setFieldValue("overallRating", 1);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      )}
                    </span>
                    <span>
                      {starHoverNumber < 2 ? (
                        <RiStarLine
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 2);
                            setStarHoverNumber(2);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      ) : (
                        <RiStarFill
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 2);
                            setStarHoverNumber(2);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      )}
                    </span>
                    <span>
                      {starHoverNumber < 3 ? (
                        <RiStarLine
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 3);
                            setStarHoverNumber(3);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      ) : (
                        <RiStarFill
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 3);
                            setStarHoverNumber(3);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      )}
                    </span>
                    <span>
                      {starHoverNumber < 4 ? (
                        <RiStarLine
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 4);
                            setStarHoverNumber(4);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      ) : (
                        <RiStarFill
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 4);
                            setStarHoverNumber(4);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      )}
                    </span>
                    <span>
                      {starHoverNumber < 5 ? (
                        <RiStarLine
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 5);
                            setStarHoverNumber(5);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      ) : (
                        <RiStarFill
                          onMouseEnter={() => {
                            setFieldValue("overallRating", 5);
                            setStarHoverNumber(5);
                          }}
                          className={classNames(styles.star, "me-1")}
                        />
                      )}
                    </span>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.overallRating}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Detailed Feedback</Form.Label>
                  <Form.Control
                    as={Field}
                    name="detailedFeedback"
                    component="textarea"
                    rows={3}
                    className={classNames(
                      searchbarStyles.searchInput,
                      authStyles.input,
                      "p-2",
                      "form-control"
                    )}
                    placeholder="Enter detailed feedback"
                    isInvalid={
                      touched.detailedFeedback && !!errors.detailedFeedback
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.detailedFeedback}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Add Keywords</Form.Label>
                  <Form.Control
                    as={Field}
                    name="keywords"
                    className={classNames(
                      searchbarStyles.searchInput,
                      authStyles.input,
                      "ps-2"
                    )}
                    placeholder="Example: Spacious, Convenient, Noisy"
                    isInvalid={touched.keywords && !!errors.keywords}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.keywords}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <section
                className={classNames(
                  styles.container,
                  "mt-4",
                  "text-center",
                  "py-5"
                )}
              >
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <h5>Drag and drop photos here</h5>
                  <span>or</span> <br />
                  <Button
                    variant="light"
                    className={classNames(common.button, "mt-2")}
                  >
                    Choose photos from device
                  </Button>
                </div>
              </section>

              <ThumbsContainer>{thumbs}</ThumbsContainer>

              <div className="d-flex justify-content-end my-4">
                <Button
                  variant="secondary"
                  className={classNames(common.button, "me-2")}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className={classNames(common.button, common.skyblue)}
                  type="submit"
                >
                  Post Review
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Page;
