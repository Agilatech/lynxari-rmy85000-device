const config = require('./config');
const Scout = require(process.lynxari.scout);
const Rmy85000 = require('./rmy85000');

module.exports = class Rmy85000Scout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all config options defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          config[key] = opts[key];
        }
      }
    }

    if (config.name === undefined) { config.name = "RMY85000" }
    this.name = config.name;

    this.rmy85000 = new Rmy85000(config);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.rmy85000);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.rmy85000);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
