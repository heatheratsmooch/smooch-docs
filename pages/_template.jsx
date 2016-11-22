import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers';
import 'styles/markdown-styles';
import 'styles/main';

import { config } from 'config';
import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';

export default class extends Component {
    static propTypes = {
        children: PropTypes.any
    };

    scrollToHash = () => {
        const {location} = this.props;
        const {hash} = location;

        if (hash) {
            const hashNode = document.querySelector(hash);
            if (hashNode) {
                setTimeout(() => {
                    hashNode.scrollIntoView();
                });
            }
        }
    };

    componentDidMount() {
        this.scrollToHash();
    }

    componentDidUpdate() {
        this.scrollToHash();
    }

    render() {

        const htmlAttributes = {
            lang: 'en'
        };

        const base = {
            href: prefixLink('/')
        };

        const meta = [{
            property: 'og:locale',
            content: 'en_US'
        }, {
            property: 'og:site_name',
            content: 'Smooch Documentation'
        }, {
            property: 'og:image',
            content: require('../images/sm_logo_fb.jpg')
        }, {
            name: 'msapplication-TileColor',
            content: '#ffffff'
        }, {
            name: 'msapplication-TileImage',
            content: require('../images/ms-icon-144x144.png')
        }, {
            name: 'theme-color',
            content: '#912d8d'
        }];

        const link = [{
            rel: 'apple-touch-icon',
            sizes: '57x57',
            href: require('../images/apple-icon-57x57.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '60x60',
            href: require('../images/apple-icon-60x60.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            href: require('../images/apple-icon-72x72.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '76x76',
            href: require('../images/apple-icon-76x76.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            href: require('../images/apple-icon-114x114.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '120x120',
            href: require('../images/apple-icon-120x120.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            href: require('../images/apple-icon-144x144.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            href: require('../images/apple-icon-152x152.png')
        }, {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: require('../images/apple-icon-180x180.png')
        }, {
            rel: 'icon',
            sizes: '16x16',
            href: require('../images/favicon-16x16.png')
        }, {
            rel: 'icon',
            sizes: '32x32',
            href: require('../images/favicon-32x32.png')
        }, {
            rel: 'icon',
            sizes: '96x96',
            href: require('../images/favicon-96x96.png')
        }, {
            rel: 'icon',
            sizes: '192x192',
            href: require('../images/android-icon-192x192.png')
        }];

        return <div>
                   <Helmet htmlAttributes={ htmlAttributes }
                           titleTemplate={ `${config.siteTitle} | %s` }
                           defaultTitle='Documentation'
                           base={ base }
                           link={ link }
                           meta={ meta } />
                   <SiteNav />
                   <DocsNav />
                   { this.props.children }
               </div>;
    }
}
