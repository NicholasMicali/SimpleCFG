const fs = require('fs');
const express = require('express');
const { spawn } = require('child_process');

const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());

let lineNumber = "0";

app.post('/savePythonFile', (req, res) => {
  const code = req.body.code;

  // Assuming 'pythonFiles' is a directory in your server
  const fileName = 'program.py';
  const filePath = './program.py'
  console.log("savePythonFile");
  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving Python file');
    } else {
      res.status(200).send('Python file saved successfully');
    }
  });
});


app.post('/run-python', (req, res) => {
  const { pythonScript, args } = req.body;

  const pythonProcess = spawn('python3', [pythonScript, ...args]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Script Output: ${data}`);
    lineNumber = data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error in Python Script: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script exited with code ${code}`);
    res.json({ code });
  });
});



app.get('/lineNums', (req, res) => {
  res.json(lineNumber);
});


app.get('/consoleOutput', (req, res) => {
  const program = "program";
  const args = [];

  console.log("backend-----");
  const command = `import ${program}; ${program}.main()`;
  const pythonProcess = spawn('python3', ['-c', command, ...args]);
  console.log("Backend ran the python-----");
  pythonProcess.stdout.on('data', (data) => {
    res.json(data.toString());
    console.log(data.toString());
  });

  //pythonProcess.stderr.on('data', (data) => {
  //  res.json('Error: ' + data.toString());
  //});
  console.log("now closing the file");
  pythonProcess.on('close', (code) => {
    console.log(`Program exited with code ${code}`);
    //res.json({ code });
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});