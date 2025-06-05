'use strict';

const promClient = require('prom-client')

const register = new promClient.Registry()

register.setDefaultLabels({
    app: 'nodejs-skeleton-app'
});

const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

register.registerMetric(httpRequestDurationMicroseconds);

exports.httpRequestDurationMicroseconds = httpRequestDurationMicroseconds
exports.register = register
