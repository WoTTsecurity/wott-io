mixpanel.init("d13e45987defd1ead46d7153e5aac6bc");
mixpanel.track('Page View');

$('[mp-track]').click((e) => {
    let target = e.target,
        config = target.hasAttribute('mp-element')? {element: target.getAttribute('mp-element')}: {},
        name = target.getAttribute("mp-track");
    mixpanel.track(name, config);
});
mixpanel.track_links('.log_in', "Log In");
mixpanel.track_links('.sign_up', "Sign Up");