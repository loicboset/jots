import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isRangeSelection } from "lexical";

import { $createSkilledPromptNode } from "@/components/collections/Editor/nodes/SkilledPromptNode";
import { $createSkilledPromptWrapperNode } from "@/components/collections/Editor/nodes/SkilledPromptWrapperNode";
import Modal from "@/components/ui/modals/Modal";
import { prompts } from "@/prompts";
import usePromptsLibraryStore from "@/stores/usePromptsLibraryStore";

const PromptsLibraryModal = (): React.ReactElement => {
  // STORE
  const isOpen = usePromptsLibraryStore((state) => state.isOpen);
  const toggle = usePromptsLibraryStore((state) => state.toggle);
  const selection = usePromptsLibraryStore((state) => state.selection);

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // VARS
  const groups = new Set(prompts.map(prompt => prompt.skill));

  // METHODS
  const handleAddPromptToEditor = (text: string, skill: string): void => {
    editor.update(() => {
      if ($isRangeSelection(selection)) {
        const skilledNode = $createSkilledPromptWrapperNode(text, skill);
        const paragraph = $createSkilledPromptNode();
        skilledNode.append(paragraph);
        selection.insertNodes([skilledNode]);
        paragraph.selectStart();
      }
    });
    toggle();
  };

  return (
    <Modal open={isOpen} toggle={toggle} size="2xl">
      <div className="flex flex-col h-[85vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Prompts Library</h2>
          <XMarkIcon className="h-6 w-6 cursor-pointer hover:text-gray-500" onClick={toggle} />
        </div>

        {/* LIBRARY */}
        <div className="flex-1 overflow-scroll">
          {Array.from(groups).map((skill) => (
            <div key={skill} className="mt-4">
              <Disclosure key={skill} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                    <span className="text-md font-semibold mb-2 uppercase">{skill}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                      <MinusIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                {prompts.filter(prompt => prompt.skill === skill).map((prompt) => (
                  <DisclosurePanel
                    key={prompt.text}
                    as="dd"
                    onClick={() => handleAddPromptToEditor(prompt.text, prompt.skill)}
                    className="mt-2 border-2 rounded-md hover:cursor-pointer border-transparent ml-4 hover:ml-3 box-border hover:px-1 hover:border-gray-700"
                  >
                    {prompt.text}
                  </DisclosurePanel>
                ))}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PromptsLibraryModal;
