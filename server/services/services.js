/**
 * Created with IntelliJ IDEA.
 * User: karab
 * Date: 13/10/14
 * Time: 14:31
 * To change this template use File | Settings | File Templates.
 */



var tools = require('../utils/tools.js');

exports.getKids = function(){
    return tools.readJSONFile('kids');
}

