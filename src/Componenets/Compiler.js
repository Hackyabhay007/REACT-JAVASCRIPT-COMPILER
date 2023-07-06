import React, { useState } from 'react';
import axios from 'axios';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const isHTMLDetected = code.includes('<html') || code.includes('<HTML');
  const compileCode = async () => {
    setIsLoading(true);

   

    if (isHTMLDetected) {
      const newWindow = window.open();
      newWindow.document.write(code);
      setIsLoading(false);
      newWindow.document.close();
    } else {
      const options = {
        method: 'POST',
        url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b5651fc483msh2b788579e10c869p168764jsneea5672e72aa',
          'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com',
        },
        data: {
          language: 'javascript',
          stdin: input,
          files: [
            {
              name: 'index.py',
              content: code,
            },
          ],
        },
      };

      try {
        const response = await axios.request(options);
        const apiOutput = response.data.stdout;
        setOutput(apiOutput);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          flex: '1',
          overflow: 'hidden',
          backgroundColor: '#282c34',
          color: '#fff',
          padding: '10px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e1e1e',
            padding: '10px',
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        >
          Code Editor
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '10px',
              padding: '10px',
              textAlign: 'right',
              fontFamily: 'Monaco, Courier, monospace',
              fontSize: '14px',
              overflowY: 'auto',
            }}
          >
            {code.split('\n').map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div
            style={{
              flex: '1',
              position: 'relative',
            }}
          >
            <textarea
              style={{
                width: '100%',
                height: '100vh',
                padding: '10px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#2f343d',
                color: '#fff',
                resize: 'none',
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '14px',
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#fff #2f343d',
              }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code..."
            ></textarea>
          </div>
        </div>
      </div>
      <div style={{ flex: '0 30%', backgroundColor: '#fff' }}>
        <div
          style={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '14px',
          }}
        >
          Output
        </div>
        <pre
          style={{
            margin: 0,
            padding: '10px',
            whiteSpace: 'pre-wrap',
            fontSize: '20px',
            height: '70%',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#4b4e53 #eaeaea',
          }}
        >
          {output}
        </pre>
        <div
          style={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '14px',
          }}
        >
          Input
        </div>
        <textarea
          style={{
            width: '100%',
            height: '30%',
            padding: '10px',
            border: 'none',
            outline: 'none',
            backgroundColor: '#2f343d',
            color: '#fff',
            resize: 'none',
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '14px',
          }}
          placeholder="Input..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <button
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50px',
          padding: '10px 20px',
          backgroundColor: '#5cb85c',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          animation: isHTMLDetected ? 'none' : 'pulse 1s infinite',
        }}
        onClick={compileCode}
        disabled={isLoading}
      >
        
        {isLoading ? 'Compiling...' : 'Compile'}
      </button>
    </div>
  );
};

export default Compiler;
