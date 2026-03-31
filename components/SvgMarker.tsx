import { ICON_COLOR, TEXT_COLOR } from "@/constants/Configs";
import { markerSVGsA } from "@/constants/MarkerIcons";
import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { Marker } from "react-native-maps";
import { moderateScale } from "react-native-size-matters";
import { SvgXml } from "react-native-svg";
 
export const markerSVGs = {
  Home: (price: number, currency: string) => `
    <svg width="170" height="90" viewBox="0 0 170 90">
      <rect x="5" y="20" width="150" height="45" rx="22.5" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <g transform="translate(20, 32)">
        <text x="0" y="12" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="${ICON_COLOR}" stroke-width="2" transform="translate(110, -2) scale(0.9)"/>
      </g>
    </svg>`,
  Apartment: (price: number, currency: string) => `
    <svg width="170" height="90" viewBox="0 0 170 90">
      <rect x="10" y="20" width="140" height="40" rx="20" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <g transform="translate(25, 33)">
        <text x="0" y="10" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
        <path d="M3 21h18M3 7h18M9 22V10M15 22V10M17 2H7a2 2 0 0 0-2 2v18h14V4a2 2 0 0 0-2-2z" fill="none" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(100, -3) scale(0.75)"/>
      </g>
    </svg>`,
  Land: (price: number, currency: string) => `
    <svg width="170" height="90" viewBox="0 0 170 90">
      <rect x="10" y="20" width="140" height="40" rx="20" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <g transform="translate(25, 33)">
        <text x="0" y="10" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
        <path d="M12 10V2M12 10l4-4M12 10l-4-4M2 22h20M7 22l5-12 5 12" fill="none" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(100, -3) scale(0.8)"/>
      </g>
    </svg>`,
  Farm: (price: number, currency: string) => `
    <svg width="160" height="80" viewBox="0 0 160 80">
      <rect x="10" y="20" width="140" height="40" rx="20" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <g transform="translate(25, 33)">
        <text x="0" y="10" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
        <path d="M12 20V10M18 20V10M6 20V10M2 20h20M12 10a6 6 0 0 1 12 0v10H0V10a6 6 0 0 1 12 0z" fill="none" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(100, -3) scale(0.7)"/>
      </g>
    </svg>`,
  Floor: (price: number, currency: string) => `
    <svg width="170" height="90" viewBox="0 0 170 90">
      <rect x="10" y="20" width="140" height="40" rx="20" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <g transform="translate(25, 33)">
        <text x="0" y="10" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
        <path d="M2 17h20M2 12h20M2 7h20" fill="none" stroke="${ICON_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(100, -3) scale(0.8)"/>
      </g>
    </svg>`,
  Default: (price: number, currency: string) => `
    <svg width="170" height="90" viewBox="0 0 170 90">
      <rect x="5" y="20" width="150" height="45" rx="22.5" fill="#FFF" stroke="#E5E5E5" stroke-width="1.5"/>
      <text x="25" y="48" font-size="14" font-weight="900" fill="${TEXT_COLOR}">${Number(price).toLocaleString()} ${currency}</text>
    </svg>`,
};

export default function SvgMarker({
  coordinate,
  price,
  currency,
  type,
  onPress,
}: any) {
  const [tracksView, setTracksView] = useState(true);
  const markerRef = useRef<any>(null);
  const triggerCallout = () => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.showCallout();
      }
    }, 1500);

    const fallbackTimer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.showCallout();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      const timer = setTimeout(() => setTracksView(false), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);
  const xml =
    markerSVGs[type as keyof typeof markerSVGs]?.(price, currency) ||
    markerSVGs.Default(price, currency);
  const width = moderateScale(170);
  const height = moderateScale(90);

  if (Platform.OS === "ios") {
    return (
      <Marker
        ref={markerRef}
        coordinate={coordinate}
        onPress={(e) => {
          if (e && e.stopPropagation) e.stopPropagation();
          if (onPress) onPress();
        }}
        tracksViewChanges={Platform.OS === "ios" ? true : tracksView}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View
          style={{
            width,
            height,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
          pointerEvents={Platform.OS === "ios" ? "none" : "auto"}
        >
          <SvgXml
            xml={xml}
            width={width}
            height={height}
            key={`svg-${price}-${tracksView}`}
          />
        </View>
      </Marker>
    );
  }
  return (
    <Marker
      key={`marker-${price}`}
      ref={markerRef}
      coordinate={coordinate}
      onPress={(e) => {
        if (onPress) onPress();
        markerRef.current?.showCallout();
      }}
      title={`${Number(price).toLocaleString()} - ${currency}`}
      tracksViewChanges={tracksView}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SvgXml
          xml={
            markerSVGsA[type as keyof typeof markerSVGsA] || markerSVGsA.Home
          }
          width={20}
          height={20}
        />
      </View>
    </Marker>
  );
}
