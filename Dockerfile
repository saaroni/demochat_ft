FROM leanft:12.54

COPY . /scripts
WORKDIR /scripts

ENV RUN_COMMAND="mocha ./tests/login-tests.js --reporter node_modules/leanft.report/mocha/mochaReporter.js --snapshotsLevel=0"

