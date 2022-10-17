const util = require('node:util');
const fs = require('mz/fs');
const path = require('path');
const exec = util.promisify(require('node:child_process').exec);
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { generatedJs } = req.body;

    const filepath = await generateFile(generatedJs);
    const result = await myExec(filepath);
    await fs.unlink(filepath);
    
    return res.status(200).json(result);
  }
  res.status(404).send({});
}

async function myExec(filepath) {
  return new Promise((resolve, reject) => {
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      stderr && resolve({ data: stderr, stderr: true });
      error && reject({ error, stderr });
      resolve({ data: stdout, stderr: false });
    });
  });
}

const generateFile = async (document) => {
  if (!fs.existsSync(dirCodes)) await fs.mkdir(dirCodes, { recursive: true });
  const jobId = uuid();
  const fileName = `${jobId}.${'js'}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFile(filePath, document + '\n' + runtimeFunctions);
  return filePath;
};

const runtimeFunctions = `
  // These are functions that will be appended to the generated .js file
  function አውጣ(...args) {
    console.log(...args);
  }

  function ደምር(...args) {
    if (args.length === 0) return NaN;
    const init = 0;
    const sum = args.reduce((prev, curr) => prev + curr, init);
    return sum;
  }

  function ቀንስ(...args) {
    if (args.length === 0) return NaN;
    const init = args[0] * 2;
    const diff = args.reduce((prev, curr) => prev - curr, init);
    return diff;
  }

  function አብዛ(...args) {
    if (args.length === 0) return NaN;
    const init = 1;
    const mult = args.reduce((prev, curr) => prev * curr, init);
    return mult;
  }

  function ክፈል(...args) {
    if (args.length === 0) return NaN;
    const init = args[0] * args[0];
    const div = args.reduce((prev, curr) => prev / curr, init);
    return div;
  }

  function ሞጁሎ(x, y) {
    return x % y;
  }

  function ካሬ_ሥር(x) {
    return Math.sqrt(x);
  }

  function ከፍ_አድርግ(x, y) {
    return Math.pow(x, y);
  }

  function ወደ_ታች(x) {
    return Math.floor(x);
  }

  function ወደ_ላይ(x) {
    return Math.ceil(x);
  }

  function አገናኝ(s1, s2) {
    return s1 + s2;
  }

  function እኩል_ነው(x, y) {
    return x === y;
  }

  function ያንሳል(x, y) {
    return x < y;
  }

  function ይበልጣል(x, y) {
    return x > y;
  }

  function ከሆነ(cond, consequent, alternate) {
    if (cond) return consequent();
    else return alternate();
  }

  function ወይም(cond1, cond2) {
    return cond1 || cond2;
  }

  function እና(cond1, cond2) {
    return cond1 && cond2;
  }

  function እዚህ(iterable, index) {
    return iterable[index];
  }

  function ድገም(string, times) {
    let result = '';
    for (let i = 0; i < times; i++) {
      result += string;
    }
    return result;
  }

  function ክልል(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function ለእያንዳንዱ(arr, fun) {
    arr.forEach((e) => fun(e));
  }
`;
