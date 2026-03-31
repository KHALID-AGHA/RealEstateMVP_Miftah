import { ICON_COLOR } from "./Configs";

export const markerSVGsA = {
  Home: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  Apartment: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21h18M3 7h18M9 22V10M15 22V10M17 2H7a2 2 0 0 0-2 2v18h14V4a2 2 0 0 0-2-2z" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  Farm: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20V10M18 20V10M6 20V10M2 20h20M12 10a6 6 0 0 1 12 0v10H0V10a6 6 0 0 1 12 0z" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  Land: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10V2M12 10l4-4M12 10l-4-4M2 22h20M7 22l5-12 5 12" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  Floor: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16h16M4 12h16M4 8h16" stroke="${ICON_COLOR}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  Default: `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8v8M8 12h8" stroke="${ICON_COLOR}" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
};
export const getSvgUri = (type: string) => {
  const svgCode =
    markerSVGsA[type as keyof typeof markerSVGsA] || markerSVGsA.Default;
  const finalSvg = svgCode.includes("xmlns")
    ? svgCode
    : svgCode.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');

  try {
    const base64 = btoa(unescape(encodeURIComponent(finalSvg)));
    return `data:image/svg+xml;base64,${base64}`;
  } catch (e) {
    console.error("SVG Encoding Error:", e);
    return "";
  }
};
