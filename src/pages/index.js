import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import debounce from 'lodash/debounce';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';

import { parse } from '../utils/parse';
import { generateJs } from '../utils/generate';

import Tab from '../components/tab';
import KeyboardLayout from '../components/keyboard';
import { runtimeFunctions } from '../utils/runtime';

import logo from '../../public/logo.png';

function App() {
  const [editorView, setEditorView] = useState();
  const [data, setData] = useState({
    ast: '',
    generatedJs: '',
  });

  const Theme = EditorView.theme({
    '&': {
      fontSize: '13pt',
    },
    '.cm-scroller': {
      overflow: 'auto',
      maxHeight: '50vh',
    },
  });

  const transpile = async (eduCode) => {
    try {
      const ast = await parse(eduCode);
      const generatedJs = await generateJs(JSON.stringify(ast));
      setData({ ast: JSON.stringify(ast, null, 2), generatedJs });
    } catch (error) {
      setData({ ast: '', generatedJs: '' });
    }
  };

  const debouncedSetCode = debounce(transpile, 300);

  useEffect(() => {
    const state = EditorState.create({
      extensions: [
        Theme,
        basicSetup,
        javascript(),
        indentUnit.of('    '),
        keymap.of([indentWithTab]),
        EditorView.updateListener.of((e) => {
          debouncedSetCode(e.state.doc.toString());
        }),
      ],
    });

    const editorView = new EditorView({ state, parent: document.querySelector('#editor') });
    setEditorView(editorView);
  }, []);

  return (
    <div className="main">
      <Head>
        <title>edu-playground</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/static/logo.png" />
      </Head>
      <div className="logo">
        <Image src={logo} width={70} height={70} /> <h1>- Playground</h1>
      </div>
      <div className="wrapper">
        <div className="language">
          <div className="editor">
            <div id="editor" spellCheck="false"></div>
          </div>
          <div className="output">
            <Tab data={data} />
          </div>
        </div>
        <div className="keyboard">
          <KeyboardLayout editorView={editorView} />
        </div>
        <h3 style={{ marginBottom: -15 }}>Built in functions:</h3>
        <p style={{ margin: 0 }}>edu has several built in functions you can use inside your code. </p>
        <div>
          <SyntaxHighlighter language="javascript">{runtimeFunctions}</SyntaxHighlighter>
        </div>
        Contact me at: se.yonatan.merkebu@gmail.com
      </div>
    </div>
  );
}

export default App;
