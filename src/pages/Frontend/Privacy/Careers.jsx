import React from "react";
import { Card, Row, Col, Button } from "antd";

const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Karachi, Pakistan",
    type: "Full-time",
    description:
      "We are looking for a talented React.js developer to build beautiful, responsive user interfaces. Experience with Ant Design and modern JS frameworks is a plus.",
  },
  {
    id: 2,
    title: "Marketing Specialist",
    location: "Lahore, Pakistan",
    type: "Part-time",
    description:
      "Help us grow our digital presence through innovative marketing campaigns, SEO strategies, and social media engagement.",
  },
  {
    id: 3,
    title: "Customer Support Executive",
    location: "Remote",
    type: "Full-time",
    description:
      "Assist customers with queries, handle returns, and ensure top-notch satisfaction through email and live chat support.",
  },
];

const Careers = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-3">Join Our Team</h2>
      <p className="text-center mb-5" style={{ maxWidth: 700, margin: "0 auto" }}>
        At <b>BabyStyle</b>, we believe in innovation, teamwork, and growth. We're always looking for
        passionate individuals to join our mission to bring style and comfort to families
        everywhere.
      </p>

      <Row gutter={[24, 24]}>
        {jobListings.map((job) => (
          <Col xs={24} md={12} lg={8} key={job.id}>
            <Card
              title={job.title}
              bordered={false}
              style={{
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <p>
                <b>Location:</b> {job.location}
              </p>
              <p>
                <b>Type:</b> {job.type}
              </p>
              <p>{job.description}</p>
              <Button type="primary" shape="round" block>
                Apply Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <h3>Didn’t find the right role?</h3>
        <p>
          We’re always open to meeting passionate professionals. Send us your CV at{" "}
          <a href="mailto:careers@babystyle.com">careers@babystyle.com</a>
        </p>
      </div>
    </div>
  );
};

export default Careers;
