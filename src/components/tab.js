import { useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

const tabs = ['Syntax tree', 'Transpiled Code', 'Output'];

export default function Tab({ data }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState({ data: 'Click RUN to see output!', isError: false });

  const run = async (generatedJs) => {
    try {
      if (data.ast.length < 3) return;
      if (isLoading) return;
      setIsLoading(true);
      setSelectedIdx(2);
      fetch('/api/getResult', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ generatedJs }),
      })
        .then((res) => res.json())
        .then((data) => {
          setOutput({ data: data.data, isError: data.stderr });
          setIsLoading(false);
        })
        .catch(() => {
          setOutput({ data: 'Something went wrong', isError: true });
          setIsLoading(false);
        });
    } catch (error) {
      setOutput({ data: error.message ?? 'Something went wrong', isError: true });
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="tab-controller">
        {tabs.map((tab, i) => (
          <Controller key={i} idx={i} tabTitle={tab} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
        ))}

        <button className="button-25" onClick={() => run(data.generatedJs)}>
          RUN
        </button>
      </div>
      <div className="tab-body">
        {selectedIdx === 0 && <SyntaxHighlighter language="javascript">{`${data.ast}`}</SyntaxHighlighter>}
        {selectedIdx === 1 && <SyntaxHighlighter language="javascript">{`${data.generatedJs}`} </SyntaxHighlighter>}
        {selectedIdx === 2 && (
          <textarea
            className="result"
            value={isLoading ? 'Loading...' : output.data.length === 0 ? 'No output!' : output.data}
            style={output.isError ? { color: 'red' } : {}}
            readOnly
          />
        )}
      </div>
    </div>
  );
}

function Controller({ idx, tabTitle, selectedIdx, setSelectedIdx }) {
  return (
    <div className={`controller ${idx === selectedIdx ? 'selected-controller' : ''}`} onClick={() => setSelectedIdx(idx)}>
      {tabTitle}
    </div>
  );
}
