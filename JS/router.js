export class Router {
    routes = {};

    add(routeName, page) {
        this.routes[routeName] = page
    };

    async route(event) {
        event = event || window.event
        event.preventDefault();

        window.history.pushState({}, "", event.target.href)

        await this.handle()
    };

    async handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        if (pathname == "" || pathname == "/" || pathname == "/index.html") {
            $('body').addClass('home-background');
            $('body').removeClass('universe-background');
            $('body').removeClass('exploration-background');
        } else if (pathname == "/universo") {
            $('body').removeClass('home-background');
            $('body').removeClass('exploration-background');
            $('body').addClass('universe-background');
        } else if (pathname == "/exploracao") {
            $('body').removeClass('home-background');
            $('body').removeClass('universe-background');
            $('body').addClass('exploration-background');
        };

        await fetch(route)
            .then((data) => data.text())
            .then(html => document.querySelector('#app').innerHTML = html)
    };
};
