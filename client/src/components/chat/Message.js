export default function Message({ content, isUser, sender }) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {!isUser && <div className="text-xs font-semibold text-gray-500">{sender}</div>}
          <p>{content}</p>
        </div>
      </div>
    );
  }