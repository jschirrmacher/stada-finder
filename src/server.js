const express = require('express')
const logger = console

const port = process.env.PORT || 3000
const app = express()
app.set('json spaces', 2)

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('../swagger.yaml')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(require('./router'))

app.listen(port, () => logger.info('Listening on port ' + port))
