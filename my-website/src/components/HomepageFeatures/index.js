import React from 'react';
import styles from './styles.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>Para PCDs</h3>
              <p>Encontre vagas inclusivas</p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>Para Empresas</h3>
              <p>Contrate talentos diversos</p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>API Completa</h3>
              <p>Documentação detalhada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}