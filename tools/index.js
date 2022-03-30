const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const PORT = 8086;

// pid: https://bulbapedia.bulbagarden.net/wiki/Personality_value

// for sessions with more than 1K lines, fs.createReadStream should be used
let sessionPath = path.join(__dirname,'..','json_sample_files');
let sessionFile = fs.readdirSync(sessionPath).filter(file => /_session\.txt/.test(file) ).sort()[0];
let replayData, timeStamps;
let replayTimer; /* setInterval object */
let replayMode = false;
let timeOffset = 0;

if(sessionFile !== undefined){
    console.log(`session replay: ${sessionFile}`);
    let data = fs.readFileSync(path.join(sessionPath,sessionFile),'utf-8');
    data = data.replace(/^/,'{\n')  /* adds '{' at the beginning of the data (^) */
                .replace(/^([0-9]+)/gm,'"$1"')  /* surrounds numbers at the beginning of each line with '"' (^ with 'm' modifier) */
                .replace(/, \[/g,':[')
                .replace(/\]\s*/g,'],\n')
                .replace(/,\s*$/,'\n}') /* removes the trailing ',' of the last item, then appends '}' */
    replayData = JSON.parse(data);
    timeStamps = Object.keys(replayData).map(key => Number(key));
    console.log(replayData);
    console.log(timeStamps);
}

const cors = require('cors');
app.use(cors());

// serving current_version folder contents as static files
let publicPath = path.join(__dirname,'..','current_version');
app.use('/',express.static(publicPath));

// http://localhost:8086  shows first entry of the session
// http://localhost:8086/?mode=replay  replay in realtime
// http://localhost:8086/?mode=replay&time=200000 replay time offset in milliseconds
app.get('/',(request,response) => {
    if(request.query.mode === undefined){
        replayMode = false;
        if(replayTimer !== undefined){ /* replay is running */
            clearInterval(replayTimer);
            console.log('Replay stopped');
        }
        response.sendFile(path.join(publicPath,'./template.html'));
    }
    if(request.query.mode === 'replay'){
        replayMode = true;
        if(request.query.time !== undefined){
            timeOffset = parseInt(request.query.time);
            console.log(timeOffset);
            if(isNaN(timeOffset) || timeOffset > timeStamps.at(-2)) timeOffset = 0;
        }
        timeBegan = new Date();
        replayTimer = setInterval(replay,100);
        response.sendFile(path.join(publicPath,'./template.html'));
    }
});

let timeBegan, timeElapsed;
function replay(){
    let currentTime = new Date();
    timeElapsed = currentTime - timeBegan + timeOffset;
}

app.get('/json_generator/party.json',(request,response) => {
    if(replayMode === false) {
        return response.json(replayData['60']);
    } else {
        let timeStamp = timeStamps.find(ts => timeElapsed < ts);
        console.log(`Elapsed time: ${timeElapsed}, Current timestamp: ${timeStamp}`);
        return response.json(replayData[timeStamp]);
    }
});

// Resource not found at the end of the chain
app.use((req, res) => {
    res.status(404).json({
        'error': 'Not Found'
    });
});

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
});

