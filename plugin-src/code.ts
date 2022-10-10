figma.showUI(__html__, { themeColors: true, width: 400 ,height: 450 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "image") {
    const rect = figma.createRectangle()
    const img = figma.createImage(msg.newImg)
    rect.resize(512, 512)
    // rect.name = msg.fullInput
    rect.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL'}]
    figma.currentPage.appendChild(rect)

    figma.currentPage.selection = [rect];
    figma.viewport.scrollAndZoomIntoView([rect]);
  }
};
