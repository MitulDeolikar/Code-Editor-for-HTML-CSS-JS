import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css'; // Add other themes as needed
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt, faCopy, faSun } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { autoCloseTags } from '@codemirror/lang-html';

export default function Editor(props) {
    const { language, displayName, value, onChange } = props;
    const [open, setOpen] = useState(true);
    const [theme, setTheme] = useState('material'); // Default theme
    

    function handleChange(editor, data, value) {
        onChange(value);
    }

    function handleCopy() {
        navigator.clipboard.writeText(value)
            .then(() => {
                toast.success('Copied to clipboard!', { autoClose: 2500 });
            })
            .catch(err => {
                toast.error('Failed to copy: ' + err, { autoClose: 2500 });
            });
    }

    function handleThemeChange() {
        setTheme(prevTheme => (prevTheme === 'material' ? 'eclipse' : 'material'));
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <div>
                    <button
                        type="button"
                        className="copy-btn"
                        onClick={handleCopy}
                        title="Copy to Clipboard"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                        type="button"
                        className="theme-btn"
                        onClick={handleThemeChange}
                        title="Change Theme"
                    >
                        <FontAwesomeIcon icon={faSun} />
                    </button>
                    <button
                        type="button"
                        className="expand-collapse-btn"
                        onClick={() => setOpen(prevOpen => !prevOpen)}
                    >
                        <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
                    </button>
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: theme, // Use theme state
                    lineNumbers: true,
                    autoCloseBrackets: true,
                    autoCloseTags:true,
                    extraKeys: {
                        "Ctrl-Space": "autocomplete", // Keeps manual trigger if needed
                        "Cmd-Space": "autocomplete", // Keeps manual trigger if needed
                        "Tab":"autocomplete"
                    }
                }}
            />
            <ToastContainer />
        </div>
    );
}
