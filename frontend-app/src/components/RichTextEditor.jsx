import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function RichTextEditor({
  content,
  setContent,
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setContent(
        editor.getHTML()
      );
    },
  });

  if (!editor) return null;

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          B
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
        >
          S
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          1. List
        </button>
        
        <button
            type="button"
            onClick={() =>
                editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .run()
            }
            >
            H1
            </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
        >
          H2
        </button>

        <button
        type="button"
        onClick={() =>
            editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        }
        >
        H3
        </button>

        <button
            type="button"
            onClick={() =>
                editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
            >
            "
            </button>

        <button
            type="button"
            onClick={() =>
                editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
            >
            {"</>"}
            </button>
        
        

      </div>

      <EditorContent
        editor={editor}
      />
    </div>
  );
}

export default RichTextEditor;