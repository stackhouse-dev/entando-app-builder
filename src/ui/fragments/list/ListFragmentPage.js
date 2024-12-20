import React, { Component } from 'react';
import { Grid, Row } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsFragmentFormContainer from 'ui/fragments/list/SettingsFragmentFormContainer';
import FragmentSearchFormContainer from 'ui/fragments/list/FragmentSearchFormContainer';
import FragmentListContent from 'ui/fragments/list/FragmentListContent';
import withPermissions from 'ui/auth/withPermissions';
import Button from 'ui/common/Button';
import Icon from 'ui/common/Icon';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const VIEW_LIST = 'list';
const VIEW_SETTINGS = 'settings';

export class ListFragmentPageBody extends Component {
  constructor(props) {
    super(props);
    this.setActiveView = this.setActiveView.bind(this);

    this.state = {
      activeView: VIEW_LIST,
    };
  }

  setActiveView(activeView) {
    this.setState({ activeView });
  }

  renderContent() {
    return this.state.activeView === VIEW_LIST
      ? <FragmentListContent />
      : <SettingsFragmentFormContainer />;
  }

  render() {
    return (
      <InternalPage className="ListFragmentPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.fragments', active: true },
        ]}
        />
        <Grid fluid>
          <PageTitle
            titleId="fragment.list.title"
            helpId="fragment.help"
            className="max-height"
          >
            <div className="ListFragmentPage__search-container">
              <FragmentSearchFormContainer />
            </div>
          </PageTitle>
          <Row >
            <div className="ListFragmentPage__bnt-container">
              <Button
                className="ListFragmentPage__header-btn clear secondary"
                active={this.state.activeView === VIEW_LIST}
                onClick={() => this.setActiveView(VIEW_LIST)}
              >
                <Icon name="list" />
                <FormattedMessage id="app.list" />
              </Button>
              <Button
                className="ListFragmentPage__header-btn clear secondary"
                active={this.state.activeView === VIEW_SETTINGS}
                onClick={() => this.setActiveView(VIEW_SETTINGS)}
              >
                <Icon name="gear" />
                <FormattedMessage id="app.settings" />
              </Button>
            </div>
          </Row>
          <Row>
            {this.renderContent()}
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

export default withPermissions(SUPERUSER_PERMISSION)(ListFragmentPageBody);
