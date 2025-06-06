import Button from "@/components/ui/buttons/Button";

const Chatbot = (): React.ReactElement => {
  // VARS
  const messages = [
    { from: 'user', text: 'Hello, how can I help you?' },
    { from: 'bot', text: 'Hi! I am here to assist you with any questions.' },
  ]

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-gray-700 text-gray-300 rounded-xl shadow-xl flex flex-col h-[500px] border border-gray-200">
      <div className="bg-indigo-600 text-white text-lg font-semibold p-4 rounded-t-xl">
        Career Coach
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 text-sm rounded-lg text-gray-200 max-w-[75%] ${msg.from === 'user'
                ? 'bg-indigo-500'
                : 'bg-gray-500'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form
        className="p-4 flex gap-2 border-t"
      >
        <input
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Type a message..."
        />
        <Button
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
