/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

module.exports = {
    drawRoutes: function (app) {
        app.get('/score/_all_docs', function (req, res) {
            res.json({"total_rows": 2, "offset": 0, "rows": [
                    {"id": "21e3f65527a48ea47bf0e973990041c6", "key": "21e3f65527a48ea47bf0e973990041c6", "value": {"rev": "1-298c3b3c342ecc10eb4756d6b920edfc"}, "doc": {"_id": "21e3f65527a48ea47bf0e973990041c6", "_rev": "1-298c3b3c342ecc10eb4756d6b920edfc", "score": 8092, "level": 4, "name": "Rudolf", "timestamp": 1379794963697}},
                    {"id": "21e3f65527a48ea47bf0e97399004965", "key": "21e3f65527a48ea47bf0e97399004965", "value": {"rev": "1-50683f5cf82197f370ac3e7da632ecaa"}, "doc": {"_id": "21e3f65527a48ea47bf0e97399004965", "_rev": "1-50683f5cf82197f370ac3e7da632ecaa", "score": 17403, "level": 5, "name": "Josefin", "timestamp": 1379795152917}}
                ]}
            );
        });
    }
};
