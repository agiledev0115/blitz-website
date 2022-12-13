import React, { Component } from "react"

interface GoogleDocsViewerProps {
  width?: string
  height?: string
  src: string
}

const GoogleDocsViewer: React.FC<GoogleDocsViewerProps> = ({ width, height, src }) => {
  let iframeSrc = "https://docs.google.com/viewer?url=" + src + "&embedded=true"

  let style = {
    width: width ? width : "100%",
    height: height ? height : "100%",
    border: "none",
  }

  return (
    <div>
      <iframe src={iframeSrc} style={style}></iframe>
    </div>
  )
}

export default GoogleDocsViewer
