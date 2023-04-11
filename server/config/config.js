/**
 * Configuration management
 */

const fs = require('fs');

/**
 * Load configuration from the passed configuration file path
 * @param {String} path - configuration file path
 * @returns - configuration
 */
function loadConfig(path) {
    try {
        let c = fs.readFileSync(path);
        return JSON.parse(c);
    } catch (err) {
        console.log(`Unable to load configuration from ${path}`);
    }
}
/**
 * Save configuration to config.json located in the runtime directory
 * @param {object} config - configuration
 */
function saveConfig(path, config) {
    try {
        fs.writeFileSync(path, JSON.stringify(config, null, 2));
    } catch (err) {
        console.log(`Unable to save configuration to ${path}: ` + err.message);
    }
}

module.exports.loadConfig = loadConfig;
module.exports.saveConfig = saveConfig;


