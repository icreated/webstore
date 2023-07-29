# &int; created
> Integration created
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7TYVAGLZ7XATQ&source=url)


# Icreated WebStore Angular / Bootstrap
> The full information about this project is available here: [https://icreated.co/projects/webstore](https://icreated.co/projects/webstore)

> The demo is available here: [https://webstore.icreated.co](https://webstore.icreated.co)

> The very simple backend API REST services for DEMO is available here: [https://github.com/icreated/webstore-json-server](https://github.com/icreated/webstore-json-server)

> The original Idempiere backend API REST services is available here:
[https://github.com/icreated/webstore-api](https://github.com/icreated/webstore-api)

Angular WebStore is a frontend application created as responsive angular / bootstrap seed for your projects. 
It can be used as a starting point for your WebStore project with custom backend API REST services. It is possible thankfully to OpenApi first approach.
This application shows standard web sites features:
* product catalog
* product search
* user authentication
* basket management synchronized with server
* order checkout
* private customer area
* orders information
* addresses management
* password update
* account information update


![WebStore Architecture](https://icreated.co/assets/images/projects/webstore/screenshot_architecture.png?raw=true "Webstore Architecture")


## Some snapshots:

### Home page

![WebStore Home](https://icreated.co/assets/images/projects/webstore/screenshot_home.png?raw=true "Webstore Home")

### Basket page

![WebStore Basket](https://icreated.co/assets/images/projects/webstore/screenshot_basket.png?raw=true "Webstore Basket")

### Checkout page

![WebStore Checkout](https://icreated.co/assets/images/projects/webstore/screenshot_checkout.png?raw=true "Webstore Checkout")

### Order page

![WebStore Order](https://icreated.co/assets/images/projects/webstore/screenshot_order.png?raw=true "Webstore Order")



## Installing / Getting started

Run `npm install`.

This will create the node_modules directory in your current directory (if one doesn’t exist yet) and will download packages to that directory.

Install also backend API REST services. There are two options:
* Simple Json Server: [https://github.com/icreated/webstore-json-server](https://github.com/icreated/webstore-json-server) available at port 3000
* Idempiere Webstore API REST plugin: [https://github.com/icreated/webstore-api](https://github.com/icreated/webstore-api) In this case you have to:
  * Install Postgresql
  * Install Idempiere
  * Install Webstore API REST plugin
  * Configure all these components

The backend endpoint is configured in the environment.ts file:
```
    api: {
      baseUrl: 'http://localhost:3000' // for Json Server
      // baseUrl: 'http://localhost:8080/services/api/', // for Idempiere Webstore API REST plugin
    }
```



### Deploying / Publishing / Testing

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. 

Pull requests are warmly welcome


## Licensing

GNU General Public License


