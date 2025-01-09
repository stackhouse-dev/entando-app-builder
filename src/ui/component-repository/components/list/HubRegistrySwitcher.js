import React, { useEffect, Fragment, useCallback } from 'react';
import { Row, Col, Button, DropdownKebab, MenuItem, Icon } from 'patternfly-react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import { fetchRegistries, setActiveRegistry, setFetchedBundleGroups, setFetchedBundlesFromRegistry } from 'state/component-repository/hub/actions';
import { getRegistries, getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { ADD_NEW_REGISTRY_MODAL_ID } from 'ui/component-repository/components/list/AddNewRegistryModal';
import { DELETE_REGISTRY_MODAL_ID } from 'ui/component-repository/components/list/DeleteRegistryModal';
import { EDIT_REGISTRY_MODAL_ID } from 'ui/component-repository/components/list/EditRegistryModal';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import BundleGroupAutoCompleteContainer from 'ui/component-repository/components/BundleGroupAutoCompleteContainer';

const BUNDLE_GROUP_FILTER_ID = 'bundleGroup';

const DEFAULT_ECR_REGISTRY = {
  name: ECR_LOCAL_REGISTRY_NAME,
  url: '',
};

const ACTIVE_REGISTRY_KEY = 'activeRegistry';

const HubRegistrySwitcher = () => {
  const activeRegistry = useSelector(getSelectedRegistry);
  const registries = useSelector(getRegistries);
  const dispatch = useDispatch();

  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;

  const handleRegistryChange = useCallback((registry) => {
    if (registry.name !== activeRegistry.name) {
      dispatch(setFetchedBundleGroups([]));
      dispatch(setFetchedBundlesFromRegistry([]));
      dispatch(setActiveRegistry(registry));
      localStorage.setItem(ACTIVE_REGISTRY_KEY, registry.url);
    }
  }, [activeRegistry, dispatch]);

  const handleNewRegistryClick = () => {
    dispatch(setVisibleModal(ADD_NEW_REGISTRY_MODAL_ID));
    dispatch(setInfo({ type: 'Registry' }));
  };

  const handleEditRegistry = (registry) => {
    dispatch(setVisibleModal(EDIT_REGISTRY_MODAL_ID));
    dispatch(setInfo({ editData: registry }));
  };

  const handleDeleteRegistry = (registry) => {
    if (activeRegistry.id === registry.id) return;
    dispatch(setVisibleModal(DELETE_REGISTRY_MODAL_ID));
    dispatch(setInfo({ type: 'Registry', code: registry.name, id: registry.id }));
  };

  useEffect(() => { dispatch(fetchRegistries()); }, [dispatch]);

  useEffect(() => {
    const activeRegistryUrl = localStorage.getItem(ACTIVE_REGISTRY_KEY);
    if (activeRegistryUrl) {
      const registry = registries.find(reg => reg.url === activeRegistryUrl);
      if (registry) {
        handleRegistryChange(registry);
      }
    } else {
      handleRegistryChange(DEFAULT_ECR_REGISTRY);
    }
  }, [handleRegistryChange, registries]);

  return (
    <Row className="HubRegistrySwitcher">
      <Col md={12}>
        <div className="HubRegistrySwitcher__body">
          <div className="HubRegistrySwitcher__data">
            <div className="HubRegistrySwitcher__title">
              {activeRegistry.name}
            </div>
            <div className="HubRegistrySwitcher__description">
              {activeRegistry.url}
            </div>
          </div>
          <div className="HubRegistrySwitcher__switcher">
            <div className="HubRegistrySwitcher__switcher-label">
              <FormattedMessage id="hub.selectRegistry" />
            </div>
            <div className="HubRegistrySwitcher__switcher-dropdown">
              <DropdownKebab pullRight id="hub-registry-switcher">
                {
                  registries.map(reg => (
                    <MenuItem
                      id={reg.name}
                      key={reg.name}
                      className="HubRegistrySwitcher__kebab-menu-item"
                      disabled={reg.name === activeRegistry.name}
                    >
                      <div
                        role="button"
                        tabIndex={-1}
                        onClick={() => handleRegistryChange(reg)}
                        onKeyDown={() => handleDeleteRegistry(reg)}
                        className="HubRegistrySwitcher__action-label"
                      >
                        <span
                          style={{ visibility: reg.apiKeyPresent ? 'visible' : 'hidden' }}
                          className="HubRegistrySwitcher__key-icon pficon pficon-key fa-lg"
                        />
                        {reg.name}
                      </div>
                      {
                        reg.name !== ECR_LOCAL_REGISTRY_NAME && (
                          <Fragment>
                            <div
                              role="button"
                              tabIndex={-1}
                              className="HubRegistrySwitcher__edit"
                              onClick={() => handleEditRegistry(reg)}
                              onKeyDown={() => handleEditRegistry(reg)}
                            >
                              <Icon size="lg" name="edit" />
                            </div>
                            <div
                              role="button"
                              tabIndex={-1}
                              className="HubRegistrySwitcher__trash"
                              onClick={() => handleDeleteRegistry(reg)}
                              onKeyDown={() => handleDeleteRegistry(reg)}
                            >
                              <Icon size="lg" name="trash" />
                            </div>
                          </Fragment>
                        )
                      }
                    </MenuItem>
                  ))
                }
                <MenuItem
                  id="addNewRegistry"
                  className="HubRegistrySwitcher__kebab-menu-item--new"
                  onClick={handleNewRegistryClick}
                >
                  <div className="HubRegistrySwitcher__action-label--new">
                    <FormattedMessage id="hub.newRegistry" />
                  </div>
                </MenuItem>
              </DropdownKebab>
            </div>
          </div>
          <div className="ComponentListPage__container-header">
            <div className="ComponentListPage__container-header-title">
              <FormattedMessage id="componentRepository.categories.component" />
            </div>
            <div className="ComponentListPage__container-header-actionbar">
              <div>
                {
                  isLocalRegistry ? <FilterTypeContainer /> : (
                    <Button
                      key={BUNDLE_GROUP_FILTER_ID}
                      className="active"
                    >
                      <FormattedMessage id="app.filterTypesSelect.bundleGroup" />
                    </Button>
                  )
                }
                {
                  isLocalRegistry ? (
                    <SearchBarContainer />
                  ) : (
                    <BundleGroupAutoCompleteContainer />
                  )
                }
              </div>
              <div>
                {
                  isLocalRegistry && <ExtraTabBarFilterContainer />
                }
              </div>
              <div>
                <ComponentListViewModeSwitcherContainer />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HubRegistrySwitcher;
