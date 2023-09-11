const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'))

app.use('/api', (req, res, next) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
    const date = new Date()

    const current_day = weekDays[date.getDay()]
    const utc_time = date.toUTCString()

    const slack_name = req.query.slack_name 
    const track = req.query.track
    const github_file_url = 'https://github.com/warithad/hng_backend_stage1/blob/main/app.js'
    const github_repo_url = 'https://github.com/warithad/hng_backend_stage1'

    res.status(200).json({
        slack_name,
        current_day,
        utc_time,
        track,
        github_file_url,
        github_repo_url,
        status_code: 200
    })
})
  
app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
})

module.exports = app