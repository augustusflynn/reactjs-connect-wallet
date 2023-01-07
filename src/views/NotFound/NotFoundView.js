import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundView = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h4>{t('notfound.header')}</h4>
      <Link to="/"> {t('notfound.go_back_to_home')} </Link>
    </div>
  );
};

export default NotFoundView;
