import React from 'react';
import Link from 'next/link';

import styles from '../styles/Dashboard.module.css';

const SubWrapper = ({ children, linkTo, bottonTxt, heading }) => {
  return (
    <div className={styles.dashboard}>
      {linkTo && bottonTxt && (
        <div className={styles.dashboardheader}>
          <Link href={linkTo}>
            <a>{bottonTxt}</a>
          </Link>
        </div>
      )}
      <h1 className={styles.heading}>{heading}</h1>
      {children}
    </div>
  );
};

export default SubWrapper;
