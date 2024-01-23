import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { SiTistory } from 'react-icons/si';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  iconContainer: {
    display: 'inline-block',
    borderRadius: '50%',
    backgroundColor: 'theme.socialIconBgColor',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      {data ? data.social.map((social) => (
        <div key={social.network} style={styles.iconContainer}>
          <SocialIcon
            url={social.href}
            network={social.network}
            bgColor={theme.socialIconBgColor}
            target="_blank"
            rel="noopener"
          />
        </div>
      )) : null}
      <div style={styles.iconContainer}>
        <SiTistory
          bgColor={theme.socialIconBgColor}
          onClick={() => window.open('https://sab-dev7.tistory.com/')}
          target="_blank"
          rel="noopener"
        />
      </div>
    </div>
  );
}

export default Social;
