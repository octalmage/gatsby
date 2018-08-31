import React from "react"
import { TypographyStyle, GoogleFont } from "react-typography"
import typography from "./.cache/typography"

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const googleFont = pluginOptions.omitGoogleFont ? (
    []
  ) : (
    <GoogleFont key={`GoogleFont`} typography={typography} />
  )
  setHeadComponents([
    <TypographyStyle key={`TypographyStyle`} typography={typography} />,
    ...googleFont,
  ])
}

// Move Typography.js styles to the top of the head section so they're loaded first.
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.sort((x, y) => {
    if (x.key === `TypographyStyle`) {
      return -1
    } if (y.key === `TypographyStyle`) {
      return 1
    }
    return 0
  })
  replaceHeadComponents(headComponents)
}
