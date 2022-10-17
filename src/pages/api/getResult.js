export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { generatedJs } = req.body;

    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        script: generatedJs + '\n' + runtimeFunctions,
        language: 'nodejs',
        versionIndex: 4,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      return res.status(200).json({ data: data.output, isError: false });
    }
    return res.status(400).json({ data: 'Something went wrong!', isError: true });
  }
}

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
