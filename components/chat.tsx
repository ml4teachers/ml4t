'use client'
 
import { useChat } from 'ai/react'
import { Callout } from 'nextra/components'
import styles from './chat.module.css'


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
 
  return (
    <div>
      {messages.map(m => (
        <Callout
        type={m.role === 'user' ? 'info' : 'warning'}
        emoji={m.role === 'user' ? '👤' : '🤖'}>
          <div key={m.id}>
            {m.content}
          </div>
        </Callout>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input className={styles.input}
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}