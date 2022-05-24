import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';
import RowSpinner from 'ui/pages/common/RowSpinner';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUserName = useSelector(getUsername);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      dispatch(fetchMfeConfigList()).then(() => setLoading(false));
    }
  }, [dispatch, currentUserName]);


  return <div>{loading ? <div className="shell-preload"><RowSpinner loading /></div> : children}</div>;
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};