import React, { Component, PropTypes } from 'react';

import Page from '../../components/Page';

export default class ChannelCapabilities extends Component {
    static title = 'Channel Capabilities';

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        route: PropTypes.object.isRequired
    };

    render() {


        return <Page {...this.props}
                     className='channel-capabilities-grid-page'
                     title={ ChannelCapabilities.title }>
               </Page>;
    }
}
