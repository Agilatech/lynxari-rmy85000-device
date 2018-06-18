const LynxariDevice = require(process.lynxari.device);
const device = require('@agilatech/rmy85000');

module.exports = class Rmy85000 extends LynxariDevice {
    
    constructor(config) {
        
        // The file must be defined. If not supplied in config, then default to ttyS0
        const file  = config['file'] || "/dev/ttyS0";
        
        const hardware = new device.Rmy85000(file);
        
        super(hardware, config);

    }
}

