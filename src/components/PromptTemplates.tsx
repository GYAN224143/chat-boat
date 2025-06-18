interface PromptTemplatesProps {
  onSelect: (template: string) => void;
}

const templates = [
  'Tell me a joke',
  "What's the weather like today?",
  'Explain quantum computing in simple terms',
  'Give me a recipe for chocolate chip cookies',
  'What are the latest tech news?',
];

const PromptTemplates = ({ onSelect }: PromptTemplatesProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        Try these prompts:
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelect(template)}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptTemplates;
