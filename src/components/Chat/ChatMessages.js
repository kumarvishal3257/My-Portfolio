import React from "react";

function ChatMessages({ messages, typing }) {
  return (
    <div className="chat-log" role="log" aria-live="polite" aria-relevant="additions">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-bubble chat-bubble-${message.role}`}
        >
          <p className="chat-text">{message.text}</p>
          {message.links && message.links.length > 0 && (
            <ul className="chat-links">
              {message.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {typing && (
        <div className="chat-bubble chat-bubble-assistant" aria-label="Assistant is typing">
          <span className="chat-typing">
            <span />
            <span />
            <span />
          </span>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
