var iosConfigXML = require('./run_special_js_files/ios_config_xml');
var iosInfoPlist = require('./run_special_js_files/ios_info_plist');
var iosAppDelegateSwift = require('./run_special_js_files/ios_app_delegate_swift');

iosConfigXML.updateConfigXML();
iosInfoPlist.updateInfoPlist();
iosAppDelegateSwift.updateAppDelegateSwift();
