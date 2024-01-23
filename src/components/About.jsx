import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import {
  FcCloseUpMode,
  FcCellPhone,
  FcHome,
  FcFeedback,
} from 'react-icons/fc';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 600,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container
          className="my-container"
          style={
            {
              margin: 10, flexDirection: 'column', whiteSpace: 'pre-wrap', textAlign: 'left', fontSize: '1.2em', fontWeight: 600,
            }
          }
        >
          {data
            ? (
              <Fade>
                <Row>
                  <Col lg={4} data-aos="fade-right">
                    <div style={styles.introImageContainer}>
                      <img src={data?.imageSource} className="img-fluid" alt="profile" />
                    </div>
                  </Col>
                  <Col lg={8} pt={4} pt-lg={0} className="content" data-aos="fade-left">
                    {parseIntro(data.about)}
                    <div className="row">
                      <div className="col-lg-6">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                          <li style={{ paddingBottom: 10 }}>
                            <FcCloseUpMode />
                            <strong>  Birthday:</strong>
                            {data.birthday}
                          </li>
                          <li>
                            <FcCellPhone />
                            <strong>  Phone:</strong>
                            {data.phone}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                          <li style={{ paddingBottom: 10 }}>
                            <FcHome />
                            <strong>  City:</strong>
                            {data.city}
                          </li>
                          <li>
                            <FcFeedback />
                            <strong>  Email:</strong>
                            {data.email}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
