var app = angular.module('plunker', ['ui.ace']);

app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/./);
}]);

app.controller('MainCtrl', function($scope, $http) {
    var options = {};
    options.codes = {
        "205": "Reset Content",
        "507": "Insufficient Storage",
        "444": "No Response",
        "302": "Found",
        "400": "Bad Request",
        "411": "Length Required",
        "307": "Temporary Redirect",
        "501": "Not Implemented",
        "425": "Unordered Collection",
        "100": "Continue",
        "404": "Not Found",
        "450": "Blocked by Windows Parental Controls",
        "415": "Unsupported Media Type",
        "418": "I'm a teapot",
        "504": "Gateway Timeout",
        "201": "Created",
        "407": "Proxy Authentication Required",
        "303": "See Other",
        "410": "Gone",
        "429": "Too Many Requests",
        "509": "Bandwidth Limit Exceeded",
        "206": "Partial Content",
        "414": "Request-URI Too Long",
        "306": "Switch Proxy",
        "426": "Upgrade Required",
        "500": "Internal Server Error",
        "403": "Forbidden",
        "422": "Unprocessable Entity",
        "408": "Request Timeout",
        "505": "HTTP Version Not Supported",
        "202": "Accepted",
        "428": "Precondition Required",
        "431": "Request Header Fields Too Large",
        "510": "Not Extended",
        "413": "Request Entity Too Large",
        "300": "Multiple Choices",
        "409": "Conflict",
        "208": "Already Reported",
        "102": "Processing",
        "503": "Service Unavailable",
        "405": "Method Not Allowed",
        "203": "Non-Authoritative Information",
        "499": "Client Closed Request",
        "308": "Permanent Redirect",
        "402": "Payment Required",
        "423": "Locked",
        "304": "Not Modified",
        "416": "Requested Range Not Satisfiable",
        "506": "Variant Also Negotiates",
        "412": "Precondition Failed",
        "101": "Switching Protocols",
        "502": "Bad Gateway",
        "207": "Multi-Status",
        "204": "No Content",
        "420": "Enhance Your Calm",
        "226": "IM Used",
        "305": "Use Proxy",
        "406": "Not Acceptable",
        "449": "Retry With",
        "424": "Failed Dependency",
        "401": "Unauthorized",
        "200": "OK",
        "301": "Moved Permanently",
        "417": "Expectation Failed"
    }

    options.contentTypes = {
        "multipart/form-data": "text",
        "application/json": "json",
        "text/csv": "text",
        "application/x-www-form-urlencoded": "text",
        "text/css": "css",
        "application/xhtml+xml": "html",
        "text/plain": "text",
        "text/json": "json",
        "text/html": "html",
        "application/xml": "xml",
        "text/xml": "xml"
    }

    options.charsets = ["UTF-8", "ISO-8859-1", "UTF-16"]

    $scope.options = options;

    $scope.aceChanged = function(_editor) {
        // Get Current Value
        var currentValue = ace.edit("editor").getValue();
    };

    $scope.aceLoaded = function() {
        $scope.aceChanged();
    }

    $scope.submit = function() {
        var currentValue = ace.edit("editor").getValue();
        var host = "http://localhost:3000";
        $http.post(host, {
                data: currentValue,
                selectedCode: $scope.selectedCode || "200",
                contentType: $scope.selectedContentTypes || "utf-16"
            }).then(function(data) {
                console.dir(data);
                $scope.message = data.data._id;
                $scope.link = host + "/" + data.data._id;
            })
            .catch(function() {
                alert("Something bad happened, please try again.");
            });
    };

});