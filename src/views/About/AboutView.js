import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/about-page.css';
import { useTranslation } from 'react-i18next';

// Since this component is simple and static, there's no parent container for it.
const AboutView = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="alt-header">{t('about.title')}</h2>
      <p>{t('about.description')}</p>
      <p>
        <Link to="/badlink">{t('about.click_to_this_bad_link')}</Link> {t('about.to_see_404')}
      </p>
    </div>
  );
};

export default AboutView;
