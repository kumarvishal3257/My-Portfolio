import React from "react";
import ChatMessages from "./ChatMessages";
import { SUGGESTED_QUESTIONS } from "../../data/portfolioKnowledge";

function ChatPanel({
  messages,
  typing,
  input,
  onInput,
  onSubmit,
  onSuggestion,
  onClose,
  inputRef,
  logRef,
}) {
  const empty = messages.length === 0 && !typing;

  return (
    <div className="chat-panel" role="dialog" aria-modal="true" aria-labelledby="chat-title" id="chat-dialog">
      <header className="chat-header">
        <div>
          <p className="chat-kicker">Portfolio assistant</p>
          <h2 id="chat-title">Ask about Vishal</h2>
          <p className="chat-sub">Explore my experience, skills & projects</p>
        </div>
        <button type="button" className="chat-close" onClick={onClose} aria-label="Close chat">
          Close
        </button>
      </header>

      <div className="chat-body" ref={logRef}>
        {empty ? (
          <div className="chat-empty">
            <p>Ask a question. Answers stay limited to verified resume and portfolio details.</p>
            <ul className="chat-suggestions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <li key={question}>
                  <button type="button" onClick={() => onSuggestion(question)}>
                    {question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ChatMessages messages={messages} typing={typing} />
        )}
      </div>

      <form className="chat-form" onSubmit={onSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={onInput}
          placeholder="Ask about experience, skills, projects…"
          autoComplete="off"
        />
        <button type="submit" className="chat-send" disabled={!input.trim() || typing}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;
