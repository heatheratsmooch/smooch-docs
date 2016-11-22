export const onRouteUpdate = ({pathname}) => {
    if (global.ga) {
        global.ga('set', 'page', pathname);
        global.ga('send', 'pageview');
    }
};
