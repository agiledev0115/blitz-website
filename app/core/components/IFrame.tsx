import React from "react"
import Iframe from "react-iframe"

interface IFrameProps {
  src: string
  height: string
  width: string
}

const IFrame: React.FC<IFrameProps> = ({ src, height, width }) => {
  return <Iframe url={src} height={height} width={width} position="relative" />
}

export default IFrame
