import { ContentState, convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import React, { useEffect, useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { dynamic } from "blitz"
import { EditorProps } from "react-draft-wysiwyg"
import { Undo, Redo } from "@mui/icons-material"
import { Box } from "@mui/material"
import NoSSR from "react-no-ssr"

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})

const RichEditor = ({ onChange, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if (!updated && typeof window !== "undefined") {
      const defaultValue = value ? value : ""
      const blocksFromHtml = htmlToDraft(defaultValue)

      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      )

      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)

      /* return () => {
        setEditorState(newEditorState);
      }; */
    }
  }, [value])

  const onEditorStateChange = (editorState) => {
    /*  console.log(
      'editorState',
      convertToRaw(editorState.getCurrentContent()).blocks,
    ); */

    setUpdated(true)
    setEditorState(editorState)

    if (convertToRaw(editorState.getCurrentContent()).blocks[0]!.text === "") {
      return onChange("")
    }

    // if block text is empty then add break
    const nextStateBlocks = convertToRaw(editorState.getCurrentContent()).blocks.map((block) => {
      if (block.text === "") {
        block.text = "\n"
      }

      return block
    })

    // console.log(convertToRaw(editorState.getCurrentContent()));

    const nextState = { ...convertToRaw(editorState.getCurrentContent()), blocks: nextStateBlocks }

    return onChange(draftToHtml(nextState))
  }

  return (
    <Box
      sx={{
        width: "100%",
        ".public-DraftEditor-content": {
          maxHeight: "200px",
          overflow: "auto",
        },
      }}
      className="editorbox"
    >
      {/*
       // This is a error caused by nextjs' dynamic importer
       // @ts-ignore */}
      <Editor
        spellCheck
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorStyle={{
          border: "1px solid #ddd",
          minHeight: "200px",
          padding: "0px 10px",
        }}
        toolbar={{
          options: ["blockType", "remove", "history", "inline", "link"],
          inline: {
            inDropdown: true,
            options: ["bold"],
          },
          blockType: {
            inDropdown: true,
            options: ["H6"],
          },
          history: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["undo", "redo"],
            undo: { icon: <Undo />, className: undefined },
            redo: { icon: <Redo />, className: undefined },
          },
          link: {
            inDropdown: true,
          },
        }}
      />
    </Box>
  )
}

export default RichEditor
