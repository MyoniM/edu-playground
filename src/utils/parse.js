import nearley from 'nearley';

import edu from './edu';

async function parse(eduCode) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(edu));

  parser.feed(eduCode);
  const parseResult = parser.results;
  
  if (parseResult.length > 2) throw new Error('Error: Ambiguous code detected!');
  else if (parseResult.length === 0) throw new Error('Error: Grammar not found!');
  else return parseResult[0];
}

export { parse };
