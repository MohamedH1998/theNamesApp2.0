import { useState, useEffect, useRef } from "react";
import { styled, keyframes } from "@stitches/react";
import * as ToastPrimitive from "@radix-ui/react-toast";

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 }
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" }
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` }
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
  position: "fixed",
  bottom: "4rem",
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647
});

const StyledToast = styled(ToastPrimitive.Root, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in forwards`
    },
    '&[data-swipe="move"]': {
      transform: "translateX(var(--radix-toast-swipe-move-x))"
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out"
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out forwards`
    }
  }
});

const StyledTitle = styled(ToastPrimitive.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  color: "bg-slate-300",
  fontSize: 15
});

const StyledDescription = styled(ToastPrimitive.Description, {
  gridArea: "description",
  margin: 0,
  color: "bg-slate-500",
  fontSize: 13,
  lineHeight: 1.3
});

const StyledAction = styled(ToastPrimitive.Action, {
  gridArea: "action"
});

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = StyledViewport;
const Toast = StyledToast;
const ToastTitle = StyledTitle;
const ToastDescription = StyledDescription;
const ToastAction = StyledAction;

export default function ToastComponent({ active, milestone }) {
  const [open, setOpen] = useState(active);

  useEffect(() => {
    setOpen(active);
  }, [active]);

  return (
    <ToastProvider swipeDirection="right">
      <Toast open={open} onOpenChange={() => setOpen(false)}>
        <ToastTitle>Congratulations!</ToastTitle>
        <ToastDescription>{milestone}</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
