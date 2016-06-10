// see https://github.com/haydenbleasel/favicons
module.exports = {
    appName: null,                  // Your application's name. `string`
    appDescription: null,           // Your application's description. `string`
    developerName: null,            // Your (or your developer's) name. `string`
    developerURL: null,             // Your (or your developer's) URL. `string`
    background: "#003E5E",          // Use DMC Dark blue, as background colour for flattened icons. `string`
    //path: "/",                    // Path for overriding default icons path. `string`
    //url: "/",                     // Absolute URL for OpenGraph image. `string`
    display: "browser",             // Android display: "browser" or "standalone". `string`
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
    version: "1.0",                 // Your application's version number. `number`
    logging: false,                 // Print logs to console? `boolean`
    online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
    icons: {
        android: true,              // Create Android homescreen icon. `boolean`
        appleIcon: true,            // Create Apple touch icons. `boolean`
        appleStartup: false,        // Create Apple startup images. `boolean`
        coast: false,               // Create Opera Coast icon. `boolean`
        favicons: true,             // Create regular favicons. `boolean`
        firefox: true,              // Create Firefox OS icons. `boolean`
        opengraph: false,           // Create Facebook OpenGraph image. `boolean`
        twitter: false,             // Create Twitter Summary Card image. `boolean`
        windows: true,              // Create Windows 8 tile icons. `boolean`
        yandex: false               // Create Yandex browser icon. `boolean`
    }
};